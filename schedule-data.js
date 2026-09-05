// Horarios Oficiales T14 - Tarazona - Zaragoza (directo y vía Ainzón/Pedrola/Alagón/Casetas)
// Actualizado a 17 de Noviembre de 2025
// Paradas unificadas y corregidas para evitar duplicados por puntuación o mayúsculas.

const HOLIDAYS_2026_2027 = [
  // 2026
  "2026-01-01", // Año Nuevo
  "2026-01-06", // Reyes
  "2026-04-02", // Jueves Santo
  "2026-04-03", // Viernes Santo
  "2026-04-23", // Día de Aragón
  "2026-05-01", // Fiesta del Trabajo
  "2026-08-15", // Asunción
  "2026-10-12", // Fiesta Nacional
  "2026-11-01", // Todos los Santos
  "2026-12-06", // Día de la Constitución
  "2026-12-08", // Inmaculada Concepción
  "2026-12-25", // Navidad
  // 2027
  "2027-01-01", // Año Nuevo
  "2027-01-06", // Reyes
  "2027-03-25", // Jueves Santo
  "2027-03-26", // Viernes Santo
  "2027-04-23", // Día de Aragón
  "2027-05-01", // Fiesta del Trabajo
  "2027-08-15", // Asunción
  "2027-10-12", // Fiesta Nacional
  "2027-11-01", // Todos los Santos
  "2027-12-06", // Día de la Constitución
  "2027-12-08", // Inmaculada Concepción
  "2027-12-25"  // Navidad
];

const SCHEDULE_DATA = [
  {
    id: "T14-01",
    name: "Tarazona - Zaragoza (directo)",
    stopsTo: [
      "Tarazona. Avenida de Ciudad de Teruel",
      "Tarazona. Teresa Cajal",
      "Empalme Vera de Moncayo",
      "Bulbuente. Parada bus N-122",
      "Maleján. N-122. Parada bus",
      "Borja. Av. Jurançon",
      "Ainzón. Parada bus. A-1303",
      "Bureta. Parada bus",
      "Alberite de San Juan. Parada bus. A-121",
      "Albeta. Cruce parada bus N-122",
      "Magallón. Parada Bus",
      "Zaragoza. Hospital Clínico",
      "Zaragoza. Estación Intermodal"
    ],
    runsTo: [
      { days: ["L", "M", "X", "J", "V"], times: ["06:35", "06:36", "06:47", "06:51", "06:55", "06:59", "07:02", "07:04", "07:07", null, "07:08", "07:55", "08:10"] },
      { days: ["L", "M", "X", "J", "V"], times: ["09:00", "09:01", null, "09:16", "09:20", "09:24", null, null, null, "09:26", "09:29", null, "10:15"] },
      { days: ["L", "M", "X", "J", "V"], times: ["12:15", "12:16", "12:27", "12:31", "12:35", "12:39", null, null, null, "12:41", "12:44", null, "13:30"] },
      { days: ["L", "M", "X", "J", "V"], times: ["15:20", "15:21", null, "15:36", "15:40", "15:44", null, null, null, "15:46", "15:49", null, "16:35"] },
      { days: ["L", "M", "X", "J", "V"], times: ["18:45", "18:46", null, "19:01", "19:05", "19:09", null, null, null, "19:11", "19:14", null, "20:00"] },
      { days: ["S"], times: ["14:00", "14:01", "14:12", "14:16", "14:20", "14:24", null, null, null, "14:26", "14:29", null, "15:15"] },
      { days: ["S"], times: ["20:50", "20:51", "21:02", "21:06", "21:10", "21:14", null, null, null, "21:16", "21:19", null, "22:05"] },
      { days: ["D", "F"], times: ["11:00", "11:01", "11:12", "11:16", "11:20", "11:24", null, null, null, "11:26", "11:29", null, "12:15"] },
      { days: ["D", "F"], times: ["18:15", "18:16", "18:27", "18:31", "18:35", "18:39", null, null, null, "18:41", "18:44", null, "19:30"] }
    ],
    stopsFrom: [
      "Zaragoza. Estación Intermodal",
      "Magallón. Parada Bus",
      "Albeta. Cruce parada bus N-122",
      "Borja. Av. Jurançon",
      "Maleján. N-122. Parada bus",
      "Bulbuente. Parada bus N-122",
      "Empalme Vera de Moncayo",
      "Tarazona. Teresa Cajal",
      "Tarazona. Avenida de Ciudad de Teruel"
    ],
    runsFrom: [
      { days: ["L", "M", "X", "J", "V"], times: ["07:05", "07:50", "07:53", "07:55", "07:59", "08:03", "08:08", "08:18", "08:20"] },
      { days: ["L", "M", "X", "J", "V"], times: ["11:00", "11:45", "11:48", "11:50", "11:54", "11:58", null, "12:13", "12:15"] },
      { days: ["L", "M", "X", "J", "V"], times: ["14:15", "15:00", "15:03", "15:05", "15:09", "15:13", "15:18", "15:28", "15:30"] },
      { days: ["L", "M", "X", "J", "V"], times: ["16:45", "17:30", "17:33", "17:35", "17:39", "17:43", null, "17:58", "18:00"] },
      { days: ["L", "M", "X", "J", "V"], times: ["20:30", "21:15", "21:18", "21:20", "21:24", "21:28", null, "21:43", "21:45"] },
      { days: ["S"], times: ["15:30", "16:15", "16:18", "16:20", "16:24", "16:28", "16:33", "16:43", "16:45"] },
      { days: ["S"], times: ["22:15", "23:00", "23:03", "23:05", "23:09", "23:13", "23:18", "23:28", "23:30"] },
      { days: ["D", "F"], times: ["12:30", "13:15", "13:18", "13:20", "13:24", "13:28", "13:33", "13:43", "13:45"] },
      { days: ["D", "F"], times: ["19:45", "20:30", "20:33", "20:35", "20:39", "20:43", "20:48", "20:58", "21:00"] }
    ]
  },
  {
    id: "T14-02",
    name: "Tarazona - Zaragoza por Ainzón directo",
    stopsTo: [
      "Tarazona. Avenida de Ciudad de Teruel",
      "Tarazona. Teresa Cajal",
      "Bulbuente. Parada bus N-122",
      "Maleján. N-122. Parada bus",
      "Borja. Av. Jurançon",
      "Ainzón. Parada bus. A-1303",
      "Bureta. Parada bus",
      "Alberite de San Juan. Parada bus. A-121",
      "Magallón. Parada Bus",
      "Zaragoza. Estación Intermodal"
    ],
    runsTo: [
      { days: ["L", "M", "X", "J", "V"], times: ["11:00", "11:01", "11:16", "11:20", "11:24", "11:27", "11:29", "11:32", "11:33", "12:20"] },
      { days: ["L", "M", "X", "J", "V"], times: ["14:00", "14:01", "14:16", "14:20", "14:24", "14:27", "14:29", "14:32", "14:33", "15:20"] },
      { days: ["L", "M", "X", "J", "V"], times: ["20:50", "20:51", "21:06", "21:10", "21:14", "21:17", "21:19", "21:22", "21:23", "22:10"] },
      { days: ["S"], times: ["11:00", "11:01", "11:16", "11:20", "11:24", "11:27", "11:29", "11:32", "11:33", "12:20"] },
      { days: ["D", "F"], times: ["15:00", "15:01", "15:16", "15:20", "15:24", "15:27", "15:29", "15:32", "15:33", "16:20"] },
      { days: ["D", "F"], times: ["21:15", "21:16", "21:31", "21:35", "21:39", "21:42", "21:44", "21:47", "21:48", "22:35"] }
    ],
    stopsFrom: [
      "Zaragoza. Estación Intermodal",
      "Magallón. Parada Bus",
      "Alberite de San Juan. Parada bus. A-121",
      "Bureta. Parada bus",
      "Ainzón. Parada bus. A-1303",
      "Borja. Av. Jurançon",
      "Maleján. N-122. Parada bus",
      "Bulbuente. Parada bus N-122",
      "Tarazona. Teresa Cajal",
      "Tarazona. Avenida de Ciudad de Teruel"
    ],
    runsFrom: [
      { days: ["L", "M", "X", "J", "V"], times: ["12:30", "13:16", "13:17", "13:20", "13:22", "13:25", "13:29", "13:33", "13:48", "13:50"] },
      { days: ["L", "M", "X", "J", "V"], times: ["15:30", "16:16", "16:17", "16:20", "16:22", "16:25", "16:29", "16:33", "16:48", "16:50"] },
      { days: ["L", "M", "X", "J", "V"], times: ["22:15", "23:01", "23:02", "23:05", "23:07", "23:10", "23:14", "23:18", "23:33", "23:35"] },
      { days: ["S"], times: ["12:30", "13:16", "13:17", "13:20", "13:22", "13:25", "13:29", "13:33", "13:48", "13:50"] },
      { days: ["D", "F"], times: ["09:15", "10:01", "10:02", "10:05", "10:07", "10:10", "10:14", "10:18", "10:33", "10:35"] },
      { days: ["D", "F"], times: ["16:30", "17:16", "17:17", "17:20", "17:22", "17:25", "17:29", "17:33", "17:48", "17:50"] }
    ]
  },
  {
    id: "T14-03",
    name: "Tarazona - Zaragoza por Ainzón, Pedrola, Alagón y Casetas",
    stopsTo: [
      "Tarazona. Avenida de Ciudad de Teruel",
      "Tarazona. Teresa Cajal",
      "Vera de Moncayo",
      "Bulbuente. Parada bus N-122",
      "Maleján. N-122. Parada bus",
      "Borja. Av. Jurançon",
      "Ainzón. Parada bus. A-1303",
      "Bureta. Parada bus",
      "Alberite de San Juan. Parada bus. A-121",
      "Magallón. Parada Bus",
      "Pedrola. Parada bus. C/ Canal 43",
      "Pedrola. C/ Canal 1",
      "Figueruelas. Parada bus",
      "Opel",
      "Figueruelas. Casa Beltrán",
      "Alagón. Plaza Fueros de Aragón",
      "Alagón. Marquesina esq. C/Mayor-C/Fernando el Católico",
      "Casetas. Frente a nº74 de Avda Logroño",
      "Utebo. Empalme Utebo",
      "Zaragoza. Estación Intermodal"
    ],
    runsTo: [
      { days: ["L", "M", "X", "J", "V"], times: ["07:25", "07:26", "07:41", "07:51", "07:55", "08:00", "08:04", "08:08", "08:12", "08:14", "08:46", "08:46", "08:56", "09:00", "09:05", "09:09", "09:10", "09:24", "09:28", "09:41"] },
      { days: ["L", "M", "X", "J", "V"], times: ["17:00", "17:01", "17:16", "17:26", "17:30", "17:35", "17:39", "17:43", "17:47", "17:49", "18:21", "18:21", "18:31", "18:35", "18:40", "18:44", "18:45", "18:59", "19:03", "19:16"] },
      { days: ["S"], times: ["07:10", "07:11", "07:26", "07:36", "07:40", "07:45", "07:49", "07:53", "07:57", "07:59", "08:31", "08:31", "08:41", "08:45", "08:50", "08:54", "08:55", "09:09", "09:13", "09:26"] },
      { days: ["S"], times: ["15:30", "15:31", "15:46", "15:56", "16:00", "16:00", "16:17", "16:19", "16:51", "16:51", "17:01", "17:05", "17:10", "17:14", "17:15", "17:29", "17:33", "17:46"] }
    ],
    stopsFrom: [
      "Zaragoza. Estación Intermodal",
      "Utebo. Empalme Utebo",
      "Casetas. Frente a nº74 de Avda Logroño",
      "Alagón. Marquesina esq. C/Mayor-C/Fernando el Católico",
      "Alagón. Plaza Fueros de Aragón",
      "Figueruelas. Casa Beltrán",
      "Opel",
      "Figueruelas. Parada bus",
      "Pedrola. C/ Canal 1",
      "Pedrola. Parada bus. C/ Canal 43",
      "Magallón. Parada Bus",
      "Alberite de San Juan. Parada bus. A-121",
      "Bureta. Parada bus",
      "Ainzón. Parada bus. A-1303",
      "Borja. Av. Jurançon",
      "Maleján. N-122. Parada bus",
      "Bulbuente. Parada bus N-122",
      "Vera de Moncayo",
      "Tarazona. Teresa Cajal",
      "Tarazona. Avenida de Ciudad de Teruel"
    ],
    runsFrom: [
      { days: ["L", "M", "X", "J", "V"], times: ["09:45", "09:57", "10:02", "10:14", "10:15", "10:20", "10:22", "10:28", "10:36", "10:36", "11:09", "11:11", "11:15", "11:19", "11:23", "11:28", "11:33", "11:44", "11:58", "12:01"] },
      { days: ["L", "M", "X", "J", "V"], times: ["18:30", "18:42", "18:47", "18:59", "19:00", "19:05", "19:07", "19:13", "19:21", "19:21", "19:54", "19:56", "20:00", "20:04", "20:08", "20:13", "20:18", "20:29", "20:43", "20:46"] },
      { days: ["S"], times: ["09:35", "09:47", "09:52", "10:04", "10:05", "10:10", "10:12", "10:18", "10:26", "10:26", "10:59", "11:01", "11:05", "11:09", "11:13", "11:18", "11:23", "11:34", "11:48", "11:51"] },
      { days: ["S"], times: ["17:45", "17:57", "18:02", "18:14", "18:15", "18:20", "18:22", "18:28", "18:36", "18:36", "19:09", "19:11", "19:15", "19:19", "19:23", "19:28", "19:33", "19:44", "19:58", "20:01"] }
    ]
  }
];

// Export to window or modules depending on environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SCHEDULE_DATA, HOLIDAYS_2026_2027 };
} else {
  window.SCHEDULE_DATA = SCHEDULE_DATA;
  window.HOLIDAYS_2026_2027 = HOLIDAYS_2026_2027;
}
