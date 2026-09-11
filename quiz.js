(function(){
  'use strict';

  var LOGO_URL = 'https://d1a9qnv764bsoo.cloudfront.net/stores/002/130/106/rte/dog_optimized_q.png';
  var TIENDA_URL = 'https://mascotasdelabadia.com.ar/salud/';
  var ROJO = '#c71f3e';

  // ---------- Catálogo real ----------
  // prioridad: 1 = producto elegido/curado (se recomienda primero); 2 = alternativa
  // económica que solo se ofrece como principal si las de prioridad 1 no tienen stock.
  // url: ficha real del producto — se usa para el link "IR A LA TIENDA" y para
  // chequear stock en vivo antes de recomendar (ver verificarStock).
  var PRODUCTOS = [
    // PERRO — solo pulgas y garrapatas
    { id:'nexgard_comp', especie:'perro', cobertura:'externa', nombre:'NexGard Comprimido',
      formato:'comprimido', duracion:'mensual', precio:22500, regalo:true, prioridad:1,
      url:'https://mascotasdelabadia.com.ar/productos/nexgard-comprimido-antipulgas-y-garrapatas-para-perros-8705-1peb0/',
      talles:[{max:4,label:'2 a 4 kg'},{max:10,label:'4 a 10 kg'},{max:25,label:'10 a 25 kg'},{max:50,label:'25 a 50 kg'}] },
    { id:'bravecto_comp', especie:'perro', cobertura:'externa', nombre:'Bravecto Comprimido',
      formato:'comprimido', duracion:'3meses', precio:38300, regalo:false, prioridad:1,
      url:'https://mascotasdelabadia.com.ar/productos/bravecto-comprimido-antipulgas-y-garrapatas-para-perros-10501-182lk/',
      talles:[{max:4.5,label:'2 a 4,5 kg'},{max:10,label:'4,5 a 10 kg'},{max:20,label:'10 a 20 kg'},{max:40,label:'20 a 40 kg'},{max:56,label:'40 a 56 kg'}] },
    { id:'powergold_comp', especie:'perro', cobertura:'externa', nombre:'Power Gold Comprimido',
      formato:'comprimido', duracion:'3meses', precio:49700, regalo:false, prioridad:1,
      url:'https://mascotasdelabadia.com.ar/productos/power-gold-comprimido-masticable-antipulgas-y-garrapatas-para-perros-8838-1denm/',
      talles:[{max:4.5,label:'2 a 4,5 kg'},{max:10,label:'4,5 a 10 kg'},{max:20,label:'10 a 20 kg'},{max:40,label:'20 a 40 kg'},{max:56,label:'40 a 56 kg'}] },
    { id:'frontline_perro', especie:'perro', cobertura:'externa', nombre:'Frontline Plus Pipeta Antipulgas y Garrapatas para Perros',
      formato:'pipeta', duracion:'mensual', precio:27700, regalo:false, prioridad:1,
      url:'https://mascotasdelabadia.com.ar/productos/frontline-plus-pipeta-antipulgas-y-garrapatas-para-perros-8701-1iop9/',
      talles:[{max:10,label:'hasta 10 kg'},{max:20,label:'10 a 20 kg'},{max:40,label:'20 a 40 kg'},{max:60,label:'40 a 60 kg'}] },

    // PERRO — alternativas económicas (mismo tramo, solo se ofrecen si las de arriba no tienen stock)
    { id:'simparica', especie:'perro', cobertura:'externa', nombre:'Simparica Comprimido Antipulgas y Garrapatas para Perros',
      formato:'comprimido', duracion:'mensual', precio:20700, regalo:false, prioridad:2,
      url:'https://mascotasdelabadia.com.ar/productos/simparica-11606-1d9o7/',
      talles:[{max:2.5,label:'1,3 a 2,5 kg'},{max:5,label:'2,5 a 5 kg'},{max:10,label:'5 a 10 kg'},{max:20,label:'10 a 20 kg'},{max:40,label:'20 a 40 kg'},{max:60,label:'40 a 60 kg'}] },
    { id:'power_comprimidos', especie:'perro', cobertura:'externa', nombre:'Power Comprimidos Antipulgas para Perros',
      formato:'comprimido', duracion:'mensual', precio:10100, regalo:false, prioridad:2,
      url:'https://mascotasdelabadia.com.ar/productos/power-comprimidos-antipulgas-para-perros-y-gatos-8839-7do5c/',
      talles:[{max:5,label:'2,5 a 5 kg'},{max:10,label:'5 a 10 kg'},{max:20,label:'10 a 20 kg'},{max:30,label:'20 a 30 kg'},{max:40,label:'30 a 40 kg'}] },
    { id:'frontline_spot_on_perro', especie:'perro', cobertura:'externa', nombre:'Frontline Spot On Pipeta Antipulgas y Garrapatas Perros',
      formato:'pipeta', duracion:'mensual', precio:9900, regalo:false, prioridad:2,
      url:'https://mascotasdelabadia.com.ar/productos/frontline-spot-on-pipeta-antipulgas-y-garrapatas-perros-8703-476tu/',
      talles:[{max:10,label:'hasta 10 kg'},{max:20,label:'10 a 20 kg'},{max:40,label:'20 a 40 kg'}] },
    { id:'advantix', especie:'perro', cobertura:'externa', nombre:'Advantix Pipeta Antiparasitaria para Perros',
      formato:'pipeta', duracion:'mensual', precio:12300, regalo:false, prioridad:2,
      url:'https://mascotasdelabadia.com.ar/productos/advantix-pipeta-antiparasitaria-para-perros-9202-1jvqc/',
      talles:[{max:10,label:'4 a 10 kg'},{max:25,label:'10 a 25 kg'},{max:999,label:'más de 25 kg'}] },
    { id:'power_ultra', especie:'perro', cobertura:'externa', nombre:'Power Ultra Pipeta Antiparasitaria para Perros',
      formato:'pipeta', duracion:'mensual', precio:5700, regalo:false, prioridad:2,
      url:'https://mascotasdelabadia.com.ar/productos/power-ultra-pipeta-antiparasitaria-para-perros-8841-1ye4a/',
      talles:[{max:4,label:'2 a 4 kg'},{max:10,label:'5 a 10 kg'},{max:20,label:'11 a 20 kg'},{max:40,label:'21 a 40 kg'},{max:60,label:'41 a 60 kg'}] },

    // PERRO — pulgas + garrapatas + internos
    { id:'nexgard_spectra', especie:'perro', cobertura:'completa', nombre:'NexGard Spectra Comprimido',
      formato:'comprimido', duracion:'mensual', precio:48100, regalo:true, prioridad:1,
      url:'https://mascotasdelabadia.com.ar/productos/nexgard-spectra-comprimido-antiparasitario-interno-y-externo-para-perros-8714-12sy2/',
      talles:[{max:3.5,label:'2 a 3,5 kg'},{max:7.5,label:'3,6 a 7,5 kg'},{max:15,label:'7,6 a 15 kg'},{max:30,label:'15 a 30 kg'},{max:60,label:'30 a 60 kg'}] },

    // PERRO — pulgas + internos, SIN garrapatas
    { id:'advocate', especie:'perro', cobertura:'interna_sola', nombre:'Advocate Pipeta Antiparasitaria para Perros',
      formato:'pipeta', duracion:'mensual', precio:37400, regalo:false, prioridad:1,
      url:'https://mascotasdelabadia.com.ar/productos/advocate-pipeta-antiparasitaria-para-perros-9203-5sd3g/',
      talles:[{max:10,label:'4 a 10 kg'},{max:25,label:'10 a 25 kg'},{max:999,label:'más de 25 kg'}] },

    // PERRO — collar de larga duración (8 a 10 meses, pulgas y garrapatas)
    { id:'seresto_perro', especie:'perro', cobertura:'externa', nombre:'Seresto Collar Perros y Gatos',
      formato:'collar', duracion:'collar', duracionLabel:'Dura 8 meses', precio:84200, regalo:false, prioridad:1,
      url:'https://mascotasdelabadia.com.ar/productos/seresto-perros-y-gatos-9205-1qava/',
      talles:[{max:8,label:'hasta 8 kg'},{max:999,label:'más de 8 kg'}] },
    { id:'ecthol_perro', especie:'perro', cobertura:'externa', nombre:'Collar Ecthol Perro',
      formato:'collar', duracion:'collar', duracionLabel:'Dura hasta 10 meses', precio:16300, regalo:false, prioridad:1,
      url:'https://mascotasdelabadia.com.ar/productos/collar-ecthol-perro-9309-veh6x/',
      talles:[{max:10,label:'hasta 10 kg (talle chico)'},{max:999,label:'más de 10 kg (talle grande)'}] },

    // GATO — solo pulgas y garrapatas
    { id:'frontline_gato', especie:'gato', cobertura:'externa', nombre:'Frontline Spot On Pipeta Antipulgas y Garrapatas Gatos',
      formato:'pipeta', duracion:'mensual', precio:7900, regalo:false, prioridad:1,
      url:'https://mascotasdelabadia.com.ar/productos/frontline-spot-on-pipeta-antipulgas-y-garrapatas-gatos-8715-orb40/',
      talles:[{max:999,label:'talle único'}] },
    { id:'bravecto_gato', especie:'gato', cobertura:'externa', nombre:'Bravecto Pipeta Gatos',
      formato:'pipeta', duracion:'3meses', precio:41800, regalo:false, prioridad:1,
      url:'https://mascotasdelabadia.com.ar/productos/bravecto-pipeta-antipulgas-y-garrapatas-para-gatos-10502-1s54g/',
      talles:[{max:2.8,label:'1,2 a 2,8 kg'},{max:6.25,label:'2,8 a 6,25 kg'},{max:12,label:'6,25 a 12 kg'}] },

    // GATO — pulgas + garrapatas + internos
    { id:'nexgard_combo', especie:'gato', cobertura:'completa', nombre:'NexGard Combo Pipeta',
      formato:'pipeta', duracion:'mensual', precio:31600, regalo:true, prioridad:1,
      url:'https://mascotasdelabadia.com.ar/productos/nexgard-combo-pipeta-antiparasitaria-para-gatos-8706-k7rhe/',
      talles:[{max:2.5,label:'hasta 2,5 kg'},{max:7.5,label:'2,5 a 7,5 kg'}] },

    // GATO — pulgas + internos, SIN garrapatas (equivalente al Advocate de perros)
    { id:'advocate_gato', especie:'gato', cobertura:'interna_sola', nombre:'Advocate Pipeta Antiparasitaria para Gatos',
      formato:'pipeta', duracion:'mensual', precio:26400, regalo:false, prioridad:1,
      url:'https://mascotasdelabadia.com.ar/productos/advocate-pipeta-antiparasitaria-para-gatos-9204-8avva/',
      talles:[{max:4,label:'hasta 4 kg'},{max:8,label:'4 a 8 kg'}] },
    { id:'feline_full_spot', especie:'gato', cobertura:'interna_sola', nombre:'Feline Full Spot Pipeta Antiparasitaria para Gatos',
      formato:'pipeta', duracion:'mensual', precio:34600, regalo:false, prioridad:1,
      url:'https://mascotasdelabadia.com.ar/productos/feline-full-spot-pipeta-antiparasitaria-para-gatos-10109-1282f/',
      talles:[{max:2,label:'hasta 2 kg'},{max:5,label:'2 a 5 kg'},{max:999,label:'más de 5 kg'}] },

    // GATO — collar de larga duración (8 a 10 meses, pulgas y garrapatas)
    { id:'seresto_gato', especie:'gato', cobertura:'externa', nombre:'Seresto Collar Perros y Gatos',
      formato:'collar', duracion:'collar', duracionLabel:'Dura 8 meses', precio:84200, regalo:false, prioridad:1,
      url:'https://mascotasdelabadia.com.ar/productos/seresto-perros-y-gatos-9205-1qava/',
      talles:[{max:8,label:'hasta 8 kg'},{max:999,label:'más de 8 kg'}] }
  ];

  var PESO_OPCIONES = {
    perro: [
      { label:'Hasta 10 kg', value:7 },
      { label:'10 a 25 kg', value:17 },
      { label:'25 a 45 kg', value:35 },
      { label:'Más de 45 kg', value:55 }
    ],
    gato: [
      { label:'Hasta 3 kg', value:2 },
      { label:'3 a 6 kg', value:4.5 },
      { label:'6 a 12 kg', value:9 },
      { label:'Más de 12 kg', value:14 }
    ]
  };

  var STEP_FIELDS = { especie:'especie', peso:'peso', cobertura:'coberturaKey', formato:'formato', duracion:'duracion' };

  // ---------- Estado ----------
  var respuestas, historial, overlay, modalBody;

  function reiniciarEstado(){
    respuestas = { especie:null, peso:null, coberturaKey:null, formato:null, duracion:null };
    historial = [];
  }

  function unique(arr){
    var out = [];
    for (var i=0;i<arr.length;i++){ if (out.indexOf(arr[i])===-1) out.push(arr[i]); }
    return out;
  }

  function candidatosBase(){
    if (!respuestas.especie || !respuestas.coberturaKey) return null;
    return PRODUCTOS.filter(function(p){
      return p.especie===respuestas.especie && p.cobertura===respuestas.coberturaKey;
    });
  }

  function cubrenPeso(lista, pesoKg){
    if (pesoKg==null || !lista) return lista;
    var cubren = lista.filter(function(p){
      return p.talles.some(function(t){ return pesoKg<=t.max; });
    });
    return cubren.length ? cubren : lista;
  }

  function calcularPlan(){
    // Orden: especie > peso > cobertura > duración > formato.
    // Se pregunta duración ANTES que formato: si eligen la opción de "collar de
    // larga duración", el formato ya queda implícito (collar) y esa pregunta se
    // saltea sola. Seresto (8 meses) y Ecthol (hasta 10 meses) comparten el mismo
    // bucket 'collar' acá — si ambos aplican, se resuelve por precio como cualquier
    // empate (el más barato como principal, el otro como alternativa), y en el
    // resultado se muestra la duración real de cada uno (product.duracionLabel).
    var plan = ['especie','peso','cobertura'];
    var base = candidatosBase();
    var lista = base ? cubrenPeso(base, respuestas.peso) : null;
    var necesitaFormato = true, necesitaDuracion = true;
    if (lista){
      var duraciones = unique(lista.map(function(p){ return p.duracion; }));
      necesitaDuracion = duraciones.length>1;
      var listaTrasDuracion = respuestas.duracion ? lista.filter(function(p){ return p.duracion===respuestas.duracion; }) : lista;
      var formatos = unique(listaTrasDuracion.map(function(p){ return p.formato; }));
      necesitaFormato = formatos.length>1;
    }
    if (necesitaDuracion) plan.push('duracion');
    if (necesitaFormato) plan.push('formato');
    return plan;
  }

  function candidatosParaPreguntas(){
    var base = candidatosBase();
    return base ? cubrenPeso(base, respuestas.peso) : [];
  }

  function siguientePasoPendiente(){
    var plan = calcularPlan();
    for (var i=0;i<plan.length;i++){
      var campo = STEP_FIELDS[plan[i]];
      if (respuestas[campo]==null) return plan[i];
    }
    return 'resultado';
  }

  function talleParaPeso(producto, pesoKg){
    for (var i=0;i<producto.talles.length;i++){
      if (pesoKg<=producto.talles[i].max) return producto.talles[i];
    }
    return producto.talles[producto.talles.length-1];
  }

  // Consulta la ficha real del producto (mismo dominio, se ejecuta en el
  // navegador de quien visita la tienda) para traer stock Y precio actuales.
  // Si no hay url cargada, si la ficha no carga, o si no se puede determinar
  // con certeza, asumimos que SÍ hay stock (mejor no bloquear una venta real
  // por un chequeo que falló) y usamos el precio de referencia guardado.
  // Nota: busca el precio y la disponibilidad en el JSON-LD estándar
  // (schema.org) que Tiendanube agrega a cada ficha, con "sin stock" como
  // respaldo en el texto para la disponibilidad. Conviene probar esto una vez
  // pegado en la tienda real y avisarme si algún dato no se lee bien.
  function obtenerEstadoProducto(producto){
    if (!producto.url) return Promise.resolve({ enStock:true, precio:producto.precio });
    var controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    var timeoutId = setTimeout(function(){ if (controller) controller.abort(); }, 4000);
    return fetch(producto.url, { credentials:'omit', signal: controller ? controller.signal : undefined })
      .then(function(res){ return res.text(); })
      .then(function(html){
        clearTimeout(timeoutId);
        var mStock = html.match(/"availability"\s*:\s*"[^"]*\/(InStock|OutOfStock|LimitedAvailability|PreOrder|SoldOut)"/i);
        var enStock = mStock ? !/outofstock|soldout/i.test(mStock[1]) : (/sin\s*stock/i.test(html) ? false : true);
        var mPrecio = html.match(/"price"\s*:\s*"?(\d+(?:\.\d+)?)"?/i);
        var precio = mPrecio ? Math.round(parseFloat(mPrecio[1])) : producto.precio;
        if (!precio || precio<=0) precio = producto.precio;
        return { enStock:enStock, precio:precio };
      })
      .catch(function(){ clearTimeout(timeoutId); return { enStock:true, precio:producto.precio }; });
  }

  function calcularResultadoAsync(){
    var base = candidatosBase();
    var pesoKg = respuestas.peso;
    var cubren = base.filter(function(p){ return p.talles.some(function(t){ return pesoKg<=t.max; }); });
    var ajustado = !cubren.length;
    var lista = cubren.length ? cubren : base;
    if (respuestas.formato) lista = lista.filter(function(p){ return p.formato===respuestas.formato; });
    if (respuestas.duracion) lista = lista.filter(function(p){ return p.duracion===respuestas.duracion; });
    if (!lista.length) lista = cubren.length ? cubren : base;
    lista = lista.slice();
    return Promise.all(lista.map(obtenerEstadoProducto)).then(function(estados){
      // Copia cada producto con su precio y stock reales recién consultados,
      // sin tocar el catálogo estático (para no arrastrar datos viejos entre usos).
      var listaConEstado = lista.map(function(p, i){
        var copia = {};
        for (var k in p) copia[k] = p[k];
        copia.precio = estados[i].precio;
        copia._enStock = estados[i].enStock;
        return copia;
      });
      listaConEstado.sort(function(a,b){ return (a.prioridad-b.prioridad) || (a.precio-b.precio); });
      var principal = null;
      for (var i=0;i<listaConEstado.length;i++){
        if (listaConEstado[i]._enStock){ principal = listaConEstado[i]; break; }
      }
      if (!principal) principal = listaConEstado[0];
      var otras = listaConEstado.filter(function(p){ return p.id!==principal.id; });
      var talle = talleParaPeso(principal, pesoKg);
      var ajustadoFinal = ajustado || (pesoKg>talle.max);
      return { principal:principal, otras:otras, talle:talle, ajustado:ajustadoFinal };
    });
  }

  function formatearPrecio(n){
    return '$' + n.toLocaleString('es-AR');
  }

  // ---------- Registro en Google Sheets ----------
  // Misma planilla/Apps Script que ya usan el popup del cupón y el aviso de
  // stock — pegar acá la URL de esa implementación web (termina en /exec).
  // Mientras diga "PEGAR_ACA" no se manda nada, no rompe el quiz.
  var SHEETS_URL = 'https://script.google.com/macros/s/AKfycbx7y5yFF_hL7OUWle6w8pXB2ZIKbo5SMFn4k-n3MNDYBtsxz4MJqZrSpMcNVBrPp1p3/exec';

  function registrarEnPlanilla(r){
    if (!SHEETS_URL || SHEETS_URL.indexOf('PEGAR_ACA') !== -1) return;
    try{
      fetch(SHEETS_URL, {
        method:'POST',
        mode:'no-cors',
        headers:{ 'Content-Type':'text/plain' },
        body: JSON.stringify({
          form: 'quiz',
          fecha: new Date().toISOString(),
          especie: respuestas.especie,
          peso: respuestas.peso,
          cobertura: respuestas.coberturaKey,
          duracion: respuestas.duracion,
          formato: respuestas.formato,
          producto: r.principal.nombre,
          precio: r.principal.precio
        })
      });
    }catch(e){ /* si falla el registro, no afecta al quiz */ }
  }

  // ---------- UI ----------
  function inyectarEstilos(){
    if (document.getElementById('mdaq-fonts')) return;
    var link = document.createElement('link');
    link.id = 'mdaq-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Fredoka:wght@600;700&display=swap';
    document.head.appendChild(link);

    var style = document.createElement('style');
    style.textContent = [
      '.mdaq-overlay{position:fixed;inset:0;background:rgba(43,35,32,.55);z-index:10001;',
      'display:flex;align-items:center;justify-content:center;padding:16px;font-family:Poppins,sans-serif;}',
      '.mdaq-card{width:100%;max-width:400px;background:#fff;border-radius:20px;overflow:hidden;',
      'box-shadow:0 24px 60px -18px rgba(43,35,32,.5);}',
      '.mdaq-top{display:flex;align-items:center;justify-content:space-between;padding:14px 16px 0;}',
      '.mdaq-back,.mdaq-close{width:28px;height:28px;border-radius:50%;background:#F3EFE8;',
      'display:flex;align-items:center;justify-content:center;color:#8a8177;font-size:15px;',
      'cursor:pointer;border:none;padding:0;}',
      '.mdaq-back[disabled]{visibility:hidden;}',
      '.mdaq-progress{display:flex;gap:6px;}',
      '.mdaq-dot{width:20px;height:5px;border-radius:100px;background:#E4DED6;}',
      '.mdaq-dot.done{background:'+ROJO+';}',
      '.mdaq-dot.current{background:'+ROJO+';opacity:.45;}',
      '.mdaq-body{padding:22px 24px 26px;}',
      '.mdaq-kicker{font-size:11.5px;font-weight:700;color:#8a8177;text-transform:uppercase;',
      'letter-spacing:.06em;margin:0 0 8px;}',
      '.mdaq-title{font-family:Fredoka,sans-serif;font-weight:700;font-size:20px;line-height:1.25;',
      'margin:0 0 20px;color:#2B2320;}',
      '.mdaq-opt{border:1.5px solid #E4DED6;border-radius:14px;padding:13px 16px;margin-bottom:10px;',
      'font-size:14px;font-weight:600;color:#2B2320;cursor:pointer;display:flex;',
      'align-items:center;justify-content:space-between;background:#fff;}',
      '.mdaq-opt:hover{border-color:#d8b8bf;}',
      '.mdaq-opt .mdaq-chk{width:16px;height:16px;border-radius:50%;border:1.5px solid #c8c0b6;flex:none;}',
      '.mdaq-optrow{display:flex;gap:12px;}',
      '.mdaq-opt2{flex:1;border:1.5px solid #E4DED6;border-radius:16px;padding:20px 10px 14px;',
      'text-align:center;cursor:pointer;}',
      '.mdaq-opt2 .mdaq-icon{width:46px;height:46px;margin:0 auto 8px;}',
      '.mdaq-opt2 .mdaq-icon svg{width:100%;height:100%;}',
      '.mdaq-opt2 .mdaq-lbl{font-size:14px;font-weight:600;color:#2B2320;}',
      '.mdaq-opt2:hover{border-color:#d8b8bf;}',
      '.mdaq-loading{text-align:center;padding:30px 0;color:#8a8177;font-size:13px;}',
      /* resultado */
      '.mdaq-rhead{background:'+ROJO+';padding:20px 22px 40px;position:relative;color:#fff;}',
      '.mdaq-rkicker{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;',
      'opacity:.85;margin:0 0 6px;}',
      '.mdaq-rsub{font-size:12.5px;opacity:.92;line-height:1.4;max-width:260px;}',
      '.mdaq-rmascot{position:absolute;right:18px;top:14px;width:40px;height:40px;background:#fff;',
      'border-radius:50%;display:flex;align-items:center;justify-content:center;',
      'box-shadow:0 6px 14px rgba(0,0,0,.2);}',
      '.mdaq-rmascot img{width:26px;height:26px;object-fit:contain;}',
      '.mdaq-rbody{padding:0 22px 22px;margin-top:-24px;}',
      '.mdaq-rproduct{background:#fff;border:1px solid #E4DED6;border-radius:16px;padding:18px;',
      'box-shadow:0 14px 30px -14px rgba(43,35,32,.25);margin-bottom:14px;}',
      '.mdaq-rname{font-family:Fredoka,sans-serif;font-weight:700;font-size:18px;margin:0 0 3px;color:#2B2320;}',
      '.mdaq-rtalle{font-size:12px;color:#8a8177;margin:0 0 10px;}',
      '.mdaq-rprice{font-family:Fredoka,sans-serif;font-weight:700;font-size:23px;color:'+ROJO+';margin:0 0 10px;}',
      '.mdaq-rprice span{font-family:Poppins,sans-serif;font-weight:500;font-size:11px;color:#8a8177;}',
      '.mdaq-rtags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;}',
      '.mdaq-rtag{font-size:11px;font-weight:600;padding:4px 9px;border-radius:100px;background:#F3EFE8;color:#5B5148;}',
      '.mdaq-rtag.on{background:#F7E9EA;color:#8f1330;}',
      '.mdaq-rtag.gift{background:#2B2320;color:#fff;}',
      '.mdaq-adjust{font-size:11.5px;color:#8a8177;background:#F3EFE8;border-radius:10px;',
      'padding:9px 11px;margin-bottom:12px;line-height:1.4;}',
      '.mdaq-cta{display:block;width:100%;text-align:center;background:'+ROJO+';color:#fff;',
      'font-weight:600;font-size:14px;padding:12px;border-radius:100px;border:none;',
      'text-decoration:none;box-sizing:border-box;}',
      '.mdaq-retry{display:block;width:100%;text-align:center;background:none;color:#8a8177;',
      'font-weight:600;font-size:12px;padding:9px;border:none;margin-top:4px;cursor:pointer;}',
      '.mdaq-showalt{display:block;width:100%;text-align:center;background:#F3EFE8;color:#2B2320;',
      'font-weight:600;font-size:12.5px;padding:10px;border-radius:100px;border:none;',
      'margin-bottom:10px;cursor:pointer;}',
      '.mdaq-rother{font-size:11.5px;color:#5B5148;}',
      '.mdaq-rother b{display:block;font-size:12px;color:#2B2320;margin-bottom:6px;}',
      '.mdaq-ralt{display:flex;justify-content:space-between;align-items:center;',
      'padding:8px 0;border-top:1px solid #EFEAE3;text-decoration:none;color:inherit;}',
      '.mdaq-ralt .n{font-weight:600;color:#2B2320;}',
      '.mdaq-ralt .p{font-weight:700;color:'+ROJO+';}',
      '.mdaq-disclaimer{font-size:10px;color:#a89e92;text-align:center;margin-top:12px;line-height:1.4;}',
      /* carrusel home: tarjeta del quiz + productos reales */
      '.mdaq-carwrap{font-family:Poppins,sans-serif;}',
      '.mdaq-hint{display:flex;align-items:center;gap:6px;padding:14px 18px 4px;',
      'font-size:12.5px;color:#8a8177;font-weight:600;}',
      '.mdaq-hint .mdaq-arrow{display:inline-block;animation:mdaqswipehint 1.4s ease-in-out infinite;}',
      '@keyframes mdaqswipehint{0%,100%{transform:translateX(0);}50%{transform:translateX(6px);}}',
      '.mdaq-carousel{display:flex;gap:14px;overflow-x:auto;padding:10px 18px 16px;',
      'scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;}',
      '.mdaq-carousel::-webkit-scrollbar{display:none;}',
      '.mdaq-ccard{flex:0 0 78%;scroll-snap-align:center;border-radius:20px;padding:18px 18px 16px;',
      'display:flex;flex-direction:column;align-items:flex-start;gap:6px;text-decoration:none;box-sizing:border-box;}',
      '.mdaq-ccard.mdaq-quiz{background:#E0F5FF;border:none;cursor:pointer;flex:0 0 82%;',
      'justify-content:flex-start;padding:20px 20px 18px;gap:0;}',
      '.mdaq-ccard.mdaq-prod{background:#fff;border:1.5px solid #E4DED6;color:inherit;}',
      '.mdaq-ccard-title{font-family:Fredoka,sans-serif;font-weight:700;font-size:16px;color:#2B2320;line-height:1.25;}',
      '.mdaq-ccard-title.mdaq-small{font-size:14.5px;margin-top:2px;}',
      '.mdaq-ccard.mdaq-quiz .mdaq-ccard-title{font-size:25px;color:'+ROJO+';line-height:1.15;',
      'max-width:92%;text-transform:uppercase;margin-bottom:8px;}',
      '.mdaq-ccard-sub{font-size:12px;color:#5B5148;line-height:1.4;}',
      '.mdaq-ccard.mdaq-quiz .mdaq-ccard-sub{color:'+ROJO+';opacity:.85;font-size:13.5px;',
      'margin:0 0 12px;line-height:1.4;max-width:88%;}',
      '.mdaq-ccard-cta{margin-top:4px;background:'+ROJO+';color:#fff;font-weight:700;font-size:12.5px;',
      'padding:8px 16px;border-radius:100px;}',
      '.mdaq-ccard-cta.mdaq-outline{background:none;color:'+ROJO+';border:1.5px solid '+ROJO+';padding:6.5px 14px;}',
      '.mdaq-ccard.mdaq-quiz .mdaq-ccard-cta{background:#FFF3F6;color:'+ROJO+';border:1.5px solid '+ROJO+';',
      'padding:6px 16px;font-size:13px;align-self:flex-start;}',
      '.mdaq-pimg{width:100%!important;height:110px!important;max-height:110px!important;object-fit:contain!important;border-radius:10px;background:#fafaf8;display:block;}',
      '.mdaq-ccard.mdaq-prod{max-width:220px;}',
      '.mdaq-pprice{font-family:Fredoka,sans-serif;font-weight:700;font-size:17px;color:#2B2320;margin-top:2px;}'
    ].join('');
    document.head.appendChild(style);
  }

  function iconoPerro(activo){
    var color = activo ? ROJO : '#5B5148';
    return '<svg viewBox="0 0 48 48" fill="none" stroke="'+color+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'+
      '<path d="M14 20c-3-2-6-7-4-11 3-1 7 1 8 5"/><path d="M34 20c3-2 6-7 4-11 -3-1-7 1-8 5"/>'+
      '<ellipse cx="24" cy="27" rx="13" ry="11"/><circle cx="19" cy="25" r="1.4" fill="'+color+'"/>'+
      '<circle cx="29" cy="25" r="1.4" fill="'+color+'"/><path d="M20 32c1.5 1.5 6.5 1.5 8 0"/></svg>';
  }
  function iconoGato(activo){
    var color = activo ? ROJO : '#5B5148';
    return '<svg viewBox="0 0 48 48" fill="none" stroke="'+color+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'+
      '<path d="M13 19l-3-9 8 5"/><path d="M35 19l3-9-8 5"/><ellipse cx="24" cy="27" rx="13" ry="11"/>'+
      '<circle cx="19" cy="25" r="1.4" fill="'+color+'"/><circle cx="29" cy="25" r="1.4" fill="'+color+'"/>'+
      '<path d="M20 31l4 2 4-2"/><path d="M14 29l-4-1M14 32l-4 1M34 29l4-1M34 32l4 1"/></svg>';
  }

  function crearOverlay(){
    overlay = document.createElement('div');
    overlay.className = 'mdaq-overlay';
    overlay.innerHTML =
      '<div class="mdaq-card">' +
        '<div class="mdaq-top">' +
          '<button class="mdaq-back" id="mdaqBack">‹</button>' +
          '<div class="mdaq-progress" id="mdaqProgress"></div>' +
          '<button class="mdaq-close" id="mdaqClose">×</button>' +
        '</div>' +
        '<div id="mdaqBody"></div>' +
      '</div>';
    overlay.addEventListener('click', function(e){ if (e.target===overlay) cerrarQuiz(); });
    document.body.appendChild(overlay);
    modalBody = overlay.querySelector('#mdaqBody');
    overlay.querySelector('#mdaqClose').addEventListener('click', cerrarQuiz);
    overlay.querySelector('#mdaqBack').addEventListener('click', irAtras);
  }

  function actualizarProgreso(pasoActual){
    var plan = calcularPlan();
    var idx = plan.indexOf(pasoActual);
    var cont = overlay.querySelector('#mdaqProgress');
    var html = '';
    for (var i=0;i<plan.length;i++){
      var cls = 'mdaq-dot';
      if (i<idx) cls += ' done';
      else if (i===idx) cls += ' current';
      html += '<div class="'+cls+'"></div>';
    }
    cont.innerHTML = html;
    overlay.querySelector('#mdaqBack').disabled = (historial.length===0);
  }

  function irAtras(){
    if (!historial.length) return;
    var pasoAnterior = historial.pop();
    respuestas[STEP_FIELDS[pasoAnterior]] = null;
    // limpiar también cualquier respuesta posterior a ese paso en el flujo lógico
    if (pasoAnterior==='especie'){ respuestas.peso=null; respuestas.coberturaKey=null; respuestas.formato=null; respuestas.duracion=null; historial=[]; }
    if (pasoAnterior==='peso'){ respuestas.coberturaKey=null; respuestas.formato=null; respuestas.duracion=null; }
    if (pasoAnterior==='cobertura'){ respuestas.formato=null; respuestas.duracion=null; }
    if (pasoAnterior==='duracion'){ respuestas.formato=null; }
    renderPaso(pasoAnterior);
  }

  function elegir(paso, valor){
    respuestas[STEP_FIELDS[paso]] = valor;
    historial.push(paso);
    renderPaso(siguientePasoPendiente());
  }

  function renderPaso(paso){
    if (paso==='resultado') return renderResultado();
    if (paso==='especie') return renderEspecie();
    if (paso==='peso') return renderPeso();
    if (paso==='cobertura') return renderCobertura();
    if (paso==='formato') return renderFormato();
    if (paso==='duracion') return renderDuracion();
  }

  function renderEspecie(){
    modalBody.innerHTML =
      '<div class="mdaq-body">' +
        '<p class="mdaq-kicker">Pregunta 1</p>' +
        '<h2 class="mdaq-title">¿Es para tu perro o tu gato?</h2>' +
        '<div class="mdaq-optrow">' +
          '<div class="mdaq-opt2" data-v="perro"><div class="mdaq-icon">'+iconoPerro(true)+'</div><div class="mdaq-lbl">Perro</div></div>' +
          '<div class="mdaq-opt2" data-v="gato"><div class="mdaq-icon">'+iconoGato(false)+'</div><div class="mdaq-lbl">Gato</div></div>' +
        '</div>' +
      '</div>';
    Array.prototype.forEach.call(modalBody.querySelectorAll('.mdaq-opt2'), function(el){
      el.addEventListener('click', function(){ elegir('especie', el.getAttribute('data-v')); });
    });
    actualizarProgreso('especie');
  }

  function renderPeso(){
    var opciones = PESO_OPCIONES[respuestas.especie];
    var html = '<div class="mdaq-body"><p class="mdaq-kicker">Pregunta 2</p>' +
      '<h2 class="mdaq-title">¿Cuánto pesa aproximadamente?</h2>';
    opciones.forEach(function(o){
      html += '<div class="mdaq-opt" data-v="'+o.value+'"><span>'+o.label+'</span><span class="mdaq-chk"></span></div>';
    });
    html += '</div>';
    modalBody.innerHTML = html;
    Array.prototype.forEach.call(modalBody.querySelectorAll('.mdaq-opt'), function(el){
      el.addEventListener('click', function(){ elegir('peso', parseFloat(el.getAttribute('data-v'))); });
    });
    actualizarProgreso('peso');
  }

  function renderCobertura(){
    var opciones = [
      { v:'externa', label:'Solo pulgas y garrapatas' },
      { v:'completa', label:'También parásitos internos (lombrices, gusano del corazón)' },
      { v:'interna_sola', label:'Pulgas y parásitos internos (no me preocupan las garrapatas)' }
    ];
    var html = '<div class="mdaq-body"><p class="mdaq-kicker">Pregunta 3</p><h2 class="mdaq-title">¿Qué necesita cubrir?</h2>';
    opciones.forEach(function(o){
      html += '<div class="mdaq-opt" data-v="'+o.v+'"><span>'+o.label+'</span><span class="mdaq-chk"></span></div>';
    });
    html += '</div>';
    modalBody.innerHTML = html;
    Array.prototype.forEach.call(modalBody.querySelectorAll('.mdaq-opt'), function(el){
      el.addEventListener('click', function(){ elegir('cobertura', el.getAttribute('data-v')); });
    });
    actualizarProgreso('cobertura');
  }

  var FORMATO_LABELS = { comprimido:'Comprimido', pipeta:'Pipeta', collar:'Collar' };
  var FORMATO_ORDEN = ['comprimido','pipeta','collar'];
  var DURACION_LABELS = { mensual:'Mensual', '3meses':'Cada 3 meses', collar:'Collar de larga duración (8 a 10 meses)' };
  var DURACION_ORDEN = ['mensual','3meses','collar'];

  function renderFormato(){
    var lista = candidatosParaPreguntas();
    if (respuestas.duracion) lista = lista.filter(function(p){ return p.duracion===respuestas.duracion; });
    var formatos = unique(lista.map(function(p){ return p.formato; }));
    formatos.sort(function(a,b){ return FORMATO_ORDEN.indexOf(a)-FORMATO_ORDEN.indexOf(b); });

    var html = '<div class="mdaq-body"><p class="mdaq-kicker">Última pregunta</p><h2 class="mdaq-title">¿Comprimido o pipeta?</h2>';
    formatos.forEach(function(f){
      html += '<div class="mdaq-opt" data-v="'+f+'"><span>'+FORMATO_LABELS[f]+'</span><span class="mdaq-chk"></span></div>';
    });
    html += '</div>';
    modalBody.innerHTML = html;
    Array.prototype.forEach.call(modalBody.querySelectorAll('.mdaq-opt'), function(el){
      el.addEventListener('click', function(){ elegir('formato', el.getAttribute('data-v')); });
    });
    actualizarProgreso('formato');
  }

  function renderDuracion(){
    var lista = candidatosParaPreguntas();
    var duraciones = unique(lista.map(function(p){ return p.duracion; }));
    duraciones.sort(function(a,b){ return DURACION_ORDEN.indexOf(a)-DURACION_ORDEN.indexOf(b); });

    var html = '<div class="mdaq-body"><p class="mdaq-kicker">Una más</p><h2 class="mdaq-title">¿Cada cuánto preferís aplicarlo?</h2>';
    duraciones.forEach(function(d){
      html += '<div class="mdaq-opt" data-v="'+d+'"><span>'+DURACION_LABELS[d]+'</span><span class="mdaq-chk"></span></div>';
    });
    html += '</div>';
    modalBody.innerHTML = html;
    Array.prototype.forEach.call(modalBody.querySelectorAll('.mdaq-opt'), function(el){
      el.addEventListener('click', function(){ elegir('duracion', el.getAttribute('data-v')); });
    });
    actualizarProgreso('duracion');
  }

  function renderResultado(){
    modalBody.innerHTML = '<div class="mdaq-body"><div class="mdaq-loading">Buscando la mejor opción disponible…</div></div>';
    overlay.querySelector('#mdaqProgress').innerHTML = '';
    overlay.querySelector('#mdaqBack').disabled = true;
    calcularResultadoAsync().then(function(r){
      pintarResultado(r);
      registrarEnPlanilla(r);
    });
  }

  function pintarResultado(r){
    var p = r.principal;
    var duracionLabel = p.duracionLabel || DURACION_LABELS[p.duracion] || p.duracion;
    var formatoLabel = FORMATO_LABELS[p.formato] || p.formato;
    var coberturaLabels;
    var notaSinGarrapatas = '';
    if (respuestas.coberturaKey==='completa'){
      coberturaLabels = '<span class="mdaq-rtag on">Pulgas</span><span class="mdaq-rtag on">Garrapatas</span><span class="mdaq-rtag on">Internos</span>';
    } else if (respuestas.coberturaKey==='interna_sola'){
      coberturaLabels = '<span class="mdaq-rtag on">Pulgas</span><span class="mdaq-rtag on">Internos</span>';
      notaSinGarrapatas = '<div class="mdaq-adjust">⚠️ Esta opción NO protege contra garrapatas — cubre pulgas y parásitos internos únicamente.</div>';
    } else {
      coberturaLabels = '<span class="mdaq-rtag on">Pulgas</span><span class="mdaq-rtag on">Garrapatas</span>';
    }

    var html =
      '<div class="mdaq-rhead">' +
        '<div class="mdaq-rmascot"><img src="'+LOGO_URL+'" alt=""></div>' +
        '<p class="mdaq-rkicker">Tu recomendación</p>' +
        '<div class="mdaq-rsub">Para ' + respuestas.especie + ' · ' + r.talle.label + '</div>' +
      '</div>' +
      '<div class="mdaq-rbody">' +
        '<div class="mdaq-rproduct">' +
          '<p class="mdaq-rname">'+p.nombre+'</p>' +
          '<p class="mdaq-rtalle">Talle '+r.talle.label+'</p>' +
          '<p class="mdaq-rprice">'+formatearPrecio(p.precio)+' <span>precio actual en la tienda</span></p>' +
          '<div class="mdaq-rtags">'+coberturaLabels+
            '<span class="mdaq-rtag">'+formatoLabel+'</span>' +
            '<span class="mdaq-rtag">'+duracionLabel+'</span>' +
            (p.regalo ? '<span class="mdaq-rtag gift">🎁 Cepillo de vapor de regalo</span>' : '') +
          '</div>' +
          notaSinGarrapatas +
          (r.ajustado ? '<div class="mdaq-adjust">Tu mascota está por fuera del talle más grande disponible para esta opción — te mostramos igual la más cercana. Si tenés dudas, escribinos y te ayudamos a elegir.</div>' : '') +
          '<a class="mdaq-cta" href="'+(p.url||TIENDA_URL)+'" target="_blank" rel="noopener">IR A LA TIENDA</a>' +
          '<button class="mdaq-retry" id="mdaqRetry">Volver a hacer el quiz</button>' +
        '</div>' +
        (r.otras.length ? (
          '<button class="mdaq-showalt" id="mdaqShowAlt">Mostrar otra opción</button>' +
          '<div class="mdaq-rother" id="mdaqOtras" style="display:none;"><b>Otras opciones</b>' +
          r.otras.map(function(o){
            return '<a class="mdaq-ralt" href="'+(o.url||TIENDA_URL)+'" target="_blank" rel="noopener"><span class="n">'+o.nombre+'</span><span class="p">'+formatearPrecio(o.precio)+'</span></a>';
          }).join('') +
          '</div>'
        ) : '') +
        '<p class="mdaq-disclaimer">Precio consultado en el momento en la ficha del producto. Confirmá el talle exacto antes de comprar.</p>' +
      '</div>';

    modalBody.innerHTML = html;
    overlay.querySelector('#mdaqRetry').addEventListener('click', function(){
      reiniciarEstado();
      renderEspecie();
    });
    var btnAlt = overlay.querySelector('#mdaqShowAlt');
    if (btnAlt){
      btnAlt.addEventListener('click', function(){
        var otrasDiv = overlay.querySelector('#mdaqOtras');
        var mostrando = otrasDiv.style.display !== 'none';
        otrasDiv.style.display = mostrando ? 'none' : 'block';
        btnAlt.textContent = mostrando ? 'Mostrar otra opción' : 'Ocultar';
      });
    }
    // en el resultado no tiene sentido "atrás" en el sentido de pregunta, pero dejamos volver a la última pregunta
    overlay.querySelector('#mdaqProgress').innerHTML = '';
    overlay.querySelector('#mdaqBack').disabled = (historial.length===0);
  }

  // ---------- Apertura / cierre ----------
  window.abrirQuizAntiparasitarioMDA = function(){
    inyectarEstilos();
    reiniciarEstado();
    if (!overlay) crearOverlay();
    document.body.style.overflow = 'hidden';
    overlay.style.display = 'flex';
    renderEspecie();
  };

  function cerrarQuiz(){
    if (overlay) overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Cualquier elemento con data-mda-quiz="1" abre el quiz (para conectar el banner cuando esté listo)
  document.addEventListener('click', function(e){
    var t = e.target.closest ? e.target.closest('[data-mda-quiz]') : null;
    if (t){ e.preventDefault(); window.abrirQuizAntiparasitarioMDA(); }
  });

  // ---------- Carrusel en la home (tarjeta del quiz + productos reales) ----------
  function esHome(){
    var ruta = location.pathname.replace(/\/+$/, '');
    return ruta === '' || ruta === '/index.html';
  }

  // Productos reales que se muestran en el carrusel de la home. El nombre y la
  // bajada quedan escritos a mano (ya verificados), pero la FOTO, el PRECIO y el
  // STOCK se traen en vivo desde la ficha real al cargar la página — si mañana
  // cambia la foto del producto en la tienda, se actualiza sola acá también.
  // Para sumar o sacar productos del carrusel, editar esta lista.
  var PRODUCTOS_CARRUSEL = [
    { url:'https://mascotasdelabadia.com.ar/productos/nexgard-spectra-comprimido-antiparasitario-interno-y-externo-para-perros-8714-12sy2/',
      nombre:'NexGard Spectra Comprimido', sub:'Perros · pulgas, garrapatas e internos' },
    { url:'https://mascotasdelabadia.com.ar/productos/frontline-plus-pipeta-antipulgas-y-garrapatas-para-perros-8701-1iop9/',
      nombre:'Frontline Plus Pipeta', sub:'Perros · pulgas y garrapatas' },
    { url:'https://mascotasdelabadia.com.ar/productos/seresto-perros-y-gatos-9205-1qava/',
      nombre:'Seresto Collar', sub:'Perros y gatos · collar de larga duración' },
    { url:'https://mascotasdelabadia.com.ar/productos/bravecto-pipeta-antipulgas-y-garrapatas-para-gatos-10502-1s54g/',
      nombre:'Bravecto Pipeta', sub:'Gatos · pulgas y garrapatas, cada 3 meses' }
  ];

  // Busca en la ficha real: foto (og:image), precio y stock. Si algo esencial no
  // se pudo leer (falla la red, cambia el HTML de la tienda, etc.) devuelve null
  // y esa tarjeta directamente no se muestra, en vez de mostrar datos incompletos.
  function obtenerDatosVitrina(item){
    return fetch(item.url, { credentials:'omit' })
      .then(function(res){ return res.text(); })
      .then(function(html){
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var imgTag = doc.querySelector('meta[property="og:image"]');
        var imagen = imgTag ? imgTag.getAttribute('content') : '';
        var mPrecio = html.match(/"price"\s*:\s*"?(\d+(?:\.\d+)?)"?/i);
        var precio = mPrecio ? Math.round(parseFloat(mPrecio[1])) : null;
        var mStock = html.match(/"availability"\s*:\s*"[^"]*\/(InStock|OutOfStock|LimitedAvailability|PreOrder|SoldOut)"/i);
        var enStock = mStock ? !/outofstock|soldout/i.test(mStock[1]) : !/sin\s*stock/i.test(html);
        if (!imagen || !precio) return null;
        return { url:item.url, nombre:item.nombre, sub:item.sub, imagen:imagen, precio:precio, enStock:enStock };
      })
      .catch(function(){ return null; });
  }

  // Ubica dónde insertar el carrusel del quiz. Dos estrategias, en orden:
  // 1) Justo DESPUÉS del carrusel de imágenes principal de la home (que usa
  //    la librería Swiper.js — confirmado inspeccionando la tienda: las
  //    fotos tienen clases "swiper-lazy"/"swiper-lazy-loaded" de esa
  //    librería, aunque el tema le puso un nombre propio a cada slide).
  //    Se sube desde una foto del carrusel hasta encontrar el contenedor
  //    raíz (clase exacta "swiper" o "swiper-container") y se devuelve el
  //    elemento que sigue a continuación, para insertar justo ahí.
  // 2) Si no se encuentra: justo arriba del título "Marcas" (la sección de
  //    logos de marcas), que también suele estar después de ese carrusel.
  // Si ninguna de las dos aparece, se usa un respaldo más simple.
  function encontrarAnclaje(){
    var slide = document.querySelector('.slider-slide, .swiper-slide');
    if (slide){
      var el = slide;
      for (var j=0;j<10 && el.parentElement && el.parentElement!==document.body;j++){
        el = el.parentElement;
        var clases = ' ' + (el.className||'').toString() + ' ';
        if (clases.indexOf(' swiper ')!==-1 || clases.indexOf(' swiper-container ')!==-1){
          if (el.nextElementSibling) return el.nextElementSibling;
          break;
        }
      }
    }
    var titulos = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
    for (var i=0;i<titulos.length;i++){
      var txt = (titulos[i].textContent||'').trim().toUpperCase();
      if (txt!=='MARCAS') continue;
      var el2 = titulos[i];
      for (var k=0;k<6 && el2.parentElement && el2.parentElement!==document.body;k++){
        if (el2.offsetWidth >= window.innerWidth*0.7) return el2;
        el2 = el2.parentElement;
      }
      return titulos[i];
    }
    return null;
  }

  // El carrusel de imágenes principal puede tardar en aparecer en la página
  // (se arma con JavaScript después de cargar, no está en el HTML inicial).
  // En vez de reintentar un número fijo de veces, observamos la página con
  // MutationObserver y construimos el carrusel del quiz apenas aparezca el
  // carrusel de fotos — sin importar cuánto tarde. Como límite de seguridad,
  // si a los 15 segundos todavía no apareció, se resigna a un respaldo (para
  // que el quiz no falte del todo si algo cambia en la tienda).
  function construirCarruselHome(){
    if (!esHome()) return;
    inyectarEstilos();
    var yaConstruido = false;
    function intentar(){
      if (yaConstruido) return true;
      var anclaje = encontrarAnclaje();
      if (anclaje){
        yaConstruido = true;
        insertarCarruselHome(anclaje);
        return true;
      }
      return false;
    }
    if (intentar()) return;
    var observer = (typeof MutationObserver !== 'undefined') ? new MutationObserver(function(){
      if (intentar() && observer) observer.disconnect();
    }) : null;
    if (observer) observer.observe(document.body, { childList:true, subtree:true });
    setTimeout(function(){
      if (yaConstruido) return;
      if (observer) observer.disconnect();
      insertarCarruselHome(null);
      yaConstruido = true;
    }, 15000);
  }

  function insertarCarruselHome(anclaje){
    var cont = document.createElement('div');
    cont.className = 'mdaq-carwrap';
    cont.innerHTML =
      '<div class="mdaq-hint"><span>Deslizá para ver más</span><span class="mdaq-arrow">→</span></div>' +
      '<div class="mdaq-carousel" id="mdaqCarousel">' +
        '<div class="mdaq-ccard mdaq-quiz" id="mdaqQuizCard">' +
          '<div class="mdaq-ccard-title">¿Qué<br>antiparasitario<br>necesita tu<br>mascota?</div>' +
          '<div class="mdaq-ccard-sub">Respondé 4 preguntas y te decimos cuál es el indicado!</div>' +
          '<div class="mdaq-ccard-cta">Hacer Quiz!</div>' +
        '</div>' +
      '</div>';
    if (anclaje && anclaje.parentNode){
      anclaje.parentNode.insertBefore(cont, anclaje);
    } else {
      var header = document.querySelector('header');
      if (header && header.parentNode){
        header.parentNode.insertBefore(cont, header.nextSibling);
      } else {
        document.body.insertBefore(cont, document.body.firstChild);
      }
    }
    cont.querySelector('#mdaqQuizCard').addEventListener('click', function(){ window.abrirQuizAntiparasitarioMDA(); });

    var carouselEl = cont.querySelector('#mdaqCarousel');
    Promise.all(PRODUCTOS_CARRUSEL.map(obtenerDatosVitrina)).then(function(items){
      items.forEach(function(p){
        if (!p || !p.enStock) return;
        var a = document.createElement('a');
        a.className = 'mdaq-ccard mdaq-prod';
        a.href = p.url; a.target = '_blank'; a.rel = 'noopener';
        a.innerHTML =
          '<img class="mdaq-pimg" src="'+p.imagen+'" alt="'+p.nombre+'" loading="lazy">' +
          '<div class="mdaq-ccard-title mdaq-small">'+p.nombre+'</div>' +
          '<div class="mdaq-ccard-sub">'+p.sub+'</div>' +
          '<div class="mdaq-pprice">'+formatearPrecio(p.precio)+'</div>' +
          '<div class="mdaq-ccard-cta mdaq-outline">Ver producto →</div>';
        carouselEl.appendChild(a);
      });
    });
  }

  if (document.readyState==='complete' || document.readyState==='interactive'){
    construirCarruselHome();
  } else {
    document.addEventListener('DOMContentLoaded', construirCarruselHome);
  }

})();
