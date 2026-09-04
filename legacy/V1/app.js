// Lógica de la Aplicación Horarios Bus T14 PWA

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  
  // Si estamos en localhost, auto-generar los iconos PNG de la PWA desde el SVG
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    generatePWAIcons();
  }
});

// VARIABLES DE ESTADO
let currentStop = localStorage.getItem('selectedStop') || 'Tarazona. Avenida de Ciudad de Teruel';
let currentTab = 'next-bus';
let allStops = [];

// INICIALIZACIÓN
function initApp() {
  // 1. Obtener lista única de paradas
  extractUniqueStops();
  
  // 2. Registrar eventos de la UI
  setupEventListeners();
  
  // 3. Renderizar pantallas
  renderStopSelector();
  updateNextBusScreen();
  populateExplorerOptions();
  
  // 4. Registrar Service Worker para PWA Offline
  registerServiceWorker();
}

// 1. EXTRACCIÓN DE PARADAS
function extractUniqueStops() {
  const stopsSet = new Set();
  
  SCHEDULE_DATA.forEach(route => {
    route.stopsTo.forEach(stop => stopsSet.add(stop));
    route.stopsFrom.forEach(stop => stopsSet.add(stop));
  });
  
  allStops = Array.from(stopsSet).sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
  
  // Validar si la parada guardada existe en los datos
  if (!allStops.includes(currentStop)) {
    currentStop = allStops[0];
  }
}

// 2. REGISTRO DE EVENTOS
function setupEventListeners() {
  // Tabs Navigation
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', toggleTheme);
  
  // Cargar tema inicial
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.textContent = '🌙';
  }

  // Selector de parada (Dashboard Trigger)
  const selectorTrigger = document.getElementById('stopSelectorTrigger');
  selectorTrigger.addEventListener('click', openStopSelectionSheet);

  // Bottom Sheet Close
  const sheetClose = document.getElementById('sheetClose');
  sheetClose.addEventListener('click', closeStopSelectionSheet);
  document.getElementById('sheetBackdrop').addEventListener('click', closeStopSelectionSheet);

  // Search input in Bottom Sheet
  const searchInput = document.getElementById('stopSearchInput');
  searchInput.addEventListener('input', (e) => {
    filterStopsList(e.target.value);
  });

  // Time screen elements
  const timeSearchInput = document.getElementById('timeSearchInput');
  // Poner hora actual
  const now = new Date();
  const formatTime = (d) => String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  timeSearchInput.value = formatTime(now);
  
  timeSearchInput.addEventListener('input', () => {
    updateTimeSearchScreen();
  });

  // Explorer Screen elements
  const explorerDaySelect = document.getElementById('explorerDaySelect');
  const explorerTimeInput = document.getElementById('explorerTimeInput');
  const explorerDirectionSelect = document.getElementById('explorerDirectionSelect');
  const explorerRouteSelect = document.getElementById('explorerRouteSelect');

  explorerDaySelect.addEventListener('change', updateExplorerScreen);
  explorerTimeInput.addEventListener('input', updateExplorerScreen);
  explorerDirectionSelect.addEventListener('change', updateExplorerScreen);
  explorerRouteSelect.addEventListener('change', updateExplorerScreen);
}

// TABS SYSTEM
function switchTab(tabId) {
  currentTab = tabId;
  
  // Cambiar botones activos
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });
  
  // Cambiar pantallas activas
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.toggle('active', screen.id === `${tabId}-screen`);
  });
  
  // Actualizar datos según la vista
  if (tabId === 'next-bus') {
    updateNextBusScreen();
  } else if (tabId === 'by-time') {
    updateTimeSearchScreen();
  } else if (tabId === 'explorer') {
    updateExplorerScreen();
  }
}

// TEMA
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  document.getElementById('themeToggle').textContent = isLight ? '🌙' : '☀️';
}

// BOTTOM SHEET DE SELECCIÓN DE PARADA
function openStopSelectionSheet() {
  const sheet = document.getElementById('stopSelectionSheet');
  sheet.classList.add('open');
  document.getElementById('stopSearchInput').value = '';
  document.getElementById('stopSearchInput').focus();
  filterStopsList('');
}

function closeStopSelectionSheet() {
  const sheet = document.getElementById('stopSelectionSheet');
  sheet.classList.remove('open');
}

function selectStop(stopName) {
  currentStop = stopName;
  localStorage.setItem('selectedStop', stopName);
  
  renderStopSelector();
  closeStopSelectionSheet();
  
  // Actualizar pantallas
  if (currentTab === 'next-bus') {
    updateNextBusScreen();
  } else if (currentTab === 'by-time') {
    updateTimeSearchScreen();
  }
}

function renderStopSelector() {
  document.getElementById('currentStopLabel').textContent = currentStop;
}

function filterStopsList(query) {
  const container = document.getElementById('stopsListContainer');
  container.innerHTML = '';
  
  const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  const filtered = allStops.filter(stop => {
    const normalizedStop = stop.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return normalizedStop.includes(normalizedQuery);
  });
  
  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'no-bus-msg';
    empty.textContent = 'No se encontraron paradas';
    container.appendChild(empty);
    return;
  }
  
  filtered.forEach(stop => {
    const btn = document.createElement('button');
    btn.className = `stop-item-btn ${stop === currentStop ? 'selected' : ''}`;
    
    // Clean display name (removing dots or specifics if needed, but keeping it full is safer)
    btn.innerHTML = `
      <span>${stop}</span>
      ${stop === currentStop ? '<span class="stop-item-indicator">✓</span>' : ''}
    `;
    
    btn.addEventListener('click', () => selectStop(stop));
    container.appendChild(btn);
  });
}

// ----------------------------------------------------
// ALGORITMO DE CÁLCULO DE BUSES
// ----------------------------------------------------

// Retorna los caracteres del tipo de día de hoy
function getTodayChars(simulatedDate = null) {
  const date = simulatedDate || new Date();
  
  // Formatear fecha local YYYY-MM-DD
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - (offset * 60 * 1000));
  const dateString = localDate.toISOString().split('T')[0];
  
  // Validar festivo
  if (HOLIDAYS_2026_2027.includes(dateString)) {
    return ['D', 'F'];
  }
  
  const day = date.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  if (day === 0) return ['D', 'F'];
  if (day === 6) return ['S'];
  
  // Retornar carácter del día de semana específico
  const weekDays = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
  return [weekDays[day]];
}

// Parsea un string hh:mm a minutos desde las 00:00
function parseTimeToMinutes(timeStr) {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

// Formatea minutos a string hh:mm
function formatMinutesToTime(minutes) {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
}

// Obtiene todos los viajes que pasan por la parada seleccionada hoy a partir de cierta hora
function getNextBusesFromStop(stopName, timeStr, dayChars = null) {
  const targetMin = parseTimeToMinutes(timeStr);
  const activeDays = dayChars || getTodayChars();
  
  let candidates = [];
  
  SCHEDULE_DATA.forEach(route => {
    // 1. Sentido de Ida (stopsTo, runsTo)
    const indexTo = route.stopsTo.indexOf(stopName);
    if (indexTo !== -1) {
      route.runsTo.forEach((run, runIndex) => {
        // Verificar si el viaje corre hoy
        const runsToday = run.days.some(day => activeDays.includes(day));
        if (runsToday) {
          const depTimeStr = run.times[indexTo];
          if (depTimeStr) {
            const depMin = parseTimeToMinutes(depTimeStr);
            const destination = route.stopsTo[route.stopsTo.length - 1];
            candidates.push({
              routeId: route.id,
              routeName: route.name,
              direction: 'To',
              destination: destination,
              departureTime: depTimeStr,
              departureMin: depMin,
              runDays: run.days,
              isDemand: route.name.includes("Demanda")
            });
          }
        }
      });
    }

    // 2. Sentido de Vuelta (stopsFrom, runsFrom)
    const indexFrom = route.stopsFrom.indexOf(stopName);
    if (indexFrom !== -1) {
      route.runsFrom.forEach((run, runIndex) => {
        const runsToday = run.days.some(day => activeDays.includes(day));
        if (runsToday) {
          const depTimeStr = run.times[indexFrom];
          if (depTimeStr) {
            const depMin = parseTimeToMinutes(depTimeStr);
            const destination = route.stopsFrom[route.stopsFrom.length - 1];
            candidates.push({
              routeId: route.id,
              routeName: route.name,
              direction: 'From',
              destination: destination,
              departureTime: depTimeStr,
              departureMin: depMin,
              runDays: run.days,
              isDemand: route.name.includes("Demanda")
            });
          }
        }
      });
    }
  });

  // Ordenar candidatos por hora de salida
  candidates.sort((a, b) => a.departureMin - b.departureMin);
  
  return candidates;
}

// ----------------------------------------------------
// PANTALLA 1: PRÓXIMO BUS (DASHBOARD)
// ----------------------------------------------------
function updateNextBusScreen() {
  const container = document.getElementById('nextBusDashboard');
  container.innerHTML = '';
  
  const now = new Date();
  const currentHourMinStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  const nowMin = parseTimeToMinutes(currentHourMinStr);
  const todayChars = getTodayChars(now);
  
  // Obtener todos los buses que salen hoy
  const allRunsToday = getNextBusesFromStop(currentStop, "00:00", todayChars);
  
  if (allRunsToday.length === 0) {
    container.innerHTML = `
      <div class="no-bus-msg">
        No hay autobuses programados para pasar por <strong>${currentStop}</strong> en el día de hoy.
      </div>`;
    return;
  }

  // Filtrar los que salen a partir de ahora (o buscar los siguientes)
  // Sentido A (Hacia Zaragoza) y Sentido B (Desde Zaragoza / Hacia Origen)
  // Nota: si el destino final es Zaragoza, es "Hacia Zaragoza". Si es otra parada, es "Hacia XXX".
  
  const toZaragozaCandidates = allRunsToday.filter(r => r.destination.includes("Zaragoza") && r.departureMin >= nowMin);
  const fromZaragozaCandidates = allRunsToday.filter(r => !r.destination.includes("Zaragoza") && r.departureMin >= nowMin);
  
  // Si no quedan buses hoy, buscamos los primeros del día siguiente
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowChars = getTodayChars(tomorrowDate);
  
  const nextToZaragoza = toZaragozaCandidates[0] || getNextBusesFromStop(currentStop, "00:00", tomorrowChars).filter(r => r.destination.includes("Zaragoza"))[0];
  const nextFromZaragoza = fromZaragozaCandidates[0] || getNextBusesFromStop(currentStop, "00:00", tomorrowChars).filter(r => !r.destination.includes("Zaragoza"))[0];

  // Renderizar Tarjeta 1: Hacia Zaragoza
  renderDashboardCard(container, nextToZaragoza, `Hacia Zaragoza`, nowMin, now);

  // Renderizar Tarjeta 2: Desde Zaragoza (Vuelta / Local)
  // Si estamos en Zaragoza, el destino será otro (Tarazona, Borja, Novillas, etc.).
  const titleVuelta = currentStop.includes("Zaragoza") ? `Hacia Pueblos / Destinos` : `Desde Zaragoza (Hacia ${nextFromZaragoza ? nextFromZaragoza.destination.split('.')[0] : 'Destino'})`;
  renderDashboardCard(container, nextFromZaragoza, titleVuelta, nowMin, now);
}

function renderDashboardCard(container, run, directionLabel, nowMin, nowDate) {
  if (!run) {
    const card = document.createElement('div');
    card.className = 'bus-card';
    card.innerHTML = `
      <div class="card-header">
        <span class="card-route">SIN SERVICIO</span>
      </div>
      <div class="card-time-container">
        <div class="card-countdown" style="font-size: 1.5rem; color: var(--text-secondary);">No hay más autobuses</div>
        <div class="card-exact-time">Hoy/Mañana</div>
      </div>
      <div class="card-meta">
        <div class="meta-row">
          <span class="meta-label">Dirección</span>
          <span class="meta-value">${directionLabel}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
    return;
  }

  // Calcular diferencia en minutos (tomando en cuenta si es mañana)
  let diffMin = run.departureMin - nowMin;
  let isTomorrow = false;
  
  if (diffMin < 0) {
    // Si la hora de salida es menor, significa que es para mañana
    diffMin = (1440 - nowMin) + run.departureMin;
    isTomorrow = true;
  }

  let countdownText = '';
  if (diffMin === 0) {
    countdownText = '¡Saliendo ya!';
  } else if (diffMin < 60) {
    countdownText = `En ${diffMin} min`;
  } else {
    const h = Math.floor(diffMin / 60);
    const m = diffMin % 60;
    countdownText = m > 0 ? `En ${h}h y ${m}m` : `En ${h}h`;
  }

  const card = document.createElement('div');
  card.className = 'bus-card';
  
  // Format days array to string
  const daysStr = run.runDays.join(', ');

  card.innerHTML = `
    <div class="card-header">
      <span class="card-route">${run.routeId}</span>
      ${run.isDemand ? '<span class="badge demand">A Demanda</span>' : '<span class="badge">Regular</span>'}
    </div>
    <div class="card-time-container">
      <div class="card-countdown">${countdownText}</div>
      <div class="card-exact-time">${run.departureTime} ${isTomorrow ? '<span style="font-size:0.8rem;color:var(--danger-color); font-weight:bold;">(Mañana)</span>' : ''}</div>
    </div>
    <div class="card-meta">
      <div class="meta-row">
        <span class="meta-label">Origen</span>
        <span class="meta-value" style="font-weight: 600;">${currentStop.split('.')[0]}</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Destino Final</span>
        <span class="meta-value" style="font-weight: 600; color: var(--primary-color);">${run.destination.split('.')[0]}</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Días de servicio</span>
        <span class="meta-value">${daysStr}</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Ruta</span>
        <span class="meta-value" style="font-size: 0.8rem; text-align: right; max-width: 70%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${run.routeName}</span>
      </div>
    </div>
    ${run.isDemand ? `
      <div class="demand-notes ${document.body.classList.contains('light-theme') ? 'light' : ''}">
        ⚠️ Requiere reserva previa 24h antes llamando al <strong>976 909 147</strong>.
      </div>
    ` : ''}
  `;
  container.appendChild(card);
}

// ----------------------------------------------------
// PANTALLA 2: BUSES A PARTIR DE LAS hh:mm
// ----------------------------------------------------
function updateTimeSearchScreen() {
  const timeSearchInput = document.getElementById('timeSearchInput');
  const container = document.getElementById('timeSearchResults');
  container.innerHTML = '';

  const searchTime = timeSearchInput.value;
  if (!searchTime) return;

  const todayChars = getTodayChars();
  const nextRuns = getNextBusesFromStop(currentStop, searchTime, todayChars);

  if (nextRuns.length === 0) {
    container.innerHTML = `
      <div class="no-bus-msg">
        No hay más autobuses saliendo de <strong>${currentStop.split('.')[0]}</strong> después de las ${searchTime} el día de hoy.
      </div>`;
    return;
  }

  // Tomar los próximos 5 buses
  const limitList = nextRuns.slice(0, 5);

  limitList.forEach(run => {
    const item = document.createElement('div');
    item.className = 'bus-list-item';
    
    item.innerHTML = `
      <div class="list-item-left">
        <span class="list-item-time">${run.departureTime}</span>
        <span class="list-item-route">${run.routeId} • ${run.isDemand ? 'A demanda' : 'Regular'}</span>
      </div>
      <div class="list-item-right">
        <span class="list-item-dest">→ ${run.destination.split('.')[0]}</span>
        <span class="list-item-days">${run.runDays.join(', ')}</span>
      </div>
    `;
    container.appendChild(item);
  });
}

// ----------------------------------------------------
// PANTALLA 3: BUSCADOR EXPLORADOR COMPLETO
// ----------------------------------------------------
function populateExplorerOptions() {
  const routeSelect = document.getElementById('explorerRouteSelect');
  routeSelect.innerHTML = '<option value="all">Todas las líneas</option>';
  
  SCHEDULE_DATA.forEach(route => {
    const opt = document.createElement('option');
    opt.value = route.id;
    opt.textContent = `${route.id} - ${route.name.split('(')[0]}`;
    routeSelect.appendChild(opt);
  });
}

function updateExplorerScreen() {
  const dayType = document.getElementById('explorerDaySelect').value;
  const timeInput = document.getElementById('explorerTimeInput').value;
  const direction = document.getElementById('explorerDirectionSelect').value;
  const routeFilter = document.getElementById('explorerRouteSelect').value;
  
  const container = document.getElementById('explorerResultsTable');
  container.innerHTML = '';

  // Determinar los caracteres de día que buscamos
  let searchDayChars = [];
  if (dayType === 'LMXJV') searchDayChars = ['L', 'M', 'X', 'J', 'V'];
  else if (dayType === 'S') searchDayChars = ['S'];
  else if (dayType === 'DF') searchDayChars = ['D', 'F'];

  const targetMin = timeInput ? parseTimeToMinutes(timeInput) : 0;

  // Filtrar y recolectar filas de horarios
  let tableRows = [];

  SCHEDULE_DATA.forEach(route => {
    // Filtrar por línea si aplica
    if (routeFilter !== 'all' && route.id !== routeFilter) return;

    // Procesar ida (To)
    if (direction === 'all' || direction === 'to') {
      route.runsTo.forEach(run => {
        // Validar si el viaje coincide con el día de búsqueda
        const isActive = run.days.some(day => searchDayChars.includes(day));
        if (!isActive) return;

        // Buscar cada parada y su hora
        route.stopsTo.forEach((stop, idx) => {
          const stopTimeStr = run.times[idx];
          if (!stopTimeStr) return;

          const stopMin = parseTimeToMinutes(stopTimeStr);
          if (stopMin < targetMin) return;

          tableRows.push({
            timeStr: stopTimeStr,
            timeMin: stopMin,
            stopName: stop,
            routeId: route.id,
            destination: route.stopsTo[route.stopsTo.length - 1],
            directionLabel: 'Hacia ' + route.stopsTo[route.stopsTo.length - 1].split('.')[0],
            isDemand: route.name.includes("Demanda"),
            runDays: run.days
          });
        });
      });
    }

    // Procesar vuelta (From)
    if (direction === 'all' || direction === 'from') {
      route.runsFrom.forEach(run => {
        const isActive = run.days.some(day => searchDayChars.includes(day));
        if (!isActive) return;

        route.stopsFrom.forEach((stop, idx) => {
          const stopTimeStr = run.times[idx];
          if (!stopTimeStr) return;

          const stopMin = parseTimeToMinutes(stopTimeStr);
          if (stopMin < targetMin) return;

          tableRows.push({
            timeStr: stopTimeStr,
            timeMin: stopMin,
            stopName: stop,
            routeId: route.id,
            destination: route.stopsFrom[route.stopsFrom.length - 1],
            directionLabel: 'Hacia ' + route.stopsFrom[route.stopsFrom.length - 1].split('.')[0],
            isDemand: route.name.includes("Demanda"),
            runDays: run.days
          });
        });
      });
    }
  });

  // Ordenar todas las paradas/salidas por hora
  tableRows.sort((a, b) => a.timeMin - b.timeMin || a.stopName.localeCompare(b.stopName));

  if (tableRows.length === 0) {
    container.innerHTML = `<tr><td colspan="5" class="no-bus-msg" style="border:none;">No se encontraron horarios para los criterios seleccionados.</td></tr>`;
    return;
  }

  // Renderizar en tabla
  tableRows.forEach(row => {
    const tr = document.createElement('tr');
    
    // Highlight if it matches the current user selected stop
    const isUserStop = row.stopName === currentStop;
    
    tr.innerHTML = `
      <td class="${isUserStop ? 'highlight' : ''}">${row.timeStr}</td>
      <td class="${isUserStop ? 'highlight' : ''}" style="font-weight:500;">${row.stopName.split('.')[0]}</td>
      <td>→ ${row.destination.split('.')[0]}</td>
      <td style="font-size:0.8rem; color:var(--text-secondary);">${row.routeId} ${row.isDemand ? '<span style="color:var(--danger-color)">• Demanda</span>' : ''}</td>
      <td style="font-size:0.75rem; color:var(--text-muted);">${row.runDays.join(',')}</td>
    `;
    container.appendChild(tr);
  });
}

// ----------------------------------------------------
// REGISTRO DE SERVICE WORKER PARA MODO OFFLINE
// ----------------------------------------------------
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Service Worker registrado con éxito:', reg.scope))
        .catch(err => console.error('Error al registrar el Service Worker:', err));
    });
  }
}

// ----------------------------------------------------
// AUTO-GENERACIÓN DE ICONOS DE PWA EN DESARROLLO LOCAL
// ----------------------------------------------------
function generatePWAIcons() {
  // Cargar el SVG del archivo y dibujarlo en canvas
  const img = new Image();
  img.onload = () => {
    // Crear canvas 192x192
    saveCanvasIcon(img, 192);
    // Crear canvas 512x512
    saveCanvasIcon(img, 512);
  };
  img.src = './icons/icon.svg';
}

function saveCanvasIcon(img, size) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Dibujar imagen
  ctx.drawImage(img, 0, 0, size, size);
  const dataUrl = canvas.toDataURL('image/png');
  
  // Enviar al dev-server para guardar en disco
  fetch('/save-icon', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ size, dataUrl })
  })
  .then(res => res.text())
  .then(txt => console.log('[PWA Assets]', txt))
  .catch(err => console.error('[PWA Assets] Error saving icon:', err));
}
