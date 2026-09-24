import { useEffect } from 'react'
import ProductCard from '../components/product/ProductCard'
import { productos } from '../data/productos'
import '../styles/style.css'

const DESTACADOS = ['leche', 'quinoa', 'pimiento', 'espinaca', 'platano', 'naranja', 'zanahoria']

export default function Principal() {
  const destacados = DESTACADOS.map((slug) => productos.find((p) => p.slug === slug)).filter(Boolean)

  useEffect(() => {
    document.title = 'Huerto Hogar'
  }, [])

  return (
    <div className="colorFondo">
      <div className="tituloInicio">
        <h1>Bienvenidos a Huerto Hogar</h1>
      </div>

      <div className="carruselInicio">
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/imagenes/manzanas.jpg" className="d-block w-100 img-carousel" alt="Manzanas Fuji" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Manzanas Fuji</h5>
                <p>Crujientes y dulces, cultivadas en el Valle del Maule.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/imagenes/naranja.jpeg" className="d-block w-100 img-carousel" alt="Naranaja Valencia" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Naranja Valencia</h5>
                <p>Jugosas y ricas en vitamina, cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad. C</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/imagenes/1140-honeydrizzledonfood-esp.jpg" className="d-block w-100 img-carousel" alt="Miel" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Miel Orgánica</h5>
                <p>Pura y orgánica producida por apicultores locales.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="cartasInicio">
        {destacados.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  )
}
