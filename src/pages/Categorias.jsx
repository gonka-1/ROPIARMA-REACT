import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIAS } from '../data/productos'
import '../styles/style-categorias.css'

const DESCRIPCIONES = {
  frutas:
    'Nuestra selección de frutas frescas ofrece una experiencia directa del campo a tu hogar. Estas frutas se cultivan y cosechan en el punto óptimo de madurez para asegurar su sabor y frescura. Disfruta de una variedad de frutas de temporada que aportan vitaminas y nutrientes esenciales a tu dieta diaria. Perfectas para consumir solas, en ensaladas o como ingrediente principal en postres y smoothies.',
  verduras:
    'Descubre nuestra gama de verduras orgánicas, cultivadas sin el uso de pesticidas ni químicos, garantizando un sabor auténtico y natural. Cada verdura es seleccionada por su calidad y valor nutricional, ofreciendo una excelente fuente de vitaminas, minerales y fibra. Ideales para ensaladas, guisos y platos saludables, nuestras verduras orgánicas promueven una alimentación consciente y sostenible.',
  organicos:
    'Nuestros productos orgánicos están elaborados con ingredientes naturales y procesados de manera responsable para mantener sus beneficios saludables. Desde aceites y miel hasta granos y semillas, ofrecemos una selección que apoya un estilo de vida saludable y respetuoso con el medio ambiente. Estos productos son perfectos para quienes buscan opciones alimenticias que aporten bienestar sin comprometer el sabor ni la calidad.',
  lacteos:
    'Los productos lácteos de HuertoHogar provienen de granjas locales que se dedican a la producción responsable y de calidad. Ofrecemos una gama de leches, yogures y otros derivados que conservan su frescura y sabor auténtico. Ricos en calcio y nutrientes esenciales, nuestros lácteos son perfectos para complementar una dieta equilibrada, proporcionando el mejor sabor y nutrición para toda la familia.',
}

export default function Categorias() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Categorías'
  }, [])

  return (
    <div className="contenedor-cards">
      <div className="row row-cols-1 row-cols-md-2 justify-content-center g-4">
        {Object.entries(CATEGORIAS).map(([slug, categoria]) => (
          <div className="col d-flex justify-content-center" key={slug}>
            <div className="card d-flex flex-column h-100 card-border-hover" style={{ width: '30rem', maxWidth: '100%' }}>
              <img src={categoria.imagen} className="card-img-top" alt={categoria.titulo} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{categoria.titulo}</h5>
                <p className="card-text mb-4">{DESCRIPCIONES[slug]}</p>
                <div className="contenedor-boton mt-auto">
                  <button onClick={() => navigate(`/productos/${slug}`)} className="btn btn-relieve">
                    Ver Productos
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
