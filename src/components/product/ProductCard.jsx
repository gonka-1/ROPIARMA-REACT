import { useNavigate } from 'react-router-dom'

export default function ProductCard({ producto }) {
  const navigate = useNavigate()

  return (
    <div className="col-auto d-flex">
      <div className="card d-flex flex-column h-100 card-border-hover" style={{ width: '20rem' }}>
        <img src={producto.cardImage} className="card-img-top" alt={producto.nombre} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text corta-texto mb-4">{producto.descripcion}</p>
          <div className="contenedor-boton mt-auto">
            <button onClick={() => navigate(`/producto/${producto.slug}`)} className="btn btn-relieve">
              Ver Producto
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
