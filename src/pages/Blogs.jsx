import { useEffect } from 'react'
import '../styles/style-blog.css'

const RECETAS = [
  {
    href: 'https://www.gourmet.cl/recetas/pimentones-rellenos/',
    img: '/imagenes/pimentones-rellenos3.jpg',
    alt: 'Pimenton receta',
    titulo: 'Pimientos Poblanos Rellenos',
    texto: 'El balance perfecto entre el toque ahumado del chile asado, un relleno jugoso y queso derretido en su punto. El clásico reconfortante que conquistará tu mesa.',
  },
  {
    href: 'https://www.gourmet.cl/recetas/pastel-de-manzanas/',
    img: '/imagenes/tarta-invisible-de-manzana.webp',
    alt: 'PastelManzana',
    titulo: 'Pastel de manzana',
    texto: 'Masa suave y esponjosa, manzanas caramelizadas. El aroma dulce que convertirá tu merienda en el mejor momento del día.',
  },
  {
    href: 'https://www.gourmet.cl/recetas/timbal-de-quinoa/',
    img: '/imagenes/timbal.jpg',
    alt: 'RecetaQuinoa',
    titulo: 'Timbal de Quínoa',
    texto: 'Capas de quínoa suave, vegetales frescos y texturas crujientes que entran por los ojos. Una presentación elegante, fresca y llena de nutrientes para lucirte sin complicarte.',
  },
]

const NOTICIAS = [
  {
    img: '/imagenes/Noticia1Pajaros.jpg',
    alt: 'DisiparPajaros',
    titulo: 'Cómo disipar a los pájaros de los huertos con ecosoluciones',
    href: 'https://www.diariofutrono.cl/noticia/agro-y-ganaderia/2024/11/como-disipar-a-los-pajaros-de-los-huertos-con-ecosoluciones',
  },
  {
    img: '/imagenes/Noticia2.jpeg',
    alt: 'muejeres rurales',
    titulo: 'Mujeres rurales de Hidalgo reciben huertos, aves y equipamiento para impulsar su economía',
    href: 'https://www.effeta.info/mujeres-rurales-de-hidalgo-reciben-huertos-aves-y-equipamiento-para-impulsar-su-economia/',
  },
  {
    img: '/imagenes/noticia3.webp',
    alt: 'cultivos mundiales',
    titulo: 'Los 5 cultivos a nivel mundial que requieren más agua para su producción (y su impacto en las comunidades y el medio ambiente)',
    href: 'https://www.bbc.com/mundo/articles/cn4y2nk5887o',
  },
]

export default function Blogs() {
  useEffect(() => {
    document.title = 'Blogs'
  }, [])

  return (
    <div className="colorFondoBlogs">
      <div className="tituloBlogs">
        <h1>Información interesantes para ti</h1>
      </div>
      <div className="subtituloRecetas">
        <h3>Recetas que puedas hacer con nuestros productos</h3>
      </div>
      <div className="carruselBlogs">
        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval="3000">
          <div className="carousel-indicators">
            {RECETAS.map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to={i}
                className={i === 0 ? 'active' : ''}
                aria-current={i === 0 ? 'true' : undefined}
                aria-label={`Slide ${i + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {RECETAS.map((receta, i) => (
              <div className={`carousel-item${i === 0 ? ' active' : ''}`} key={receta.titulo}>
                <a href={receta.href} target="_blank" rel="noopener noreferrer">
                  <img src={receta.img} className="d-block w-100" alt={receta.alt} />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>{receta.titulo}</h5>
                    <p>{receta.texto}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="subtituloNoticias">
        <h3>Noticias que podrían interesarte</h3>
      </div>

      <div className="tarjetasBlogs">
        {NOTICIAS.map((noticia) => (
          <div className="card card-noticia" key={noticia.titulo}>
            <img src={noticia.img} className="card-img-top" alt={noticia.alt} />
            <div className="card-body">
              <h5 className="card-title">{noticia.titulo}</h5>
              <a href={noticia.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Saber más</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
