/* ============================================================
   BARRA DE ENVIO GRATIS EN CABA - Mascotas de la Abadia
   Cargado 100% via Codigo Externo (Configuracion > Codigos
   externos > Para la tienda). No depende de archivos del tema.

   Por que esta version es distinta de la anterior:
   La version vieja (metida a mano en el tema por FTP) decidia
   "esto es CABA" buscando la palabra CABA en el nombre de
   CUALQUIER opcion de envio que mostraba el calculador,
   incluyendo opciones de retiro en punto, que se ofrecen a
   compradores de cualquier provincia. Si una de esas opciones
   tenia "CABA" en el nombre, la barra se mostraba igual, sin
   importar de donde fuera el comprador. Esta version no mira
   nombres de opciones de envio en absoluto: solo mira el
   codigo postal real (el ya calculado/guardado, o el que el
   cliente escribe), asi no hay falsos positivos.
   ============================================================ */
(function () {
	var UMBRAL = 100000; // Monto para envio gratis en CABA. Si lo cambias en Descuentos > Envio gratis, actualiza este numero.
	var actualizando = false;

	function esCodigoPostalCaba(zip) {
		if (!zip) return false;
		var digitos = String(zip).replace(/\D/g, '');
		if (digitos.length < 4) return false;
		var prefijo = parseInt(digitos.slice(0, 4), 10);
		return prefijo >= 1000 && prefijo <= 1499;
	}

	function obtenerZipActual() {
		// 1) El codigo postal ya calculado/guardado que muestra el calculador
		var zipGuardado = document.querySelector('.js-shipping-calculator-current-zip');
		if (zipGuardado && zipGuardado.textContent) {
			var m = zipGuardado.textContent.match(/\d{3,4}/);
			if (m) return m[0];
		}
		// 2) Lo que el cliente escribio en el campo del calculador
		var input = document.querySelector('.js-shipping-input');
		if (input && input.value) return input.value;
		return '';
	}

	function obtenerSubtotalActual() {
		var el = document.querySelector('.js-cart-subtotal[data-priceraw]') ||
			document.querySelector('[data-store="cart-subtotal"] [data-priceraw]') ||
			document.querySelector('.js-subtotal-price[data-priceraw]');
		if (el) {
			var crudo = parseFloat(el.getAttribute('data-priceraw'));
			if (!isNaN(crudo)) return crudo / 100;
		}
		return 0;
	}

	function crearBarraSiNoExiste() {
		var existente = document.getElementById('mda-envio-gratis-box');
		if (existente) return existente;

		var contenedor = document.querySelector('#cart-shipping-container');
		if (!contenedor || !contenedor.parentNode) return null;

		var caja = document.createElement('div');
		caja.id = 'mda-envio-gratis-box';
		caja.className = 'mda-envio-gratis';
		caja.style.display = 'none';
		caja.innerHTML =
			'<p class="mda-envio-gratis-texto"></p>' +
			'<div class="mda-envio-gratis-barra"><div class="mda-envio-gratis-barra-relleno"></div></div>';

		contenedor.parentNode.insertBefore(caja, contenedor);
		return caja;
	}

	function inyectarEstilos() {
		if (document.getElementById('mda-envio-gratis-estilos')) return;
		var estilo = document.createElement('style');
		estilo.id = 'mda-envio-gratis-estilos';
		estilo.textContent =
			'.mda-envio-gratis{margin:12px 0;font-size:13px;}' +
			'.mda-envio-gratis-texto{margin:0 0 6px;color:#2b2118;}' +
			'.mda-envio-gratis-texto strong{color:#2b7a2b;}' +
			'.mda-envio-gratis-barra{background:#e2ddd7;border-radius:999px;height:6px;overflow:hidden;}' +
			'.mda-envio-gratis-barra-relleno{background:#c9a227;height:100%;width:0%;border-radius:999px;transition:width .3s ease;}' +
			'.mda-envio-gratis.mda-completo .mda-envio-gratis-barra-relleno{background:#2b7a2b;}';
		document.head.appendChild(estilo);
	}

	function actualizarBarra() {
		var caja = crearBarraSiNoExiste();
		if (!caja) return;

		var zip = obtenerZipActual();
		var mostrar = esCodigoPostalCaba(zip);

		if (!mostrar) {
			caja.style.display = 'none';
			return;
		}

		var subtotal = obtenerSubtotalActual();
		var texto = caja.querySelector('.mda-envio-gratis-texto');
		var relleno = caja.querySelector('.mda-envio-gratis-barra-relleno');
		var porcentaje = Math.min(100, Math.round((subtotal / UMBRAL) * 100));

		caja.style.display = 'block';
		if (relleno) relleno.style.width = porcentaje + '%';

		if (subtotal >= UMBRAL) {
			caja.classList.add('mda-completo');
			if (texto) texto.innerHTML = '¡Genial! <strong>Tenés envío gratis en CABA</strong>';
		} else {
			caja.classList.remove('mda-completo');
			var falta = UMBRAL - subtotal;
			var faltaFormateada = falta.toLocaleString('es-AR', { maximumFractionDigits: 0 });
			if (texto) texto.innerHTML = 'Te faltan <strong>$' + faltaFormateada + '</strong> para tener envío gratis en CABA';
		}
	}

	function actualizarConPausa() {
		if (actualizando) return;
		actualizando = true;
		setTimeout(function () {
			actualizando = false;
			actualizarBarra();
		}, 150);
	}

	function iniciar() {
		inyectarEstilos();
		actualizarBarra();

		if (window.MutationObserver) {
			var observer = new MutationObserver(actualizarConPausa);
			observer.observe(document.body, {
				childList: true,
				subtree: true,
				attributes: true,
				attributeFilter: ['data-priceraw']
			});
		}

		// El campo de codigo postal no siempre dispara eventos al tipear,
		// asi que ademas escuchamos el click en "Calcular" del calculador.
		document.addEventListener('click', function (e) {
			if (e.target && e.target.closest && e.target.closest('.js-calculate-shipping')) {
				actualizarConPausa();
			}
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', iniciar);
	} else {
		iniciar();
	}
})();
