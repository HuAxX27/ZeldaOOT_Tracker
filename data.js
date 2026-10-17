// Base de datos de coleccionables de Zelda: Ocarina of Time (N64 / 3DS), en español.
// edad: "n" = niño, "a" = adulto, "na" = cualquiera.

export const ZONAS = {
  kokiri: "Bosque Kokiri", perdido: "Bosque Perdido", pradera: "Pradera Sagrada",
  campo: "Campo de Hyrule", lonlon: "Rancho Lon Lon", ciudadela: "Ciudadela de Hyrule",
  castillo: "Castillo de Hyrule / de Ganon", templotiempo: "Templo del Tiempo",
  kakariko: "Aldea Kakariko", cementerio: "Cementerio de Kakariko",
  sendero: "Montaña de la Muerte", crater: "Cráter de la Montaña", goron: "Ciudad Goron",
  rio: "Río Zora", dominio: "Dominio Zora", fuente: "Fuente Zora", lago: "Lago Hylia",
  valle: "Valle Gerudo", fortaleza: "Fortaleza Gerudo", desierto: "Desierto Encantado",
  coloso: "Coloso del Desierto",
  deku: "Gran Árbol Deku", dodongo: "Caverna de los Dodongos", jabu: "Tripa de Jabu-Jabu",
  tbosque: "Templo del Bosque", tfuego: "Templo del Fuego", tagua: "Templo del Agua",
  tsombra: "Templo de las Sombras", tespiritu: "Templo del Espíritu", pozo: "Fondo del Pozo",
  hielo: "Caverna de Hielo", gerudotr: "Campo de Entrenamiento Gerudo", ganon: "Castillo de Ganon (interior)",
  varias: "Varias zonas",
};

export const MAZMORRAS = new Set(["deku", "dodongo", "jabu", "tbosque", "tfuego", "tagua", "tsombra", "tespiritu", "pozo", "hielo"]);

export const CATEGORIAS = [
  { id: "objetos", nombre: "Objetos", corto: "Objetos" },
  { id: "botellas", nombre: "Botellas", corto: "Botellas" },
  { id: "equipo", nombre: "Equipo", corto: "Equipo" },
  { id: "mejoras", nombre: "Mejoras", corto: "Mejoras" },
  { id: "canciones", nombre: "Canciones", corto: "Canciones" },
  { id: "mision", nombre: "Piedras y medallones", corto: "Misión" },
  { id: "corazones", nombre: "Corazones", corto: "Corazones" },
  { id: "skulltulas", nombre: "Skulltulas doradas", corto: "Skulltulas" },
  { id: "extras", nombre: "Intercambios y extras", corto: "Extras" },
];

const I = (cat, id, n, en, z, e, req, g, extra = {}) => ({ cat, id, n, en, z, e, req, g, ...extra });

// ───────────────────────── OBJETOS ─────────────────────────
const objetos = [
  I("objetos", "palos", "Palos Deku", "Deku Stick", "kokiri", "n", "", "Rompe Babas Deku en el Bosque Kokiri o cómpralos en la Tienda Kokiri. Sirven para encender antorchas y golpear."),
  I("objetos", "nueces", "Nueces Deku", "Deku Nut", "kokiri", "n", "", "Cómpralas en la Tienda Kokiri o consíguelas de Babas Deku y hierba. Aturden a los enemigos."),
  I("objetos", "tirachinas", "Tirachinas de las hadas", "Fairy Slingshot", "deku", "n", "", "Dentro del Gran Árbol Deku: cofre en la plataforma del primer piso, tras derrotar al Deku que lo custodia. Solo lo usa Link niño."),
  I("objetos", "ocarina-hadas", "Ocarina de las hadas", "Fairy Ocarina", "kokiri", "n", "Vencer a Gohma", "Al salir del Bosque Kokiri por el puente colgante, Saria te espera y te la regala."),
  I("objetos", "ocarina-tiempo", "Ocarina del Tiempo", "Ocarina of Time", "ciudadela", "n", "3 piedras espirituales", "Con las tres piedras, ve a la entrada de la Ciudadela. Zelda huye a caballo y lanza la ocarina al foso: bucea para recogerla y aprende la Canción del Tiempo."),
  I("objetos", "bombas", "Bombas (Bolsa de bombas)", "Bomb Bag", "dodongo", "n", "", "Cofre dentro de la Caverna de los Dodongos, en la sala de los puentes del piso superior."),
  I("objetos", "arco", "Arco de las hadas", "Fairy Bow", "tbosque", "a", "", "Templo del Bosque: cofre que aparece tras derrotar a los dos Stalfos en la sala del oeste. Incluye el carcaj (30 flechas)."),
  I("objetos", "flechas-fuego", "Flechas de fuego", "Fire Arrows", "lago", "a", "Templo del Agua completado · Arco", "Con el lago lleno de nuevo, párate en la isla con la plataforma frente al Laboratorio y dispara una flecha al sol justo al amanecer. Caen en la isla."),
  I("objetos", "flechas-hielo", "Flechas de hielo", "Ice Arrows", "gerudotr", "a", "Tarjeta de socio Gerudo · 10 rupias", "Premio final del Campo de Entrenamiento Gerudo. Debes superar las salas de pruebas hasta el cofre central."),
  I("objetos", "flechas-luz", "Flechas de luz", "Light Arrows", "templotiempo", "a", "Medallones de Sombra y Espíritu", "Tras despertar a los seis sabios, Zelda se revela en el Templo del Tiempo y te las entrega."),
  I("objetos", "din", "Fuego de Din", "Din's Fire", "castillo", "n", "Bombas · Nana de Zelda", "Al final del camino hacia el Castillo de Hyrule hay una roca: vuélala con una bomba, entra a la fuente y toca la Nana de Zelda sobre la Trifuerza."),
  I("objetos", "farore", "Viento de Farore", "Farore's Wind", "fuente", "na", "Bombas · Nana de Zelda", "En la Fuente Zora, sube a la esquina sureste, vuela la roca con una bomba y toca la Nana de Zelda frente a la Gran Hada."),
  I("objetos", "nayru", "Amor de Nayru", "Nayru's Love", "coloso", "na", "Bombas · Nana de Zelda", "En el Coloso del Desierto, vuela la grieta en la pared entre dos palmeras al norte del oasis y toca la Nana de Zelda."),
  I("objetos", "bombchus", "Bombchus", "Bombchu", "ciudadela", "na", "", "Cómpralos en la Tienda de Bombchus del callejón de la Ciudadela, o encuéntralos en cofres (por ejemplo, en el Fondo del Pozo)."),
  I("objetos", "gancho", "Gancho", "Hookshot", "cementerio", "a", "", "De adulto, empuja la lápida de Dampé en el Cementerio, baja y sigue al fantasma de Dampé en la carrera. Al final hay un cofre con el Gancho."),
  I("objetos", "zarpa", "Zarpa", "Longshot", "tagua", "a", "", "Templo del Agua: cofre que aparece tras derrotar a Link Oscuro. Mejora el Gancho al doble de alcance."),
  I("objetos", "bumeran", "Bumerán", "Boomerang", "jabu", "n", "", "Dentro de Jabu-Jabu: cofre en la sala donde derrotas a los Stingers, en la parte baja del recorrido con Ruto."),
  I("objetos", "lente", "Lente de la Verdad", "Lens of Truth", "pozo", "n", "", "En el Fondo del Pozo de Kakariko, cofre tras derrotar a la Mano Muerta (Dead Hand)."),
  I("objetos", "judias", "Judías mágicas", "Magic Beans", "rio", "n", "Rupias", "Vendedor de judías en la entrada del Río Zora. La primera cuesta 10 rupias y el precio sube con cada una (10 en total). Plántalas de niño en tierra blanda."),
  I("objetos", "martillo", "Martillo Megatón", "Megaton Hammer", "tfuego", "a", "", "Templo del Fuego: cofre en la parte más alta del templo tras derrotar al Bailarín de Fuego (Flare Dancer) por segunda vez."),
];

// ───────────────────────── BOTELLAS ─────────────────────────
const botellas = [
  I("botellas", "botella-1", "Botella 1 · Leche de Lon Lon", "Bottle (Lon Lon Milk)", "lonlon", "n", "Despertar a Talon", "En el Rancho Lon Lon, habla con Talon y gana el juego de encontrar a los Supercucos (3 cucos especiales entre los demás)."),
  I("botellas", "botella-2", "Botella 2 · Mujer de los cucos", "Bottle (Cucco Lady)", "kakariko", "n", "", "Devuelve los 7 cucos perdidos al corral de la mujer de Kakariko (uno está arriba de la casa de construcción, otro tras la valla del corral, otro en el bosque de la entrada, etc.)."),
  I("botellas", "botella-3", "Botella 3 · Carta de Ruto", "Bottle (Ruto's Letter)", "lago", "n", "Escama de plata", "La carta está en una botella en el fondo del Lago Hylia. Entrégasela al Rey Zora y te quedas con la botella vacía."),
  I("botellas", "botella-4", "Botella 4 · Vendedor de Poes", "Bottle (Poe Collector)", "ciudadela", "a", "Epona · Arco · Botellas", "Captura los 10 Grandes Poes que aparecen al cabalgar por el Campo de Hyrule (dispárales flechas a caballo) y véndelos en la Tienda Fantasma de la Ciudadela en ruinas."),
];

// ───────────────────────── EQUIPO ─────────────────────────
const equipo = [
  I("equipo", "espada-kokiri", "Espada Kokiri", "Kokiri Sword", "kokiri", "n", "", "Entra por el hueco en la valla al sur del Bosque Kokiri (Campo de entrenamiento), esquiva la roca rodante y abre el cofre al fondo."),
  I("equipo", "espada-maestra", "Espada Maestra", "Master Sword", "templotiempo", "n", "3 piedras · Ocarina del Tiempo", "En el Templo del Tiempo coloca las piedras, toca la Canción del Tiempo y saca la espada del pedestal. Viajarás 7 años al futuro."),
  I("equipo", "cuchillo-gigante", "Cuchillo gigante", "Giant's Knife", "goron", "a", "200 rupias", "En la Ciudad Goron, piso 2: rompe con bombas las paredes agrietadas y cómprale el cuchillo a Medigoron. Se rompe tras usarlo un rato, pero cuenta como conseguido al comprarlo."),
  I("equipo", "espada-biggoron", "Espada de Biggoron", "Biggoron's Sword", "sendero", "a", "Secuencia de intercambio adulta", "Completa la secuencia de intercambio de adulto y entrega el Resguardo a Biggoron en la cima de la Montaña de la Muerte. Es irrompible."),
  I("equipo", "escudo-deku", "Escudo Deku", "Deku Shield", "kokiri", "n", "40 rupias", "Cómpralo en la Tienda Kokiri. También aparece en algunos cofres del Gran Árbol Deku."),
  I("equipo", "escudo-hyliano", "Escudo hyliano", "Hylian Shield", "cementerio", "na", "", "De niño, de noche, tira de la tumba con flores del Cementerio de Kakariko. También se vende en el Bazar de la Ciudadela (80 rupias)."),
  I("equipo", "escudo-espejo", "Escudo espejo", "Mirror Shield", "tespiritu", "a", "", "Templo del Espíritu (adulto): cofre en la mano de la estatua tras derrotar al Nudillo de Hierro (Iron Knuckle)."),
  I("equipo", "tunica-goron", "Túnica Goron", "Goron Tunic", "goron", "a", "Bombas o arco", "De adulto, detén al Goron rodante (Link Goron) en el nivel intermedio de la Ciudad Goron con una bomba o flecha y habla con él. Te protege del calor."),
  I("equipo", "tunica-zora", "Túnica Zora", "Zora Tunic", "dominio", "a", "Fuego azul (botella)", "Descongela al Rey Zora con Fuego azul (de la Caverna de Hielo) y te regala la túnica. Permite respirar bajo el agua."),
  I("equipo", "botas-hierro", "Botas de hierro", "Iron Boots", "hielo", "a", "", "Al final de la Caverna de Hielo: derrota al Lobo blanco (Wolfos) y abre el cofre. Ahí te espera Sheik."),
  I("equipo", "botas-levitadoras", "Botas levitadoras", "Hover Boots", "tsombra", "a", "", "Templo de las Sombras: cofre tras derrotar a la Mano Muerta (Dead Hand)."),
];

// ───────────────────────── MEJORAS ─────────────────────────
const mejoras = [
  I("mejoras", "bolsa-bombas-30", "Bolsa de bombas grande (30)", "Big Bomb Bag", "goron", "n", "Bombas", "De niño, en la Ciudad Goron, lanza una bomba al Goron que rueda por el nivel superior para detenerlo y habla con él."),
  I("mejoras", "bolsa-bombas-40", "Bolsa de bombas gigante (40)", "Biggest Bomb Bag", "ciudadela", "n", "Rupias", "Premio de la Bolera de Bombchus en la Ciudadela. Los premios rotan: juega hasta que salga la bolsa."),
  I("mejoras", "carcaj-40", "Carcaj grande (40)", "Big Quiver", "kakariko", "a", "Arco", "De adulto, obtén puntuación perfecta en la Galería de tiro de Kakariko."),
  I("mejoras", "carcaj-50", "Carcaj gigante (50)", "Biggest Quiver", "fortaleza", "a", "Tarjeta Gerudo · Epona · Arco", "Consigue 1500 puntos en la arquería a caballo de la Fortaleza Gerudo (con 1000 ganas la pieza de corazón)."),
  I("mejoras", "semillas-40", "Bolsa de semillas grande (40)", "Big Bullet Bag", "perdido", "n", "Tirachinas", "En el Bosque Perdido hay un blanco colgado de un árbol: acierta al centro 3 veces seguidas con el tirachinas."),
  I("mejoras", "semillas-50", "Bolsa de semillas gigante (50)", "Biggest Bullet Bag", "ciudadela", "n", "Tirachinas", "De niño, logra puntuación perfecta en la Galería de tiro de la Ciudadela."),
  I("mejoras", "palos-20", "Capacidad de palos (20)", "Deku Stick upgrade", "perdido", "n", "40 rupias", "En el Bosque Perdido ve a la izquierda, luego otra vez a la izquierda hasta el fondo; cómprale la mejora al mercader Deku."),
  I("mejoras", "palos-30", "Capacidad de palos (30)", "Deku Stick upgrade", "perdido", "n", "Máscara de calavera", "Bosque Perdido: derecha, izquierda, derecha, izquierda, izquierda. Entra al hoyo junto a las mariposas (Teatro Deku), ponte la Máscara de calavera y acércate al borde."),
  I("mejoras", "nueces-30", "Capacidad de nueces (30)", "Deku Nut upgrade", "perdido", "n", "Máscara de la Verdad", "En el mismo Teatro Deku del Bosque Perdido, ponte la Máscara de la Verdad y acércate al líder de los Deku.", { v: { n64: "En N64/Virtual Console, consíguela antes de obtener la Sierra del furtivo o quedará bloqueada." } }),
  I("mejoras", "nueces-40", "Capacidad de nueces (40)", "Deku Nut upgrade", "pradera", "na", "Bombas · 40 rupias", "En la primera zona de la Pradera Sagrada, vuela la roca, baja por el hoyo y cómprale la mejora al mercader Deku."),
  I("mejoras", "cartera-adulto", "Cartera de adulto (200)", "Adult's Wallet", "kakariko", "na", "10 Skulltulas", "Entrega 10 fichas de Skulltula en la Casa de las Skulltulas de Kakariko."),
  I("mejoras", "cartera-gigante", "Cartera gigante (500)", "Giant's Wallet", "kakariko", "na", "30 Skulltulas", "Entrega 30 fichas de Skulltula en la Casa de las Skulltulas de Kakariko."),
  I("mejoras", "escama-plata", "Escama de plata", "Silver Scale", "dominio", "n", "20 rupias", "De niño, juega el juego de buceo en la cascada del Dominio Zora y recoge todas las rupias a tiempo."),
  I("mejoras", "escama-oro", "Escama de oro", "Golden Scale", "lago", "a", "", "De adulto, pesca un pez de 13 libras o más en el Estanque de pesca del Lago Hylia."),
  I("mejoras", "brazalete", "Brazalete Goron", "Goron's Bracelet", "goron", "n", "Canción de Saria", "Toca la Canción de Saria frente a Darunia en su sala de la Ciudad Goron. Te deja levantar Flores Bomba."),
  I("mejoras", "guantes-plata", "Guantes de plata", "Silver Gauntlets", "tespiritu", "n", "Réquiem del Espíritu", "Entra de niño al Templo del Espíritu y recorre el ala izquierda hasta el cofre de la mano de la estatua. Los usarás de adulto."),
  I("mejoras", "guantes-oro", "Guantes de oro", "Golden Gauntlets", "ganon", "a", "Flechas de fuego", "Castillo de Ganon: dentro de la Prueba de las Sombras (barrera morada), cofre al final del recorrido."),
  I("mejoras", "magia", "Medidor de magia", "Magic Meter", "sendero", "n", "Bombas · Nana de Zelda", "En la cima de la Montaña de la Muerte vuela la pared agrietada y toca la Nana de Zelda a la Gran Hada."),
  I("mejoras", "doble-magia", "Doble magia", "Double Magic", "crater", "a", "Martillo Megatón · Nana de Zelda", "En el Cráter de la Montaña de la Muerte, rompe con el martillo la roca junto a la entrada y visita a la Gran Hada."),
  I("mejoras", "doble-defensa", "Doble defensa", "Enhanced Defense", "castillo", "a", "Guantes de oro · Nana de Zelda", "Fuera del Castillo de Ganon, al final del camino a la derecha, levanta el pilar negro con los Guantes de oro y visita a la Gran Hada."),
];

// ───────────────────────── CANCIONES ─────────────────────────
const canciones = [
  I("canciones", "nana-zelda", "Nana de Zelda", "Zelda's Lullaby", "castillo", "n", "", "Tras hablar con Zelda en el jardín del Castillo, Impa te la enseña al acompañarte a la salida."),
  I("canciones", "cancion-epona", "Canción de Epona", "Epona's Song", "lonlon", "n", "Ocarina", "De niño, de día, saca la ocarina frente a Malon en el corral del Rancho Lon Lon."),
  I("canciones", "cancion-saria", "Canción de Saria", "Saria's Song", "pradera", "n", "Haber visto a Zelda", "Cruza el Bosque Perdido hasta la Pradera Sagrada; Saria te espera sentada en el tocón."),
  I("canciones", "cancion-sol", "Canción del Sol", "Sun's Song", "cementerio", "n", "Nana de Zelda", "En el Cementerio, toca la Nana de Zelda sobre la Trifuerza de la gran lápida y baja a la Tumba Real. La canción está grabada al fondo."),
  I("canciones", "cancion-tiempo", "Canción del Tiempo", "Song of Time", "ciudadela", "n", "Ocarina del Tiempo", "Al recoger la Ocarina del Tiempo del foso, Zelda te la enseña en un recuerdo."),
  I("canciones", "cancion-tormenta", "Canción de la Tormenta", "Song of Storms", "kakariko", "a", "", "De adulto, en el molino de Kakariko, saca la ocarina frente al hombre del organillo. Luego tócasela de niño para secar el pozo."),
  I("canciones", "minueto", "Minueto del Bosque", "Minuet of Forest", "pradera", "a", "", "De adulto, cruza la Pradera Sagrada esquivando a los Moblins; Sheik te la enseña frente al Templo del Bosque."),
  I("canciones", "bolero", "Bolero del Fuego", "Bolero of Fire", "crater", "a", "Gancho", "Al entrar al Cráter de la Montaña de la Muerte de adulto, Sheik aparece en el puente roto y te la enseña."),
  I("canciones", "serenata", "Serenata del Agua", "Serenade of Water", "hielo", "a", "", "Sheik te la enseña al terminar la Caverna de Hielo, tras conseguir las Botas de hierro."),
  I("canciones", "nocturno", "Nocturno de la Sombra", "Nocturne of Shadow", "kakariko", "a", "Medallones de Bosque, Fuego y Agua", "Al entrar a Kakariko de adulto tras los tres templos, Sheik te la enseña junto al pozo."),
  I("canciones", "requiem", "Réquiem del Espíritu", "Requiem of Spirit", "coloso", "a", "Cruzar el desierto", "Al llegar al Coloso del Desierto por primera vez, Sheik te la enseña frente al Templo del Espíritu."),
  I("canciones", "preludio", "Preludio de la Luz", "Prelude of Light", "templotiempo", "a", "Medallón del Bosque", "Vuelve al Templo del Tiempo de adulto tras el Templo del Bosque; Sheik te la enseña."),
];

// ───────────────────────── MISIÓN ─────────────────────────
const mision = [
  I("mision", "esmeralda", "Esmeralda Kokiri", "Kokiri's Emerald", "deku", "n", "", "Te la da el Gran Árbol Deku tras derrotar a Gohma."),
  I("mision", "rubi", "Rubí Goron", "Goron's Ruby", "dodongo", "n", "", "Darunia te lo da tras derrotar al Rey Dodongo."),
  I("mision", "zafiro", "Zafiro Zora", "Zora's Sapphire", "jabu", "n", "", "Ruto te lo da tras derrotar a Barinade en la Tripa de Jabu-Jabu."),
  I("mision", "med-luz", "Medallón de la Luz", "Light Medallion", "templotiempo", "a", "", "Rauru te lo entrega en la Cámara de los Sabios al sacar la Espada Maestra."),
  I("mision", "med-bosque", "Medallón del Bosque", "Forest Medallion", "tbosque", "a", "", "Al derrotar a Ganon Fantasma, Saria despierta como sabia."),
  I("mision", "med-fuego", "Medallón del Fuego", "Fire Medallion", "tfuego", "a", "", "Al derrotar a Volvagia, Darunia despierta como sabio."),
  I("mision", "med-agua", "Medallón del Agua", "Water Medallion", "tagua", "a", "", "Al derrotar a Morpha, Ruto despierta como sabia."),
  I("mision", "med-sombra", "Medallón de la Sombra", "Shadow Medallion", "tsombra", "a", "", "Al derrotar a Bongo Bongo, Impa despierta como sabia."),
  I("mision", "med-espiritu", "Medallón del Espíritu", "Spirit Medallion", "tespiritu", "a", "", "Al derrotar a Birova (Twinrova), Nabooru despierta como sabia."),
  I("mision", "tarjeta-gerudo", "Tarjeta de socio Gerudo", "Gerudo's Card", "fortaleza", "a", "Gancho", "Rescata a los 4 carpinteros encerrados en la Fortaleza Gerudo. Te permite entrar al Campo de Entrenamiento y cruzar la puerta al desierto."),
  I("mision", "agonia", "Piedra de la Agonía", "Stone of Agony", "kakariko", "na", "20 Skulltulas", "Entrega 20 fichas en la Casa de las Skulltulas. Avisa de grutas y secretos cercanos.", { v: { n64: "Necesitas el Rumble Pak para que vibre.", "3ds": "Se llama Fragmento de la Agonía y emite un sonido/icono en pantalla." } }),
];

// ───────────────────────── CORAZONES ─────────────────────────
const PC = [
  ["cementerio", "n", "Canción del Sol", "Mirando a la salida desde la Tumba Real, tira de la segunda lápida desde la derecha. Abajo hay un ReDead: congélalo con la Canción del Sol, derrótalo y vuelve a tocarla para que aparezca el cofre."],
  ["cementerio", "n", "10 rupias por intento", "Entre las 18:00 y 21:00, paga a Dampé para que excave en tierra blanda (Excavación del enterrador). Es aleatorio: insiste hasta que salga."],
  ["lonlon", "n", "", "En el almacén del fondo del rancho, mueve las cajas y gatea por el hueco de la esquina. La pieza está en un nido."],
  ["valle", "na", "", "En la cascada del norte del Valle Gerudo hay un nicho con la pieza. De niño planea con un cuco; de adulto, salta al agua del lado Gerudo y sube por la escalera."],
  ["valle", "na", "", "Desde el puente, mira al lado Gerudo y a la izquierda: hay una caja sobre una plataforma en la pared. De niño planea con un cuco; de adulto usa la Zarpa. Rueda contra la caja."],
  ["lago", "n", "", "En el Estanque de pesca, pesca un pez de 10 libras de niño y enséñaselo al encargado."],
  ["perdido", "n", "Ocarina", "Desde la entrada del Bosque Perdido ve una pantalla a la derecha y baja. Súbete al tocón: aparecen dos Skull Kids. Repite sus 3 melodías seguidas."],
  ["perdido", "n", "Canción de Saria", "Desde la entrada ve una pantalla a la izquierda. Súbete al tocón y toca la Canción de Saria al Skull Kid."],
  ["ciudadela", "n", "", "De noche, haz que el perro blanco del puesto azul (a la izquierda de la salida al Campo) te siga hasta la casa abierta del callejón: Mamamu Yan te regala la pieza."],
  ["goron", "na", "Brazalete Goron", "En el nivel más bajo enciende todas las antorchas (con palo Deku o Fuego de Din). La vasija gigante gira: desde el piso 2 lanza una bomba dentro cuando la cara sonría."],
  ["crater", "na", "", "La pared bajo la entrada del Cráter se puede escalar: corre hacia el borde, baja escalando y entra al nicho. O usa la planta de judía (plantada de niño) de adulto."],
  ["kakariko", "n", "", "Sube al tejado de la casa de Impa (con un cuco desde la obra, con el búho o de adulto con el Gancho), baja al saliente del lado este y entra por el agujero al establo de la vaca."],
  ["ciudadela", "n", "Bombas · Caverna de los Dodongos completada", "Bolera de Bombchus: los premios rotan (Bombchus, pieza de corazón, bombas, bolsa, rupia morada). Gana cuando toque la pieza."],
  ["campo", "na", "Bombas", "Al suroeste del Campo, antes de la entrada al Lago Hylia, hay 4 vallas formando un cuadrado. Pon una bomba en el centro, baja y cómprale la pieza al mercader Deku (10 rupias)."],
  ["rio", "na", "", "En un pilar en el centro del Río Zora. De niño, con un cuco o el Bumerán; de adulto, con las Botas levitadoras."],
  ["rio", "na", "", "Al final del río, junto a la cascada del Dominio Zora, en una plataforma de la esquina. Cuco o Bumerán de niño; Botas levitadoras de adulto."],
  ["dominio", "n", "Palos Deku", "Enciende con un palo Deku las 5 antorchas del Dominio Zora (desde la sala del Rey, bajando la rampa, junto a la tienda, cerca del círculo de piedras y dos tras la cascada). Aparece un cofre."],
  ["cementerio", "a", "Judía mágica", "Planta una judía en la tierra blanda del lado izquierdo del Cementerio de niño. De adulto, súbete a la planta hasta el saliente y rueda contra la caja."],
  ["kakariko", "na", "Bumerán (niño) o carrera de Dampé (adulto)", "Dentro del molino, en un saliente alto. De niño atrápala con el Bumerán; de adulto, tras la carrera de Dampé, salta por las plataformas giratorias."],
  ["cementerio", "a", "Gancho", "Vuelve a correr contra el fantasma de Dampé y llega en menos de 1 minuto."],
  ["kakariko", "na", "", "Sube al tejado de la Tienda de pociones (desde la valla frente al molino con el Gancho, o de niño saltando desde la torre de vigilancia) y habla con el hombre."],
  ["kakariko", "na", "50 Skulltulas", "Entrega 50 fichas de Skulltula en la Casa de las Skulltulas."],
  ["lago", "a", "Judía mágica o Canción del espantapájaros", "En el tejado del Laboratorio del Lago. Sube con la planta de judía (plantada de niño) o invoca a Pierre y usa el Gancho."],
  ["lago", "na", "Escama de oro", "Dentro del Laboratorio, bucea hasta el fondo de la piscina (suena el sonido de secreto) y habla con el científico."],
  ["campo", "na", "Bombas · Escama de oro o Botas de hierro", "Al noroeste del Rancho, entre el Valle Gerudo y el Castillo, hay un árbol solitario. Pon una bomba junto a él, entra a la gruta y bucea en el agua profunda."],
  ["sendero", "a", "Judía mágica", "Planta una judía frente a la Caverna de los Dodongos de niño. De adulto, súbete y salta al saliente justo encima de la entrada."],
  ["crater", "a", "Bolero del Fuego · Judía mágica", "Planta una judía junto al pedestal de la Trifuerza del Cráter de niño. De adulto, súbete y bájate en la cima humeante del centro."],
  ["fuente", "a", "", "En la Fuente Zora congelada, salta por los icebergs hasta el que tiene la pieza."],
  ["hielo", "a", "Fuego azul", "En la sala de la Brújula de la Caverna de Hielo, derrite con Fuego azul el bloque de hielo rojo que contiene la pieza."],
  ["fuente", "a", "Botas de hierro · Túnica Zora", "En el fondo de la Fuente Zora. Hunde con las Botas de hierro y búscala en el suelo."],
  ["rio", "n", "Canción de la Tormenta", "En el tronco que sale al agua en el centro del Río Zora, saca la ocarina para que salgan las ranas y toca la Canción de la Tormenta."],
  ["rio", "n", "Nana de Zelda, Saria, Epona, Sol, Tiempo y Tormenta", "Toca a las ranas la Nana de Zelda, Saria, Epona, Sol y Tiempo para que crezcan. Luego juega su minijuego: pulsa el botón de la nota donde salte la mariposa.", { v: { n64: "Patrón: A, C←, C→, C↓, C←, C→, C↓, A, C↓, A, C↓, C→, C←, A", "3ds": "Patrón: L, X, Y, R, X, Y, R, L, R, L, R, Y, X, L" } }],
  ["ciudadela", "n", "Lente de la Verdad", "De noche, en el Juego del cofre del tesoro (10 rupias), usa la Lente de la Verdad para elegir siempre los cofres con llave hasta el final."],
  ["fortaleza", "a", "Tarjeta Gerudo · Canción del espantapájaros o Zarpa", "En lo más alto de la Fortaleza hay un cofre: invoca a Pierre para cruzar con el Gancho, o engancha el cofre directamente con la Zarpa."],
  ["fortaleza", "a", "Tarjeta Gerudo · Epona · Arco", "Consigue 1000 puntos en la arquería a caballo."],
  ["coloso", "a", "Réquiem del Espíritu · Judía mágica", "Planta una judía junto a la entrada del Templo del Espíritu de niño. De adulto, súbete y salta en la plataforma de piedras sobre la que pasa."],
];
const piezas = PC.map(([z, e, req, g, extra], i) =>
  I("corazones", `pc-${String(i + 1).padStart(2, "0")}`, `Pieza de corazón #${i + 1}`, "Piece of Heart", z, e, req, g, extra || {}));

const contenedores = [
  ["deku", "Gohma"], ["dodongo", "Rey Dodongo"], ["jabu", "Barinade"], ["tbosque", "Ganon Fantasma"],
  ["tfuego", "Volvagia"], ["tagua", "Morpha"], ["tsombra", "Bongo Bongo"], ["tespiritu", "Birova (Twinrova)"],
].map(([z, jefe]) => I("corazones", `hc-${z}`, `Contenedor de corazón · ${jefe}`, "Heart Container",
  z, ["deku", "dodongo", "jabu"].includes(z) ? "n" : "a", "", `Aparece al derrotar a ${jefe}, el jefe de este lugar.`));

// ───────────────────────── SKULLTULAS ─────────────────────────
// [num, zona, edad, noche, requisito, guía]
const GS = [
  [1, "deku", "n", 0, "", "En la sala de la Brújula, sube a la plataforma de la izquierda: está detrás del cofre."],
  [2, "deku", "n", 0, "Tirachinas", "Tras romper la telaraña y caer al sótano, gírate y mira las enredaderas: derríbala con el tirachinas."],
  [3, "deku", "n", 0, "", "En el sótano, en la reja del lado norte de la sala."],
  [4, "ciudadela", "n", 0, "", "En la Caseta de guardia antes de entrar al Mercado: rueda contra una caja del fondo."],
  [5, "castillo", "n", 0, "", "En el camino al Castillo, rueda contra el árbol solitario cerca de la salida de la Ciudadela."],
  [6, "cementerio", "n", 0, "Botella con bichos", "Suelta bichos en la tierra blanda del lado izquierdo del Cementerio."],
  [7, "kakariko", "n", 1, "", "En el edificio en construcción del centro de la aldea."],
  [8, "kakariko", "n", 1, "", "En la pared lateral de la Casa de las Skulltulas."],
  [9, "kakariko", "n", 1, "", "Rueda contra el árbol que está justo enfrente al entrar a la aldea."],
  [10, "kakariko", "n", 1, "Tirachinas", "En lo alto de la torre de vigilancia: derríbala con el tirachinas."],
  [11, "kakariko", "n", 1, "", "En la pared de la casa más cercana a la puerta de la Montaña de la Muerte."],
  [12, "lonlon", "n", 0, "", "Pasa los primeros edificios, gira a la izquierda y rueda contra el árbol."],
  [13, "lonlon", "n", 1, "", "Fuera del corral, al sureste, detrás de las tablas de madera."],
  [14, "valle", "n", 0, "Botella con bichos", "Planea con un cuco hasta el agua de abajo; en la orilla oeste hay tierra blanda junto a una Gerudo."],
  [15, "lago", "n", 0, "Botella con bichos", "Tierra blanda junto al Laboratorio, al noroeste del lago."],
  [16, "lago", "n", 1, "", "En la isla de la esquina sureste del lago."],
  [17, "kokiri", "n", 1, "", "En la parte trasera de la casa de los Hermanos Sabelotodo, al suroeste del pueblo."],
  [18, "perdido", "n", 0, "Botella con bichos", "Desde la entrada: izquierda y otra vez izquierda. Suelta bichos en la tierra blanda."],
  [19, "perdido", "n", 0, "Botella con bichos", "Derecha, izquierda, derecha, izquierda, izquierda hasta el prado: tierra blanda al frente."],
  [20, "kokiri", "n", 0, "Botella con bichos", "Tierra blanda justo detrás de la Tienda Kokiri."],
  [21, "sendero", "n", 0, "Botella con bichos", "Tierra blanda frente a la Caverna de los Dodongos."],
  [22, "dodongo", "n", 0, "Tirachinas", "En la sala de la gran escalera, sube hasta arriba y rodea hacia el sur: derríbala y trepa por la ficha."],
  [23, "dodongo", "n", 0, "Bombas", "Desde la entrada, puerta sureste (sala de Dodongos bebé): vuela la pared y baja a la sala siguiente."],
  [24, "dodongo", "n", 0, "Bombas", "En la sala de los Keese de fuego, casi al final: vuela la pared norte; está detrás de la estatua Armos."],
  [25, "sendero", "n", 0, "Bombas", "En el sendero entre Kakariko y la Caverna, vuela la pared donde se oye: trepa tras derrotarla."],
  [26, "goron", "n", 0, "Bombas", "Al entrar a la Ciudad Goron, vuela las 3 rocas de la izquierda, sigue el camino derecho y rueda contra la caja del fondo."],
  [27, "crater", "n", 0, "", "Al entrar al Cráter desde la cima, rueda contra la caja de madera."],
  [28, "rio", "n", 0, "", "Rueda contra el primer árbol de la entrada del Río Zora."],
  [29, "rio", "n", 1, "Tirachinas", "Al final del río, junto a la escalera que sale del agua cerca de la cascada."],
  [30, "fuente", "n", 0, "", "Rueda contra el árbol solitario al sureste de la Fuente Zora."],
  [31, "jabu", "n", 0, "", "Tras caer con Ruto, en la sala con el interruptor de suelo: derríbala de la pared y trepa."],
  [32, "jabu", "n", 0, "Bumerán", "Al caer al piso inferior por segunda vez hay dos en la pared: atrapa la ficha más cercana con el Bumerán."],
  [33, "jabu", "n", 0, "Bumerán", "En la misma pared que la anterior: atrapa la ficha más lejana con el Bumerán."],
  [34, "jabu", "n", 0, "Bumerán", "En la sala antes del jefe, sobre las enredaderas."],
  [35, "fuente", "n", 1, "Bumerán", "Párate en el tronco al sur de Jabu-Jabu: anda por la pared, atrápala con el Bumerán."],
  [36, "deku", "n", 0, "Bumerán · Bombas", "Sótano 1, sala noroeste: quema la telaraña, vuela la roca y atrapa la ficha de la pared con el Bumerán."],
  [37, "lonlon", "n", 1, "Bumerán", "En la ventana del edificio de la izquierda al entrar al rancho."],
  [38, "lonlon", "n", 1, "Bumerán", "En lo alto del muro, al extremo suroeste del rancho."],
  [39, "campo", "n", 0, "Bombas · Fuego de Din · Bumerán", "Al oeste del Campo, cerca del Valle Gerudo, hay un círculo de rocas: bomba al centro, quema las telarañas con Fuego de Din. Está tras la vaca, arriba."],
  [40, "valle", "n", 1, "Bumerán", "Tras la rampa de madera de la entrada, a la derecha, donde sale agua de un hueco en la pared."],
  [41, "lago", "n", 1, "Bumerán", "Desde el puente junto al Laboratorio, mira la pared del edificio."],
  [42, "campo", "n", 0, "Bombas · Bumerán", "Al norte del puentecito entre la Ciudadela y Kakariko hay un árbol: bomba junto a él. Dentro hay una Skulltula gigante y la dorada arriba."],
  [43, "cementerio", "n", 1, "Bumerán", "En la pared de la esquina sureste del Cementerio."],
  [44, "dodongo", "na", 0, "Bumerán (niño) o Gancho (adulto)", "En la sala de la gran escalera, sin haberla bajado: entra por la puerta del piso 2 y búscala en un hueco en lo alto de la escalera."],
  [45, "kakariko", "a", 1, "Gancho", "En el tejado de la casa de Impa: engánchate al tejado de la Casa de las Skulltulas y luego al de Impa."],
  [46, "castillo", "a", 0, "Gancho", "Frente al Castillo de Ganon, sigue el camino a la derecha pasando el arco y gírate: está en la parte de atrás."],
  [47, "kokiri", "a", 1, "Gancho", "Encima de la casa de las Gemelas, al sureste del bosque."],
  [48, "perdido", "a", 1, "Judía mágica", "En el prado (der, izq, der, izq, izq), súbete a la planta de judía y golpéala arriba."],
  [49, "pradera", "a", 1, "Gancho", "Sube la escalera de la Pradera Sagrada y mira la pared este."],
  [50, "tbosque", "a", 0, "Gancho", "En la primera sala, sube por las enredaderas de la derecha."],
  [51, "tbosque", "a", 0, "Gancho", "En la gran sala central, camina a la puerta norte y mira la pared derecha."],
  [52, "tbosque", "a", 0, "Gancho", "En el patio noreste, engánchate al cofre del saliente alto; está a la vuelta de la esquina."],
  [53, "tbosque", "a", 0, "Gancho", "En el patio noroeste, salta a la plataforma estrecha con corazones y mira la pared."],
  [54, "tbosque", "a", 0, "Gancho", "En el sótano, antes del jefe, en la sala del cofre."],
  [55, "dodongo", "a", 0, "Canción del espantapájaros · Gancho", "En la sala de Dodongos bebé (sureste), Navi vuela a un saliente alto: invoca a Pierre y engánchate."],
  [56, "goron", "a", 0, "Gancho", "Cruza las cuerdas al entrar; está detrás del pedestal en lo más alto de la ciudad."],
  [57, "crater", "n", 0, "Bolero del Fuego · Botella con bichos", "Viaja de niño al Cráter con el Bolero del Fuego y suelta bichos en la tierra blanda."],
  [58, "tfuego", "a", 0, "Canción del Tiempo", "En la gran sala de lava del puente roto, a la izquierda: toca la Canción del Tiempo para mover el bloque, sube y entra. Está en la pared del fondo."],
  [59, "tfuego", "a", 0, "Bombas", "En el laberinto de rocas, pared agrietada al noreste en la planta baja, bajo el saliente."],
  [60, "tfuego", "a", 0, "Canción del espantapájaros · Gancho", "Tras la sala del fuego que te persigue, gira a la derecha, invoca a Pierre y engánchate al elevador secreto. Sube por la reja."],
  [61, "tfuego", "a", 0, "Canción del espantapájaros · Gancho", "Por el mismo elevador secreto, sigue subiendo hasta la gran sala abierta: mira a la izquierda en la pared."],
  [62, "tfuego", "a", 0, "Martillo Megatón", "En la sala antes del segundo Bailarín de Fuego, derrota a las baldosas y al Like Like: está en la pared del fondo."],
  [63, "sendero", "a", 1, "Martillo Megatón", "En el sendero de las rocas que caían, rompe la roca más cercana a la cima."],
  [64, "sendero", "a", 1, "Martillo Megatón", "Rompe la roca justo encima de la Caverna de los Dodongos, cerca de la Ciudad Goron."],
  [65, "rio", "a", 1, "Gancho", "Sube a la meseta central del río (por la judía o nadando por el arroyo este y la escalera); está en la pared sur."],
  [66, "rio", "a", 1, "Gancho", "Tras el puentecito hacia el Dominio Zora, súbete a la valla y engánchala en lo alto de la pared."],
  [67, "dominio", "a", 1, "Gancho", "Desde la sala del Rey Zora, ve al borde y mira a la izquierda, cerca de la cascada congelada."],
  [68, "hielo", "a", 0, "Gancho", "En la primera sala de la cuchilla giratoria, arriba en la pared sobre una rupia plateada."],
  [69, "hielo", "a", 0, "Gancho · Fuego azul", "En la sala de la Brújula, encima de un pilar alto."],
  [70, "hielo", "a", 0, "Gancho · Fuego azul", "En la gran sala de empujar bloques, en una pared alta."],
  [71, "lago", "a", 0, "Botas de hierro · Gancho", "En el Laboratorio, húndete en la piscina con las Botas de hierro y rueda contra la caja."],
  [72, "tagua", "a", 0, "Botas de hierro · Gancho", "En el nivel más bajo, pasillo sur: vuela el suelo, pisa el interruptor, engánchate al blanco y golpea el cristal.", { v: { n64: "El cristal está detrás de la reja: usa un ataque giratorio." } }],
  [73, "tagua", "a", 0, "Zarpa · Botas de hierro", "En la zona de remolinos tras conseguir la Zarpa, en una pared bajo el agua."],
  [74, "tagua", "a", 0, "Zarpa", "En la sala al oeste de la cámara principal, piso superior, en la pared derecha."],
  [75, "tagua", "a", 0, "Zarpa", "Dentro del gran pilar central, arriba del todo."],
  [76, "tagua", "a", 0, "Zarpa", "Antes de la Llave del jefe, detrás de una pequeña cascada: asómate al borde y mira a la derecha."],
  [77, "lago", "a", 1, "Zarpa", "Engánchate a lo alto del árbol de la isla sobre la entrada del Templo del Agua."],
  [78, "castillo", "n", 0, "Canción de la Tormenta · Bombas", "Junto al árbol en la esquina de la puerta del Castillo, toca la Canción de la Tormenta, baja y vuela la pared izquierda."],
  [79, "pozo", "n", 0, "", "En la sala central hay dos puertas cerradas: la de la izquierda (Baba Deku y vasijas voladoras), en la pared del fondo."],
  [80, "pozo", "n", 0, "Lente de la Verdad", "La puerta cerrada de la derecha (Keese): usa la Lente para encontrar el camino."],
  [81, "pozo", "n", 0, "Lente de la Verdad", "Esquina superior derecha: gatea por el hueco, abre la puerta y cruza los pozos invisibles. En la sala del Like Like."],
  [82, "tsombra", "a", 0, "Lente de la Verdad", "Tras las guillotinas y el Stalfos, camino izquierdo: derrota al Like Like y a los Keese para abrir la reja."],
  [83, "tsombra", "a", 0, "Lente de la Verdad", "En la sala de pinchos que caen, empuja el bloque oculto para frenarlos y mira tras la valla izquierda."],
  [84, "tsombra", "a", 0, "Botas levitadoras", "En la sala de la calavera gigante (donde lanzas una bomba para la llave), detrás de donde estaba."],
  [85, "tsombra", "a", 0, "Canción del espantapájaros · Zarpa", "Sobre el barco, mira hacia el atajo de la valla: Navi se vuelve verde. Invoca a Pierre y engánchate."],
  [86, "tsombra", "a", 0, "Botas levitadoras", "En la sala de muros invisibles antes de la Llave del jefe, ve al oeste: tras las tres calaveras giratorias."],
  [87, "valle", "a", 1, "Zarpa", "En la pared trasera de la tienda de los carpinteros."],
  [88, "valle", "a", 1, "Zarpa", "Tras cruzar el puente, en el arco a la izquierda: mira arriba en uno de los lados."],
  [89, "fortaleza", "a", 1, "Zarpa", "Cerca de lo alto de la Fortaleza, en la pared trasera."],
  [90, "fortaleza", "a", 1, "Tarjeta Gerudo · Zarpa", "En el campo de arquería a caballo, sobre el blanco del fondo."],
  [91, "desierto", "a", 0, "Tarjeta Gerudo", "En la construcción solitaria a mitad del desierto, baja a la cámara: está entre las dos antorchas."],
  [92, "coloso", "n", 0, "Réquiem del Espíritu · Botella con bichos", "De niño, suelta bichos en la tierra blanda junto al Templo del Espíritu."],
  [93, "coloso", "a", 1, "Judía mágica · Canción del Sol", "Súbete a la planta de judía hasta la gran roca al centro-norte; haz de noche con la Canción del Sol."],
  [94, "coloso", "a", 1, "Zarpa", "En lo alto de una palmera del oasis, al sur del Coloso."],
  [95, "tespiritu", "n", 0, "Bumerán", "De niño, en la sala de las 5 rupias plateadas y el Wallmaster: recógelas para bajar el puente y atrapa la ficha."],
  [96, "tespiritu", "n", 0, "Bumerán", "De niño, en la sala del puzzle de Bombchus: trepa la pared con dos Skulltulas, gírate y mira abajo."],
  [97, "tespiritu", "n", 0, "", "De niño, en el pasillo antes del Nudillo de Hierro: gírate, está sobre la puerta por la que entraste."],
  [98, "tespiritu", "a", 0, "Guantes de plata · Canción del Tiempo", "De adulto, en la sala de rocas rodantes y 5 rupias plateadas: toca la Canción del Tiempo ante el bloque; está detrás."],
  [99, "tespiritu", "a", 0, "Guantes de plata · Canción del espantapájaros · Zarpa", "En la gran sala de la estatua, sube por el oeste. Navi flota a una plataforma: invoca a Pierre y engánchate."],
  [100, "fuente", "a", 1, "Guantes de plata · Bombas · Lente de la Verdad", "Al sureste de la Fuente Zora (donde estaba la Gran Hada), levanta la roca plateada, vuela la de abajo, baja y cruza con la Lente. Está en la pared al final."],
];
const skulltulas = GS.map(([num, z, e, noche, req, g, extra]) =>
  I("skulltulas", `gs-${String(num).padStart(3, "0")}`, `Skulltula #${num}`, "Gold Skulltula", z, e, req, g,
    { noche: !!noche, dg: MAZMORRAS.has(z), ...(extra || {}) }));

// Master Quest: ubicaciones distintas dentro de las mazmorras (el resto no cambia).
const GSMQ = [
  ["deku", "n", "", "Piso 2: rueda contra la caja junto al cofre del Mapa."],
  ["deku", "n", "Bombchus", "Piso 2, sala de la Brújula: en un hueco detrás de las rocas."],
  ["deku", "n", "Canción del Tiempo · Bumerán", "Sótano 1, sala de antorchas del centro-oeste, en el techo."],
  ["deku", "n", "Bumerán", "Sótano 1, sala de antorchas del extremo oeste, en la pared del fondo."],
  ["dodongo", "na", "Canción del Tiempo · Bombas", "Sala del pilar gigante, tras una pared falsa bajo el bloque del tiempo trasero."],
  ["dodongo", "na", "Palos Deku, Fuego de Din o Flechas de fuego", "Sala de las tres antorchas flotantes, tras una puerta con barrotes: enciéndelas."],
  ["dodongo", "na", "Bombas", "Al fondo de la primera sala de Lizalfos, tras una hilera de rocas."],
  ["dodongo", "na", "Bumerán", "Sala del Poe, esquina superior izquierda (cadena de bombas)."],
  ["dodongo", "na", "Bumerán o Gancho", "Encima de la pared del anillo de fuego."],
  ["jabu", "n", "Canción del Tiempo", "Sala del Bumerán, bajo un bloque del tiempo."],
  ["jabu", "n", "Bombas · Bumerán", "Sala a la derecha de la del tentáculo verde, tras una roca."],
  ["jabu", "n", "Bumerán", "Sala donde cayó Ruto, pasando el tentáculo azul y los Keese invisibles."],
  ["jabu", "n", "Bumerán", "Sala antes de Barinade, arriba de la pared de enredaderas tras la telaraña."],
  ["tbosque", "a", "Gancho", "Encima de la puerta cerrada con llave."],
  ["tbosque", "a", "", "Detrás del pilar izquierdo, en el suelo."],
  ["tbosque", "a", "", "Esquina trasera derecha del jardín, subiendo por las enredaderas."],
  ["tbosque", "a", "Gancho", "Primer jardín, encima de un blanco para el Gancho."],
  ["tbosque", "a", "Gancho", "Al final del pozo vaciado, en una reja."],
  ["tfuego", "a", "", "Primer piso, detrás de la puerta de la celda del Goron."],
  ["tfuego", "a", "Gancho · Canción del Tiempo", "Sala del gran Lizalfos: blancos ocultos para el Gancho y un bloque del tiempo."],
  ["tfuego", "a", "Canción del Tiempo", "Laberinto de muros de fuego, puerta noroeste de la sala del Lizalfos."],
  ["tfuego", "a", "", "Pequeño compartimento sobre la sala del laberinto de fuego."],
  ["tfuego", "a", "Gancho · Martillo · Bombas", "Sala central del laberinto de fuego, tras una pared falsa."],
  ["hielo", "a", "Fuego azul · Canción del Tiempo", "Sala de la Brújula, en un bloque de hielo rojo sobre un pilar."],
  ["hielo", "a", "Canción del espantapájaros · Gancho", "Sala superior izquierda, en la esquina del fondo."],
  ["hielo", "a", "", "Misma sala, abajo en la pared bajo un saliente."],
  ["tagua", "a", "Canción del espantapájaros · Zarpa", "Pasillo sur, en el techo de una zona con reja (enciende tres antorchas)."],
  ["tagua", "a", "Canción del espantapájaros · Zarpa · Botas de hierro · Fuego de Din", "Sala de la piscina con remolino, tras unas cajas en una zona oculta."],
  ["tagua", "a", "Zarpa", "Sección del río del segundo piso, en una pared."],
  ["tagua", "a", "Fuego de Din", "Pasillo sur del segundo piso, detrás de dos cajas."],
  ["tagua", "a", "", "Sala que abre el interruptor azul, dentro de una caja cerca de lo alto."],
  ["pozo", "n", "Lente de la Verdad", "Pasillo noreste lleno de Skulltulas invisibles, al final."],
  ["pozo", "n", "", "Sala al oeste de la puerta del Mapa, tras tirar de una lápida."],
  ["pozo", "n", "", "Pasillo oeste, detrás de la estatua de pájaro derecha."],
  ["tsombra", "a", "", "Celda sur en la sala de pinchos que caen."],
  ["tsombra", "a", "", "Sala de ReDeads con cofre, en una pared."],
  ["tsombra", "a", "Bombas", "Sala de dos Gibdos, tras los escombros del noroeste."],
  ["tsombra", "a", "", "A mitad del abismo junto a la estatua de pájaro: mira hacia atrás."],
  ["tsombra", "a", "Lente de la Verdad", "Colgada de una plataforma invisible antes de la puerta del jefe."],
  ["tespiritu", "a", "", "Sala de los bloques solares: empuja el bloque sureste hacia la luz y usa la plataforma."],
  ["tespiritu", "a", "", "Sala del pozo de arena, en el techo."],
  ["tespiritu", "a", "", "Sala con muchas Skulltulas, en la pared este."],
  ["tespiritu", "a", "", "Sala del Nudillo de Hierro solitario, detrás de la estatua norte."],
  ["tespiritu", "a", "", "Sala del Nudillo de Hierro solitario, detrás de la estatua oeste."],
];
const cuentaMQ = {};
const skulltulasMQ = GSMQ.map(([z, e, req, g]) => {
  cuentaMQ[z] = (cuentaMQ[z] || 0) + 1;
  return I("skulltulas", `gsmq-${z}-${cuentaMQ[z]}`, `Skulltula MQ · ${ZONAS[z]} ${cuentaMQ[z]}`, "Gold Skulltula (MQ)", z, e, req, g, { mq: true, dg: true });
});

// ───────────────────────── EXTRAS ─────────────────────────
const extras = [
  I("extras", "huevo-raro", "Huevo raro", "Weird Egg", "castillo", "n", "", "Malon te lo da frente al Castillo de Hyrule. Se convierte en cuco al pasar de noche a día.", { grupo: "Intercambio de niño" }),
  I("extras", "cuco-nino", "Cuco", "Chicken", "castillo", "n", "Huevo raro", "Úsalo para despertar a Talon, que duerme junto a las cajas del Castillo.", { grupo: "Intercambio de niño" }),
  I("extras", "carta-zelda", "Carta de Zelda", "Zelda's Letter", "castillo", "n", "", "Zelda te la da tras hablar con ella en el jardín. Enséñasela al guardia de la puerta de la Montaña en Kakariko.", { grupo: "Intercambio de niño" }),
  I("extras", "mascara-keaton", "Máscara Keaton", "Keaton Mask", "kakariko", "n", "Carta de Zelda enseñada", "Pídela prestada en la Tienda de Máscaras de la Ciudadela y véndesela al guardia de la puerta de la Montaña. Paga el precio en la tienda.", { grupo: "Intercambio de niño" }),
  I("extras", "mascara-calavera", "Máscara de calavera", "Skull Mask", "perdido", "n", "Máscara Keaton vendida", "Véndesela al Skull Kid del tocón del Bosque Perdido (el de la Canción de Saria).", { grupo: "Intercambio de niño" }),
  I("extras", "mascara-espeluznante", "Máscara espeluznante", "Spooky Mask", "cementerio", "n", "Máscara de calavera vendida", "Véndesela de día al niño del Cementerio de Kakariko.", { grupo: "Intercambio de niño" }),
  I("extras", "capucha-conejo", "Capucha de conejo", "Bunny Hood", "campo", "n", "Máscara espeluznante vendida", "Véndesela al hombre que corre por el Campo de Hyrule: te paga lo que quepa en tu cartera.", { grupo: "Intercambio de niño" }),
  I("extras", "mascara-verdad", "Máscara de la Verdad", "Mask of Truth", "ciudadela", "n", "Las 4 máscaras vendidas", "Tras vender las cuatro máscaras, el dueño de la tienda te presta la Máscara de la Verdad (deja hablar con las Piedras Sheikah).", { grupo: "Intercambio de niño" }),
  I("extras", "mascara-goron", "Máscara Goron", "Goron Mask", "ciudadela", "n", "Máscara de la Verdad", "Préstamo de la Tienda de Máscaras, disponible tras la Máscara de la Verdad.", { grupo: "Intercambio de niño" }),
  I("extras", "mascara-zora", "Máscara Zora", "Zora Mask", "ciudadela", "n", "Máscara de la Verdad", "Préstamo de la Tienda de Máscaras, disponible tras la Máscara de la Verdad.", { grupo: "Intercambio de niño" }),
  I("extras", "mascara-gerudo", "Máscara Gerudo", "Gerudo Mask", "ciudadela", "n", "Máscara de la Verdad", "Préstamo de la Tienda de Máscaras, disponible tras la Máscara de la Verdad.", { grupo: "Intercambio de niño" }),
  I("extras", "huevo-bolsillo", "Huevo de bolsillo", "Pocket Egg", "kakariko", "a", "", "La mujer de los cucos de Kakariko te lo da de adulto. Eclosiona al pasar la noche.", { grupo: "Intercambio de adulto" }),
  I("extras", "cuco-bolsillo", "Cuco de bolsillo", "Pocket Cucco", "kakariko", "a", "Huevo de bolsillo", "Despierta con él a Talon, que duerme en una casa de Kakariko.", { grupo: "Intercambio de adulto" }),
  I("extras", "cojiro", "Cojiro", "Cojiro", "kakariko", "a", "Cuco de bolsillo", "La mujer de los cucos te da a Cojiro tras despertar a Talon.", { grupo: "Intercambio de adulto" }),
  I("extras", "seta-extrana", "Seta extraña", "Odd Mushroom", "perdido", "a", "Cojiro", "Enséñale a Cojiro al hijo del carpintero en el Bosque Perdido. ¡La seta caduca! Llévala rápido a la abuela de la tienda de pociones (entrada trasera) en Kakariko.", { grupo: "Intercambio de adulto" }),
  I("extras", "mezcla-extrana", "Mezcla extraña", "Odd Potion", "kakariko", "a", "Seta extraña", "La abuela te la da. Entrégasela a Fado en el Bosque Perdido.", { grupo: "Intercambio de adulto" }),
  I("extras", "sierra", "Sierra del furtivo", "Poacher's Saw", "perdido", "a", "Mezcla extraña", "Fado te la da. Entrégasela al jefe de carpinteros en el Valle Gerudo.", { grupo: "Intercambio de adulto" }),
  I("extras", "espada-rota", "Espada Goron rota", "Broken Goron's Sword", "valle", "a", "Sierra del furtivo", "El jefe de carpinteros te la da. Llévasela a Biggoron en la cima de la Montaña de la Muerte.", { grupo: "Intercambio de adulto" }),
  I("extras", "receta", "Receta", "Prescription", "sendero", "a", "Espada Goron rota", "Biggoron te pide gotas para los ojos. Lleva la receta al Rey Zora (descongelado).", { grupo: "Intercambio de adulto" }),
  I("extras", "rana-ocular", "Rana ocular", "Eyeball Frog", "dominio", "a", "Receta", "El Rey Zora te la da. ¡Caduca! Llévala rápido al científico del Laboratorio del Lago Hylia.", { grupo: "Intercambio de adulto" }),
  I("extras", "gotas", "Gotas para los ojos", "World's Finest Eye Drops", "lago", "a", "Rana ocular", "El científico te las da. ¡Caducan! Llévalas rápido a Biggoron (usa Epona o la Zarpa para atajar).", { grupo: "Intercambio de adulto" }),
  I("extras", "resguardo", "Resguardo", "Claim Check", "sendero", "a", "Gotas para los ojos", "Biggoron te lo da. Vuelve tras unos 3 días y cámbialo por la Espada de Biggoron.", { grupo: "Intercambio de adulto" }),
  I("extras", "espantapajaros", "Canción del espantapájaros", "Scarecrow's Song", "lago", "na", "Ocarina", "De niño, habla con el espantapájaros Bonooru del Lago Hylia y tócale una melodía de 8 notas. De adulto, vuelve a tocársela a Pierre para registrarla.", { grupo: "Otros" }),
];

export const ELEMENTOS = [
  ...objetos, ...botellas, ...equipo, ...mejoras, ...canciones, ...mision,
  ...piezas, ...contenedores, ...skulltulas, ...skulltulasMQ, ...extras,
];

// Elementos que aplican a una partida según su versión y si es Master Quest.
export function elementosDe(partida) {
  const mq = !!partida?.master_quest;
  return ELEMENTOS.filter((it) => (mq ? !(it.dg && !it.mq) : !it.mq));
}

export const RECOMPENSAS_SKULLTULA = [
  [10, "Cartera de adulto"], [20, "Piedra de la Agonía"], [30, "Cartera gigante"],
  [40, "10 Bombchus"], [50, "Pieza de corazón"], [100, "Rupias enormes ilimitadas"],
];
