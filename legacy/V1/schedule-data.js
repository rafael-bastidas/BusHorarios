// Horarios Oficiales T14 - Área del Moncayo y Campo de Borja con Zaragoza
// Actualizado a 17 de Noviembre de 2025

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
      "Ainzón. Parada Bus. A-1303",
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
      "Magallón. Parada Bus.",
      "Alberite de San Juan. Parada bus. A-121",
      "Bureta. Parada bus",
      "Ainzón. Parada Bus. A-1303",
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
      "Magallón. Parada bus",
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
      "Magallón. Parada bus",
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
  },
  {
    id: "T14-04",
    name: "Tabuenca - Zaragoza",
    stopsTo: [
      "Tabuenca. C/ Pedro Gómez Cuartero",
      "Fuendejalón. C/ Mayor 68",
      "Pozuelo de Aragón. Carretera de Fuendejalón",
      "Pedrola. Parada bus. C/ Canal 43",
      "Pedrola. C/ Canal 1",
      "Figueruelas. Parada bus",
      "Figueruelas. Casa Beltrán",
      "Alagón. Plaza Fueros de Aragón",
      "Alagón. Marquesina esq. C/ Mayor con C/ Fernando el Católico",
      "Casetas. Frente a nº74 de Avda Logroño",
      "Utebo. Empalme Utebo",
      "Zaragoza. Estación Intermodal"
    ],
    runsTo: [
      { days: ["L", "X", "J"], times: ["07:15", "07:29", "07:34", "07:58", "07:58", "08:07", "08:11", "08:15", "08:16", "08:29", "08:33", "08:46"] },
      { days: ["S"], times: ["07:15", "07:29", "07:34", "07:58", "07:58", "08:07", "08:11", "08:15", "08:16", "08:29", "08:33", "08:46"] }
    ],
    stopsFrom: [
      "Zaragoza. Estación Intermodal",
      "Utebo. Empalme Utebo",
      "Casetas. Frente a nº74 de Avda Logroño",
      "Alagón. Marquesina esq. C/ Mayor con C/ Fernando el Católico",
      "Alagón. Plaza Fueros de Aragón",
      "Figueruelas. Casa Beltrán",
      "Figueruelas. Parada bus",
      "Pedrola. C/ Canal 1",
      "Pedrola. Parada bus. C/ Canal 43",
      "Pozuelo de Aragón. Carretera de Fuendejalón",
      "Fuendejalón. C/ Mayor 68",
      "Tabuenca. C/ Pedro Gómez Cuartero"
    ],
    runsFrom: [
      { days: ["L", "X", "J"], times: ["15:30", "15:42", "15:46", "15:59", "16:00", "16:04", "16:07", "16:14", "16:15", "16:40", "16:45", "17:01"] },
      { days: ["S"], times: ["18:00", "18:12", "18:16", "18:29", "18:30", "18:34", "18:37", "18:44", "18:45", "19:10", "19:15", "19:31"] }
    ]
  },
  {
    id: "T14-05",
    name: "Novillas - Zaragoza",
    stopsTo: [
      "Novillas. Camino de Mallén",
      "Cortes de Navarra. Acceso",
      "Mallén",
      "Urbanización San Antonio",
      "Gallur. Marquesina",
      "Boquiñeni. Marquesina de la Concordia esquina C/Goya",
      "Luceni. Plaza de España",
      "Alcalá de Ebro. Marquesina.",
      "Cabañas de Ebro. Marquesina C/Joaquín Costa S/N esquina C/Diputación",
      "Alagón. Plaza Fueros de Aragón",
      "Alagón. Marquesina esq. C/Mayor con C/Fernando el Católico",
      "Zaragoza. Hospital Clínico",
      "Zaragoza. Estación Intermodal"
    ],
    runsTo: [
      { days: ["L", "M", "X", "J", "V"], times: ["09:00", "09:04", "09:06", "09:18", "09:21", "09:30", "09:37", "09:43", "09:49", "09:56", "09:56", "10:25", "10:40"] },
      { days: ["L", "M", "X", "J", "V"], times: ["16:00", "16:04", "16:06", "16:18", "16:21", "16:30", "16:37", "16:43", "16:49", "16:56", "16:56", null, "17:25"] },
      { days: ["S"], times: ["09:45", "09:49", "09:51", "10:03", "10:06", "10:15", "10:22", "10:28", "10:34", "10:41", "10:41", null, "11:10"] },
      { days: ["D", "F"], times: ["09:45", "09:49", "09:51", "10:03", "10:06", "10:15", "10:22", "10:28", "10:34", "10:41", "10:41", null, "11:10"] }
    ],
    stopsFrom: [
      "Zaragoza. Estación Intermodal",
      "Alagón. Marquesina esq. C/Mayor con C/Fernando el Católico",
      "Alagón. Plaza Fueros de Aragón",
      "Cabañas de Ebro. Marquesina C/Joaquín Costa S/N esquina C/Diputación",
      "Alcalá de Ebro. Marquesina.",
      "Luceni. Plaza de España",
      "Boquiñeni. Marquesina de la Concordia esquina C/Goya",
      "Gallur. Marquesina",
      "Urbanización San Antonio",
      "Mallén",
      "Cortes de Navarra. Acceso",
      "Novillas. Camino de Mallén"
    ],
    runsFrom: [
      { days: ["L", "M", "X", "J", "V"], times: ["13:00", "13:27", "13:28", "13:35", "13:41", "13:47", "13:50", "13:58", "14:03", "14:13", "14:30", "14:34"] },
      { days: ["L", "M", "X", "J", "V"], times: ["19:30", "19:57", "19:58", "20:05", "20:11", "20:17", "20:20", "20:28", "20:33", "20:43", "20:50", "20:54"] },
      { days: ["S"], times: ["20:00", "20:27", "20:28", "20:35", "20:41", "20:47", "20:50", "20:58", "21:03", "21:13", "21:20", "21:24"] },
      { days: ["D", "F"], times: ["20:00", "20:27", "20:28", "20:35", "20:41", "20:47", "20:50", "20:58", "21:03", "21:13", "21:20", "21:24"] }
    ]
  },
  {
    id: "T14-50",
    name: "Torres de Montecierzo - Tarazona",
    stopsTo: [
      "Torres de Montecierzo",
      "Los Fayos. C/ Huerta del Duque",
      "Torrellas",
      "Tarazona. Teresa Cajal",
      "Tarazona. Avenida de Ciudad de Teruel"
    ],
    runsTo: [
      { days: ["J"], times: ["10:00", "10:26", "10:28", "10:34", "10:35"] }
    ],
    stopsFrom: [
      "Tarazona. Avenida de Ciudad de Teruel",
      "Tarazona. Teresa Cajal",
      "Torrellas",
      "Los Fayos. C/ Huerta del Duque",
      "Torres de Montecierzo"
    ],
    runsFrom: [
      { days: ["J"], times: ["12:45", "12:46", "12:51", "12:53", "13:20"] }
    ]
  },
  {
    id: "T14-51",
    name: "El Buste - Tarazona",
    stopsTo: [
      "El Buste",
      "Cunchillos",
      "Vierlas",
      "Malón",
      "Novallas",
      "Tórtoles",
      "Tarazona. Avenida de Ciudad de Teruel",
      "Tarazona. Teresa Cajal"
    ],
    runsTo: [
      { days: ["J"], times: ["07:40", "07:54", "07:57", "08:03", "08:07", "08:12", "08:14", "08:16"] }
    ],
    stopsFrom: [
      "Tarazona. Teresa Cajal",
      "Tarazona. Avenida de Ciudad de Teruel",
      "Tórtoles",
      "Novallas",
      "Malón",
      "Vierlas",
      "Cunchillos",
      "El Buste"
    ],
    runsFrom: [
      { days: ["J"], times: ["13:50", "13:52", "13:54", "13:59", "14:05", "14:09", "14:12", "14:26"] }
    ]
  },
  {
    id: "T14-52",
    name: "El Buste - Borja",
    stopsTo: [
      "El Buste",
      "Santuario de Misericordia",
      "Borja. Av. Jurançon"
    ],
    runsTo: [
      { days: ["X"], times: ["07:15", "07:29", "07:44"] }
    ],
    stopsFrom: [
      "Borja. Av. Jurançon",
      "Santuario de Misericordia",
      "El Buste"
    ],
    runsFrom: [
      { days: ["X"], times: ["13:00", "13:14", "13:29"] }
    ]
  },
  {
    id: "T14-53",
    name: "Añón de Moncayo - Tarazona",
    stopsTo: [
      "Añón de Moncayo. Plaza de la Cochera",
      "Alcalá de Moncayo",
      "Veruela",
      "Vera de Moncayo",
      "Empalme Vera de Moncayo",
      "Tarazona. Teresa Cajal",
      "Tarazona. Avenida de Ciudad de Teruel"
    ],
    runsTo: [
      { days: ["M", "V"], times: ["06:23", "06:28", "06:34", "06:40", "06:43", "06:57", "06:58"] }
    ],
    stopsFrom: [
      "Tarazona. Avenida de Ciudad de Teruel",
      "Tarazona. Teresa Cajal",
      "Vera de Moncayo",
      "Veruela",
      "Alcalá de Moncayo",
      "Añón de Moncayo. Plaza de la Cochera"
    ],
    runsFrom: [
      { days: ["M", "V"], times: ["13:50", "13:51", "14:05", "14:09", "14:15", "14:25"] }
    ]
  },
  {
    id: "T14-54",
    name: "Talamantes - Borja",
    stopsTo: [
      "Talamantes. Carretera",
      "Ambel. Marquesina",
      "Bulbuente. Parada bus N-122",
      "Maleján. N-122. Parada bus",
      "Borja. Av. Jurançon"
    ],
    runsTo: [
      { days: ["L", "V"], times: ["06:28", "06:44", "06:48", "06:53", "06:55"] }
    ],
    stopsFrom: [
      "Borja. Av. Jurançon",
      "Maleján. N-122. Parada bus",
      "Bulbuente. Parada bus N-122",
      "Ambel. Marquesina",
      "Talamantes. Carretera"
    ],
    runsFrom: [
      { days: ["L", "V"], times: ["17:34", "17:36", "17:41", "17:45", "18:01"] }
    ]
  },
  {
    id: "T14-55",
    name: "Tabuenca - Borja",
    stopsTo: [
      "Tabuenca. C/Pedro Gómez Cuartero",
      "Fuendejalón. C/Mayor 68",
      "Pozuelo de Aragón. Carretera de Fuendejalón",
      "Magallón. Parada bus",
      "Alberite de San Juan. Parada bus. A-121",
      "Bureta. Parada bus",
      "Ainzón. Parada bus. A-1303",
      "Borja. Av. Jurançon"
    ],
    runsTo: [
      { days: ["L", "M", "X", "J", "V"], times: ["07:35", "07:46", "07:50", "08:00", "08:01", "08:04", "08:07", "08:10"] }
    ],
    stopsFrom: [
      "Borja. Av. Jurançon",
      "Ainzón. Parada bus. A-1303",
      "Bureta. Parada bus",
      "Alberite de San Juan. Parada bus. A-121",
      "Magallón. Parada bus",
      "Pozuelo de Aragón. Carretera de Fuendejalón",
      "Fuendejalón. C/Mayor 68",
      "Tabuenca. C/Pedro Gómez Cuartero"
    ],
    runsFrom: [
      { days: ["L", "M", "X", "J", "V"], times: ["14:30", "14:32", "14:35", "14:38", "14:40", "14:50", "14:54", "15:05"] }
    ]
  },
  {
    id: "T14-56",
    name: "Novillas - Borja",
    stopsTo: [
      "Novillas. Camino de Mallén",
      "Cortes de Navarra. Acceso",
      "Mallén",
      "Fréscano",
      "Agón",
      "Bisimbre",
      "Magallón. Parada bus",
      "Alberite de San Juan. Parada bus. A-121",
      "Bureta. Parada bus",
      "Ainzón. Parada bus. A-1303",
      "Borja. Av. Jurançon"
    ],
    runsTo: [
      { days: ["L", "M", "X", "J", "V"], times: ["08:10", "08:15", "08:24", "08:29", "08:32", "08:33", "08:43", "08:45", "08:49", "08:52", "08:55"] },
      { days: ["L", "M", "X", "J", "V"], times: ["13:30", "13:35", "13:44", "13:49", "13:52", "13:53", "14:03", null, null, null, "14:15"] }
    ],
    stopsFrom: [
      "Borja. Av. Jurançon",
      "Ainzón. Parada bus. A-1303",
      "Bureta. Parada bus",
      "Alberite de San Juan. Parada bus. A-121",
      "Magallón. Parada bus",
      "Bisimbre",
      "Agón",
      "Fréscano",
      "Mallén",
      "Cortes de Navarra. Acceso",
      "Novillas. Camino de Mallén"
    ],
    runsFrom: [
      { days: ["L", "M", "X", "J", "V"], times: ["07:10", "07:13", "07:16", "07:20", "07:21", "07:32", "07:33", "07:35", "07:41", "07:47", "07:55"] },
      { days: ["L", "M", "X", "J", "V"], times: ["12:45", "12:48", "12:51", "12:55", "12:56", "13:07", "13:08", "13:10", "13:16", "13:22", "13:30"] }
    ]
  },
  {
    id: "T14-57",
    name: "Boquiñeni - Gallur",
    stopsTo: [
      "Boquiñeni. Marquesina de la Concordia esquina C/Goya",
      "Luceni. Plaza de España",
      "Urbanización San Antonio",
      "Gallur. Marquesina"
    ],
    runsTo: [
      { days: ["X"], times: ["08:15", "08:17", "08:30", "08:33"] }
    ],
    stopsFrom: [
      "Gallur. Marquesina",
      "Urbanización San Antonio",
      "Luceni. Plaza de España",
      "Boquiñeni. Marquesina de la Concordia esquina C/Goya"
    ],
    runsFrom: [
      { days: ["X"], times: ["10:00", "10:02", "10:15", "10:18"] }
    ]
  },
  {
    id: "T14-58",
    name: "Trasmoz - Tarazona",
    stopsTo: [
      "Trasmoz",
      "Litago",
      "Lituénigo. C/Horno",
      "San Martín de la Virgen de Moncayo",
      "Santa Cruz de Moncayo",
      "Tarazona. Teresa Cajal",
      "Tarazona. Avenida de Ciudad de Teruel"
    ],
    runsTo: [
      { days: ["L", "V"], times: ["07:40", "07:45", "07:55", "08:06", "08:15", "08:24", "08:26"] }
    ],
    stopsFrom: [
      "Tarazona. Avenida de Ciudad de Teruel",
      "Tarazona. Teresa Cajal",
      "Santa Cruz de Moncayo",
      "San Martín de la Virgen de Moncayo",
      "Lituénigo. C/Horno",
      "Litago",
      "Trasmoz"
    ],
    runsFrom: [
      { days: ["L", "V"], times: ["14:20", "14:22", "14:28", "14:37", "14:48", "14:57", "15:06"] }
    ]
  },
  {
    id: "T14-59",
    name: "Grisel - Tarazona",
    stopsTo: [
      "Grisel",
      "Tarazona. Teresa Cajal",
      "Tarazona. Avenida de Ciudad de Teruel"
    ],
    runsTo: [
      { days: ["L", "V"], times: ["08:10", "08:17", "08:19"] }
    ],
    stopsFrom: [
      "Tarazona. Avenida de Ciudad de Teruel",
      "Tarazona. Teresa Cajal",
      "Grisel"
    ],
    runsFrom: [
      { days: ["L", "V"], times: ["14:30", "14:32", "14:39"] }
    ]
  },
  {
    id: "T14-60",
    name: "Pueblos del Moncayo (Servicio Demanda)",
    stopsTo: [
      "Vera de Moncayo",
      "Veruela",
      "Alcalá de Moncayo",
      "Añón de Moncayo. Plaza de la Cochera",
      "Trasmoz",
      "Litago",
      "Lituénigo. C/Horno",
      "San Martín de la Virgen de Moncayo",
      "Santa Cruz de Moncayo"
    ],
    runsTo: [
      { days: ["L", "V"], times: ["20:30", "21:05", "21:05", "21:05", "21:05", "21:05", "21:05", "21:05", "21:05"] }
    ],
    stopsFrom: [
      "Santa Cruz de Moncayo",
      "San Martín de la Virgen Moncayo.",
      "Lituénigo. C/Horno.",
      "Litago",
      "Trasmoz",
      "Añón de Moncayo. Plaza de la Cochera.",
      "Alcalá de Moncayo",
      "Veruela",
      "Vera de Moncayo",
      "Empalme Vera de Moncayo"
    ],
    runsFrom: [
      { days: ["D", "F"], times: ["17:05", "17:05", "17:05", "17:05", "17:05", "17:05", "17:05", "17:05", "17:05", "18:05"] }
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
