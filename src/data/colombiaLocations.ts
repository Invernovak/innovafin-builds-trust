// Colombia Departments and Cities data
export interface Department {
  name: string;
  cities: string[];
}

export const colombiaDepartments: Department[] = [
  {
    name: "Amazonas",
    cities: ["Leticia", "Puerto Nariño", "El Encanto", "La Chorrera", "La Pedrera", "Mirití-Paraná", "Puerto Alegría", "Puerto Arica", "Puerto Santander", "Tarapacá"]
  },
  {
    name: "Antioquia",
    cities: ["Medellín", "Bello", "Itagüí", "Envigado", "Apartadó", "Turbo", "Rionegro", "Caucasia", "Copacabana", "La Ceja", "Sabaneta", "Caldas", "Girardota", "Marinilla", "El Carmen de Viboral", "Santa Rosa de Osos", "Yarumal", "Puerto Berrío", "Chigorodó", "Carepa"]
  },
  {
    name: "Arauca",
    cities: ["Arauca", "Arauquita", "Cravo Norte", "Fortul", "Puerto Rondón", "Saravena", "Tame"]
  },
  {
    name: "Atlántico",
    cities: ["Barranquilla", "Soledad", "Malambo", "Sabanalarga", "Galapa", "Baranoa", "Puerto Colombia", "Campo de la Cruz", "Candelaria", "Juan de Acosta", "Luruaco", "Manatí", "Palmar de Varela", "Piojó", "Polonuevo", "Ponedera", "Repelón", "Santa Lucía", "Santo Tomás", "Suan", "Tubará", "Usiacurí"]
  },
  {
    name: "Bogotá D.C.",
    cities: ["Bogotá"]
  },
  {
    name: "Bolívar",
    cities: ["Cartagena", "Magangué", "Turbaco", "Arjona", "El Carmen de Bolívar", "San Juan Nepomuceno", "Santa Rosa del Sur", "Simití", "Mompós", "María la Baja", "Villanueva", "San Pablo", "Achí", "Altos del Rosario", "Arenal", "Arroyohondo", "Barranco de Loba", "Calamar", "Cantagallo", "Cicuco", "Clemencia", "Córdoba", "El Guamo", "El Peñón", "Hatillo de Loba", "Margarita", "Montecristo", "Morales", "Norosí", "Pinillos", "Regidor", "Río Viejo", "San Cristóbal", "San Estanislao", "San Fernando", "San Jacinto", "San Jacinto del Cauca", "San Martín de Loba", "Santa Catalina", "Santa Rosa", "Soplaviento", "Talaigua Nuevo", "Tiquisio", "Turbana", "Zambrano"]
  },
  {
    name: "Boyacá",
    cities: ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Paipa", "Puerto Boyacá", "Moniquirá", "Villa de Leyva", "Garagoa", "Samacá", "Nobsa", "Tibasosa", "Toca", "Soatá", "Guateque", "Miraflores", "Muzo", "Ramiriquí", "Tenza", "Ventaquemada"]
  },
  {
    name: "Caldas",
    cities: ["Manizales", "La Dorada", "Chinchiná", "Villamaría", "Riosucio", "Anserma", "Supía", "Aguadas", "Neira", "Pácora", "Salamina", "Pensilvania", "Manzanares", "Aranzazu", "Belalcázar", "Filadelfia", "La Merced", "Marulanda", "Marquetalia", "Norcasia", "Palestina", "Risaralda", "Samaná", "San José", "Victoria", "Viterbo"]
  },
  {
    name: "Caquetá",
    cities: ["Florencia", "San Vicente del Caguán", "Puerto Rico", "El Doncello", "Belén de los Andaquíes", "Cartagena del Chairá", "El Paujil", "La Montañita", "Albania", "Curillo", "Milan", "Morelia", "San José del Fragua", "Solano", "Solita", "Valparaíso"]
  },
  {
    name: "Casanare",
    cities: ["Yopal", "Aguazul", "Villanueva", "Tauramena", "Paz de Ariporo", "Monterrey", "Maní", "Trinidad", "Orocué", "Hato Corozal", "Nunchía", "Pore", "Recetor", "Sabanalarga", "Sácama", "San Luis de Palenque", "Támara", "La Salina", "Chameza"]
  },
  {
    name: "Cauca",
    cities: ["Popayán", "Santander de Quilichao", "Puerto Tejada", "El Tambo", "Patía", "Piendamó", "Corinto", "Miranda", "Guapi", "Bolívar", "Argelia", "Balboa", "Buenos Aires", "Cajibío", "Caldono", "Caloto", "Florencia", "Guachené", "Inzá", "Jambaló", "La Sierra", "La Vega", "López de Micay", "Mercaderes", "Morales", "Padilla", "Páez", "Piamonte", "Puracé", "Rosas", "San Sebastián", "Santa Rosa", "Silvia", "Sotará", "Suárez", "Sucre", "Timbío", "Timbiquí", "Toribío", "Totoró", "Villa Rica"]
  },
  {
    name: "Cesar",
    cities: ["Valledupar", "Aguachica", "Agustín Codazzi", "Bosconia", "Curumaní", "La Jagua de Ibirico", "Chimichagua", "Chiriguaná", "El Copey", "El Paso", "Gamarra", "González", "La Gloria", "La Paz", "Manaure Balcón del Cesar", "Pailitas", "Pelaya", "Pueblo Bello", "Río de Oro", "La Jagua de Ibirico", "San Alberto", "San Diego", "San Martín", "Tamalameque"]
  },
  {
    name: "Chocó",
    cities: ["Quibdó", "Istmina", "Tadó", "Condoto", "Riosucio", "Alto Baudó", "Atrato", "Bagadó", "Bahía Solano", "Bajo Baudó", "Bojayá", "El Cantón del San Pablo", "Carmen del Darién", "Cértegui", "El Carmen de Atrato", "El Litoral del San Juan", "Juradó", "Lloró", "Medio Atrato", "Medio Baudó", "Medio San Juan", "Nóvita", "Nuquí", "Río Iró", "Río Quito", "San José del Palmar", "Sipí", "Unguía", "Unión Panamericana"]
  },
  {
    name: "Córdoba",
    cities: ["Montería", "Cereté", "Lorica", "Sahagún", "Montelíbano", "Planeta Rica", "Tierralta", "Ciénaga de Oro", "San Andrés de Sotavento", "Chinú", "San Pelayo", "Valencia", "Ayapel", "Buenavista", "Canalete", "Chimá", "Cotorra", "La Apartada", "Los Córdobas", "Momil", "Moñitos", "Pueblo Nuevo", "Puerto Escondido", "Puerto Libertador", "Purísima de la Concepción", "San Antero", "San Bernardo del Viento", "San Carlos", "Santa Cruz de Lorica", "Tuchín"]
  },
  {
    name: "Cundinamarca",
    cities: ["Soacha", "Fusagasugá", "Facatativá", "Zipaquirá", "Chía", "Mosquera", "Madrid", "Girardot", "Funza", "Cajicá", "Sibaté", "Tocancipá", "Ubaté", "La Calera", "Tabio", "Tenjo", "Cota", "Sopó", "El Rosal", "Anapoima", "Apulo", "Arbeláez", "Beltrán", "Bituima", "Bojacá", "Cabrera", "Cachipay", "Caparrapí", "Cáqueza", "Carmen de Carupa", "Chaguaní", "Chipaque", "Choachí", "Chocontá", "Cogua", "El Colegio", "El Peñón", "Fómeque", "Fosca", "Gachalá", "Gachancipá", "Gachetá", "Gama", "Granada", "Guachetá", "Guaduas", "Guasca", "Guataquí", "Guatavita", "Guayabal de Síquima", "Guayabetal", "Gutiérrez", "Jerusalén", "Junín", "La Mesa", "La Palma", "La Peña", "La Vega", "Lenguazaque", "Machetá", "Manta", "Medina", "Nariño", "Nemocón", "Nilo", "Nimaima", "Nocaima", "Venecia", "Pacho", "Paime", "Pandi", "Paratebueno", "Pasca", "Puerto Salgar", "Pulí", "Quebradanegra", "Quetame", "Quipile", "Ricaurte", "San Antonio del Tequendama", "San Bernardo", "San Cayetano", "San Francisco", "San Juan de Rioseco", "Sasaima", "Sesquilé", "Silvania", "Simijaca", "Subachoque", "Suesca", "Supatá", "Susa", "Sutatausa", "Tausa", "Tena", "Tibacuy", "Tibirita", "Tocaima", "Topaipí", "Útica", "Vergara", "Vianí", "Villagómez", "Villapinzón", "Villeta", "Viotá", "Yacopí", "Zipacón"]
  },
  {
    name: "Guainía",
    cities: ["Inírida", "Barranco Minas", "Cacahual", "La Guadalupe", "Mapiripana", "Morichal", "Pana Pana", "Puerto Colombia", "San Felipe"]
  },
  {
    name: "Guaviare",
    cities: ["San José del Guaviare", "Calamar", "El Retorno", "Miraflores"]
  },
  {
    name: "Huila",
    cities: ["Neiva", "Pitalito", "Garzón", "La Plata", "Campoalegre", "Palermo", "San Agustín", "Rivera", "Algeciras", "Gigante", "Acevedo", "Aipe", "Agrado", "Altamira", "Baraya", "Colombia", "Elías", "El Pital", "Guadalupe", "Hobo", "Íquira", "Isnos", "La Argentina", "Nátaga", "Oporapa", "Paicol", "Palestina", "Saladoblanco", "Santa María", "Suaza", "Tarqui", "Tello", "Teruel", "Tesalia", "Timaná", "Villavieja", "Yaguará"]
  },
  {
    name: "La Guajira",
    cities: ["Riohacha", "Maicao", "Uribia", "Manaure", "San Juan del Cesar", "Fonseca", "Barrancas", "Villanueva", "Albania", "Dibulla", "Distracción", "El Molino", "Hatonuevo", "La Jagua del Pilar", "Urumita"]
  },
  {
    name: "Magdalena",
    cities: ["Santa Marta", "Ciénaga", "Fundación", "El Banco", "Plato", "Aracataca", "Zona Bananera", "Pivijay", "El Retén", "Algarrobo", "Ariguaní", "Cerro de San Antonio", "Chivolo", "Concordia", "El Piñón", "Guamal", "Nueva Granada", "Pedraza", "Pijiño del Carmen", "Puebloviejo", "Remolino", "Sabanas de San Ángel", "Salamina", "San Sebastián de Buenavista", "San Zenón", "Santa Ana", "Santa Bárbara de Pinto", "Sitionuevo", "Tenerife", "Zapayán"]
  },
  {
    name: "Meta",
    cities: ["Villavicencio", "Acacías", "Granada", "Puerto López", "San Martín", "Cumaral", "Restrepo", "Puerto Gaitán", "Guamal", "Castilla La Nueva", "Barranca de Upía", "Cabuyaro", "Cubarral", "El Calvario", "El Castillo", "El Dorado", "Fuente de Oro", "La Macarena", "La Uribe", "Lejanías", "Mapiripán", "Mesetas", "Puerto Concordia", "Puerto Lleras", "Puerto Rico", "San Carlos de Guaroa", "San Juan de Arama", "San Juanito", "Vista Hermosa"]
  },
  {
    name: "Nariño",
    cities: ["Pasto", "Tumaco", "Ipiales", "Túquerres", "La Unión", "Samaniego", "Barbacoas", "El Charco", "Sandoná", "Aldana", "Ancuyá", "Arboleda", "Barbacoas", "Belén", "Buesaco", "Chachagüí", "Colón", "Consacá", "Contadero", "Córdoba", "Cuaspud", "Cumbal", "Cumbitara", "El Peñol", "El Rosario", "El Tablón de Gómez", "El Tambo", "Francisco Pizarro", "Funes", "Guachucal", "Guaitarilla", "Gualmatán", "Iles", "Imués", "La Cruz", "La Florida", "La Llanada", "La Tola", "Leiva", "Linares", "Los Andes", "Magüí", "Mallama", "Mosquera", "Nariño", "Olaya Herrera", "Ospina", "Policarpa", "Potosí", "Providencia", "Puerres", "Pupiales", "Ricaurte", "Roberto Payán", "Samaniego", "San Bernardo", "San Lorenzo", "San Pablo", "San Pedro de Cartago", "Santa Bárbara", "Santacruz", "Sapuyes", "Taminango", "Tangua", "Yacuanquer"]
  },
  {
    name: "Norte de Santander",
    cities: ["Cúcuta", "Ocaña", "Pamplona", "Villa del Rosario", "Los Patios", "Tibú", "El Zulia", "Chinácota", "Ábrego", "Arboledas", "Bochalema", "Bucarasica", "Cachirá", "Cácota", "Chitagá", "Convención", "Cucutilla", "Durania", "El Carmen", "El Tarra", "Gramalote", "Hacarí", "Herrán", "La Esperanza", "La Playa", "Labateca", "Lourdes", "Mutiscua", "Puerto Santander", "Ragonvalia", "Salazar", "San Calixto", "San Cayetano", "Santiago", "Sardinata", "Silos", "Teorama", "Toledo", "Villa Caro"]
  },
  {
    name: "Putumayo",
    cities: ["Mocoa", "Puerto Asís", "Orito", "Valle del Guamuez", "Villagarzón", "Puerto Caicedo", "Puerto Guzmán", "Puerto Leguízamo", "Colón", "San Francisco", "San Miguel", "Santiago", "Sibundoy"]
  },
  {
    name: "Quindío",
    cities: ["Armenia", "Calarcá", "Montenegro", "La Tebaida", "Circasia", "Quimbaya", "Filandia", "Salento", "Buenavista", "Córdoba", "Génova", "Pijao"]
  },
  {
    name: "Risaralda",
    cities: ["Pereira", "Dosquebradas", "Santa Rosa de Cabal", "La Virginia", "Belén de Umbría", "Quinchía", "Marsella", "Apía", "Santuario", "Balboa", "Guática", "La Celia", "Mistrató", "Pueblo Rico"]
  },
  {
    name: "San Andrés y Providencia",
    cities: ["San Andrés", "Providencia"]
  },
  {
    name: "Santander",
    cities: ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barrancabermeja", "San Gil", "Socorro", "Vélez", "Barbosa", "Lebrija", "Cimitarra", "Puerto Wilches", "Málaga", "Rionegro", "Aguada", "Albania", "Aratoca", "Barichara", "Betulia", "Bolívar", "Cabrera", "California", "Capitanejo", "Carcasí", "Cepitá", "Cerrito", "Charalá", "Charta", "Chima", "Chipatá", "Concepción", "Confines", "Contratación", "Coromoro", "Curití", "El Carmen de Chucurí", "El Guacamayo", "El Peñón", "El Playón", "Encino", "Enciso", "Florián", "Galán", "Gambita", "Guaca", "Guadalupe", "Guapotá", "Guavatá", "Güepsa", "Hato", "Jesús María", "Jordán", "La Belleza", "La Paz", "Landázuri", "Los Santos", "Macaravita", "Matanza", "Mogotes", "Molagavita", "Ocamonte", "Oiba", "Onzaga", "Palmar", "Palmas del Socorro", "Páramo", "Pinchote", "Puente Nacional", "Puerto Parra", "San Andrés", "San Benito", "San Joaquín", "San José de Miranda", "San Miguel", "San Vicente de Chucurí", "Santa Bárbara", "Santa Helena del Opón", "Simacota", "Suaita", "Sucre", "Suratá", "Tona", "Valle de San José", "Vetas", "Villanueva", "Zapatoca"]
  },
  {
    name: "Sucre",
    cities: ["Sincelejo", "Corozal", "San Marcos", "Sampués", "Tolú", "San Onofre", "Since", "Coveñas", "Buenavista", "Caimito", "Chalán", "Coloso", "El Roble", "Galeras", "Guaranda", "La Unión", "Los Palmitos", "Majagual", "Morroa", "Ovejas", "Palmito", "San Antonio de Palmito", "San Benito Abad", "San Juan de Betulia", "San Luis de Sincé", "San Pedro", "Santiago de Tolú", "Sucre", "Tolú Viejo"]
  },
  {
    name: "Tolima",
    cities: ["Ibagué", "Espinal", "Melgar", "Chaparral", "Mariquita", "Líbano", "Honda", "Guamo", "Purificación", "Flandes", "Fresno", "Lérida", "Alpujarra", "Alvarado", "Ambalema", "Anzoátegui", "Armero", "Ataco", "Cajamarca", "Carmen de Apicalá", "Casabianca", "Coello", "Coyaima", "Cunday", "Dolores", "Falan", "Herveo", "Icononzo", "Murillo", "Natagaima", "Ortega", "Palocabildo", "Piedras", "Planadas", "Prado", "Rioblanco", "Roncesvalles", "Rovira", "Saldaña", "San Antonio", "San Luis", "Santa Isabel", "Suárez", "Valle de San Juan", "Venadillo", "Villahermosa", "Villarrica"]
  },
  {
    name: "Valle del Cauca",
    cities: ["Cali", "Buenaventura", "Palmira", "Tuluá", "Cartago", "Buga", "Yumbo", "Jamundí", "Florida", "Candelaria", "Sevilla", "Pradera", "Zarzal", "Dagua", "El Cerrito", "Alcalá", "Andalucía", "Ansermanuevo", "Argelia", "Bolívar", "Bugalagrande", "Caicedonia", "Calima", "El Águila", "El Cairo", "El Dovio", "Ginebra", "Guacarí", "La Cumbre", "La Unión", "La Victoria", "Obando", "Restrepo", "Riofrío", "Roldanillo", "San Pedro", "Toro", "Trujillo", "Ulloa", "Versalles", "Vijes", "Yotoco"]
  },
  {
    name: "Vaupés",
    cities: ["Mitú", "Carurú", "Pacoa", "Taraira", "Papunaua", "Yavaraté"]
  },
  {
    name: "Vichada",
    cities: ["Puerto Carreño", "Cumaribo", "La Primavera", "Santa Rosalía"]
  }
];

export const contactTimeSlots = [
  '08:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM'
];
