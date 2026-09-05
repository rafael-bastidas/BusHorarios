# Bus T14 Aragón - Contexto del Proyecto

## 📌 Descripción General
Aplicación Web Progresiva (**PWA**) para la consulta de horarios de autobús de la **Línea T14 (Tarazona - Zaragoza y viceversa)**, dando cobertura al Campo de Borja, comarca de Tarazona y el Moncayo, y paradas intermedias (Ainzón, Bulbuente, Bureta, Alagón, Pedrola, Casetas, etc.).

La aplicación está diseñada con un enfoque **Offline-First**, permitiendo consultar todas las rutas, paradas y próximos servicios sin necesidad de conexión a internet.

---

## 🛠️ Stack Tecnológico
- **Frontend**: Vanilla JavaScript (ES6+), HTML5 semántico, CSS3 moderno (Variables CSS, Flexbox, Grid, diseño responsive mobile-first).
- **PWA & Offline**: Service Worker (`sw.js`), Web App Manifest (`manifest.json`), almacenamiento en caché.
- **Servidor Web en Producción (Sandbox TrueNAS)**: Nginx (`port 8080`) como servidor de archivos estáticos.
- **Servidor de Desarrollo Local**: Node.js (`server.js`, servidor HTTP nativo sin dependencias externas pesadas).
- **Scripts de Soporte**: Python con Pillow (`generate_assets.py`) para generación de iconos.

---

## 📁 Estructura del Repositorio

```
Bus-Horarios/
├── GEMINI.md                  # Archivo de contexto del proyecto para Gemini / Antigravity
├── index.html                 # Estructura SPA (Próximo Bus, Por Hora, Horarios)
├── app.js                     # Lógica de la aplicación, estado, eventos y renderizado DOM
├── schedule-data.js           # Base de datos de horarios (SCHEDULE_DATA) y festivos (HOLIDAYS)
├── style.css                  # Estilos CSS, variables de tema claro/oscuro y diseño responsive
├── manifest.json              # Manifiesto PWA para instalación en móviles y escritorio
├── sw.js                      # Service Worker para funcionamiento offline
├── icons/                     # Iconos PWA (SVG, PNG 192px y 512px)
├── nginx/                     # Plantillas de configuración para Nginx en TrueNAS Sandbox
│   └── bus.rarabala.com.conf  # Virtual Host en puerto 8080 para Cloudflare Tunnel
├── package.json               # Configuración npm y scripts de desarrollo
├── package-lock.json          # Lockfile de dependencias
├── server.js                  # Servidor HTTP local para desarrollo (puerto 8080)
├── generate_assets.py         # Script Python para generar iconos
└── legacy/                    # Versiones anteriores y respaldos históricos
```

---

## 🚀 Comandos de Desarrollo

| Comando | Descripción |
| :--- | :--- |
| `npm start` | Inicia el servidor de desarrollo local en `http://localhost:8080` |
| `python generate_assets.py` | Genera los iconos de la app a partir de especificaciones vectoriales |

---

## 🌐 Despliegue en Sandbox TrueNAS SCALE

Siguiendo el estándar de convención definido en `Nas-Infra`:

1. **Ubicación en el Sandbox**:
   - Ruta física: `/mnt/DataFast/apps/sandbox/projects/static/bus-horarios`
   - Ruta interna en la jaula (LXC Debian): `/projects/static/bus-horarios`
   - Clonar o actualizar mediante Git:
     ```bash
     cd /projects/static
     git clone git@github.com:rafael-bastidas/BusHorarios.git bus-horarios
     # O actualizar si ya existe:
     cd /projects/static/bus-horarios && git pull
     ```

2. **Configuración de Nginx en Sandbox**:
   - Copiar la configuración:
     ```bash
     cp /projects/static/bus-horarios/nginx/bus.rarabala.com.conf /etc/nginx/sites-available/bus.rarabala.com
     ln -s /etc/nginx/sites-available/bus.rarabala.com /etc/nginx/sites-enabled/
     systemctl reload nginx
     ```

3. **Cloudflare Zero Trust Tunnel**:
   - **Public Hostname**: `bus.rarabala.com`
   - **Service**: `http://192.168.1.136:8080`

---

## 🧭 Arquitectura y Funcionamiento Clave

1. **Gestión de Horarios y Festivos (`schedule-data.js`)**:
   - `SCHEDULE_DATA`: Array de rutas con identificación (`T14-01`, etc.), lista de paradas (`stopsTo`, `stopsFrom`) y frecuencias/horas (`runsTo`, `runsFrom`) asociadas a tipos de día:
     - `["L", "M", "X", "J", "V"]`: Lunes a Viernes laborables.
     - `["S"]`: Sábados laborables.
     - `["DF"]`: Domingos y Festivos.
   - `HOLIDAYS_2026_2027`: Calendario de festivos oficiales nacionales y de la Comunidad Autónoma de Aragón. Si la fecha actual coincide con un festivo, se evalúa con el régimen de Domingos y Festivos (`DF`).

2. **Navegación SPA (`app.js`)**:
   - **Próximo Bus (`#next-bus-screen`)**: Dashboard en tiempo real que calcula los próximos autobuses a partir de la hora actual para la parada y sentido seleccionados.
   - **Por Hora (`#by-time-screen`)**: Filtra las salidas a partir de una hora específica seleccionada por el usuario.
   - **Explorador de Horarios (`#explorer-screen`)**: Tabla interactiva completa con filtros por tipo de día, línea, sentido y hora.

3. **Almacenamiento Local y Preferencias**:
   - Persistencia de la parada preferida del usuario en `localStorage` (`selectedStop`).
   - Persistencia del tema claro/oscuro en `localStorage` (`app-theme`).

---

## 📐 Convenciones de Código y Buenas Prácticas
- **100% PWA Estática**: Sin dependencias pesadas ni frameworks cliente ni servidor para maximizar la velocidad y el soporte offline.
- **Consistencia en nombres de paradas**: Toda parada debe coincidir exactamente en ortografía y formato entre `stopsTo`, `stopsFrom` y los selectores para evitar discordancias.
- **Mobile First**: Toda modificación en CSS o UI debe probarse y adaptarse a pantallas móviles y áreas seguras (*viewport-fit=cover* / *safe area insets*).
- **Idioma**: La interfaz de usuario y los mensajes deben estar en español.
