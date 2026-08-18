const screens = {
    dashboard: { title: 'Dashboard', sub: 'Julio 2026', actions: '<button class="btn btn-dark" onclick="goto(\'upload\')"><i class="ti ti-upload"></i> Cargar documento</button>' },
    upload:    { title: 'Cargar documento', sub: 'Sube una factura o packing list para procesar', actions: '' },
    results:   { title: 'Resultados de extracción', sub: 'INV_SHENZHEN_0048.pdf', actions: '' },
    review:    { title: 'Revisión manual', sub: '2 campos requieren corrección', actions: '<span class="badge orange" style="font-size:12px;padding:5px 12px;"><i class="ti ti-alert-triangle"></i> 2 pendientes</span>' },
    history:   { title: 'Historial de documentos', sub: '347 documentos procesados', actions: '<button class="btn btn-dark"><i class="ti ti-download"></i> Exportar todo</button>' },
    detail:    { title: 'Detalle del documento', sub: 'INV_SHENZHEN_0048.pdf', actions: '' },
    settings:  { title: 'Configuración', sub: 'Parámetros del sistema IDP', actions: '' },
  };

  const screenMap = {
    dashboard: 'screen-dashboard',
    upload:    'screen-upload',
    results:   'screen-results',
    review:    'screen-review',
    history:   'screen-history',
    detail:    'screen-detail',
    settings:  'screen-settings',
  };

  const navMap = {
    dashboard: 0, upload: 1, history: 2,
    results: 2, review: 3, detail: 2, settings: 4,
  };

  function goto(key) {
    // Screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenMap[key]).classList.add('active');

    // Topbar
    const cfg = screens[key];
    document.getElementById('tb-title').textContent = cfg.title;
    document.getElementById('tb-sub').textContent = cfg.sub;
    document.getElementById('tb-actions').innerHTML = cfg.actions;

    // Nav
    const items = document.querySelectorAll('.nav-item');
    items.forEach(i => i.classList.remove('active'));
    if (navMap[key] !== undefined) items[navMap[key]].classList.add('active');

    window.scrollTo(0, 0);
  }

  // Upload
  function selectTipo(t) {
    document.getElementById('t-factura').classList.toggle('selected', t === 'factura');
    document.getElementById('t-packing').classList.toggle('selected', t === 'packing');
  }

  let fileShown = false;
  function simularArchivo() {
    if (fileShown) return;
    fileShown = true;
    document.getElementById('file-preview').classList.add('show');
  }

  function iniciarProceso() {
    simularArchivo();
    document.getElementById('proc-steps').classList.add('show');
    const steps = ['s1','s2','s3','s4','s5'];
    let i = 0;
    function next() {
      if (i > 0) {
        const prev = document.querySelector('#'+steps[i-1]+' .step-dot');
        prev.className = 'step-dot done';
        prev.innerHTML = '<i class="ti ti-check" style="font-size:11px;"></i>';
      }
      if (i < steps.length) {
        const cur = document.querySelector('#'+steps[i]+' .step-dot');
        cur.className = 'step-dot active';
        cur.innerHTML = '<i class="ti ti-loader-2" style="font-size:11px;"></i>';
        i++;
        setTimeout(next, 900);
      } else {
        setTimeout(() => goto('results'), 600);
      }
    }
    next();
  }

  // Review
  function confirmar(cardId, okId) {
    document.getElementById(cardId).style.display = 'none';
    document.getElementById(okId).style.display = 'block';
  }
  function confirmarTodo() {
    confirmar('cc-incoterm','incoterm-ok');
    confirmar('cc-desc','desc-ok');
  }

  // Export
  function exportarExcel() {
    const btn = document.getElementById('btn-excel');
    btn.innerHTML = '<i class="ti ti-loader-2"></i> Generando...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<i class="ti ti-check"></i> Exportado';
      btn.style.background = '#7A9648';
      document.getElementById('export-notif').classList.add('show');
    }, 1200);
  }