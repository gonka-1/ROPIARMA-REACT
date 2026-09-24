export const CATEGORIAS = {
  frutas: { titulo: 'Frutas Frescas', imagen: '/imagenes/CategoriaFrutas.png' },
  verduras: { titulo: 'Verduras Orgánicas', imagen: '/imagenes/CategoriaVerduras.jpg' },
  organicos: { titulo: 'Productos Orgánicos', imagen: '/imagenes/CategoriaOrganicos.jpg' },
  lacteos: { titulo: 'Productos Lácteos', imagen: '/imagenes/CategoriaLacteos.jpg' },
}

export const productos = [
  {
    id: 'FR001',
    slug: 'manzana',
    nombre: 'Manzana Fuji',
    categoria: 'frutas',
    tituloVista: 'Manzana Fuji 1kg - $1200',
    precio: 1200,
    stock: 150,
    unidad: 'KG',
    cardImage: '/imagenes/manzana fuji.jpg',
    imagenes: ['/imagenes/fuji.webp', '/imagenes/manzanas.jpg', '/imagenes/manzana fuji.jpg'],
    descripcion:
      'Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanas son conocidas por su textura firme y su sabor equilibrado entre dulce y ácido.',
  },
  {
    id: 'FR002',
    slug: 'naranja',
    nombre: 'Naranja Valencia',
    categoria: 'frutas',
    tituloVista: 'Naranja Valencia 1kg- $1000',
    precio: 1000,
    stock: 200,
    unidad: 'KG',
    cardImage: '/imagenes/naranja valencia.jpg',
    imagenes: ['/imagenes/origen-de-la-naranja.jpg', '/imagenes/naranja.jpeg', '/imagenes/naranja.jpg'],
    descripcion:
      'Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad.',
  },
  {
    id: 'FR003',
    slug: 'platano',
    nombre: 'Plátanos Cavendish',
    categoria: 'frutas',
    tituloVista: 'Platano Cavendish 1kg - $800',
    precio: 800,
    stock: 250,
    unidad: 'KG',
    cardImage: '/imagenes/platano cavendish.jpg',
    imagenes: ['/imagenes/platanos2.jpeg', '/imagenes/platanosfoto.png', '/imagenes/platanomiel.jpg'],
    descripcion:
      'Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Estos plátanos son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.',
  },
  {
    id: 'VR001',
    slug: 'zanahoria',
    nombre: 'Zanahoria Orgánica',
    categoria: 'verduras',
    tituloVista: 'Zanahoria Orgánicas 1kg - $900',
    precio: 900,
    stock: 100,
    unidad: 'KG',
    cardImage: '/imagenes/zanahorias.jpg',
    imagenes: [
      '/imagenes/cover-guia-cultivo-zanahoria.jpg',
      '/imagenes/¿Por qué son buenas las zanahorias_ Arla.jpg',
      '/imagenes/zanahoriapicada.jpg',
    ],
    descripcion:
      "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable.",
  },
  {
    id: 'VR002',
    slug: 'espinaca',
    nombre: 'Espinacas Frescas',
    categoria: 'verduras',
    tituloVista: 'Espinaca 1 Bolsa - $700',
    precio: 700,
    stock: 800,
    unidad: 'Bolsas',
    cardImage: '/imagenes/Espinacas.jpeg',
    imagenes: [
      '/imagenes/cultivar_espinacas.jpg',
      '/imagenes/espinaca99764165b6ebca200d3fd032b7332e08.webp',
      '/imagenes/hojas_de_espinacas_2-1.webp',
    ],
    descripcion:
      'Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Estas espinacas son cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional.',
  },
  {
    id: 'VR003',
    slug: 'pimiento',
    nombre: 'Pimientos Tricolores',
    categoria: 'verduras',
    tituloVista: 'Pimientos 1kg - $1500',
    precio: 1500,
    stock: 120,
    unidad: 'KG',
    cardImage: '/imagenes/Pimientos.jpeg',
    imagenes: [
      '/imagenes/pimentao_36408.webp',
      '/imagenes/pimenton-relleno-griego (1).jpg',
      '/imagenes/pimentones.jpeg',
    ],
    descripcion:
      'Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, estos pimientos añaden un toque vibrante y saludable a cualquier receta.',
  },
  {
    id: 'PO001',
    slug: 'miel',
    nombre: 'Miel Orgánica',
    categoria: 'organicos',
    tituloVista: 'Miel Orgánica 1 Frasco - $5000',
    precio: 5000,
    stock: 50,
    unidad: 'Frasco',
    cardImage: '/imagenes/miel organica.jpg',
    imagenes: [
      '/imagenes/meilbioflora-diferencias-entre-miel-tradicional-y-meil-organica.webp',
      '/imagenes/1140-honeydrizzledonfood-esp.jpg',
      '/imagenes/miel organica.jpg',
    ],
    descripcion:
      'Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.',
  },
  {
    id: 'PL001',
    slug: 'leche',
    nombre: 'Leche Entera',
    categoria: 'lacteos',
    tituloVista: 'Leche Entera 1 Lt - $1100',
    precio: 1100,
    stock: 100,
    unidad: 'Lt',
    cardImage: '/imagenes/leche entera.jpg',
    imagenes: ['/imagenes/la-leche-enteraa.webp', '/imagenes/leches.jpg', '/imagenes/leche17231905451710.webp'],
    descripcion:
      'La leche entera es un importe aporte de nutrientes esenciales tales como el calcio, proteína de alta calidad biológica, vitaminas A, D y del complejo B.',
  },
  {
    id: 'PO003',
    slug: 'quinoa',
    nombre: 'Quinoa',
    categoria: 'organicos',
    tituloVista: 'Quinoa 1kg - $5000',
    precio: 5000,
    stock: 200,
    unidad: 'KG',
    cardImage: '/imagenes/Quinoa.jpg',
    imagenes: ['/imagenes/tiposquinoa.jpg', '/imagenes/quinoaplanta.jpg', '/imagenes/quinoaarroz.jpg'],
    descripcion:
      'Cereal con alta proporción de proteínas y aminoácidos eseciales que favorecen su asimilación. Además, es rica en minerales esencial, como el hierro, magnesio, fósforo, manganeso, zinc, cobre y potasio. También es un aporte de vitamina B2 y B3.',
  },
]

export function getProductoBySlug(slug) {
  return productos.find((p) => p.slug === slug)
}

export function getProductosPorCategoria(categoria) {
  return productos.filter((p) => p.categoria === categoria)
}

export function getOtrosProductos(slugActual, cantidad = 6) {
  return productos.filter((p) => p.slug !== slugActual).slice(0, cantidad)
}
