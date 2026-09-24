import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import { CATEGORIAS, getProductosPorCategoria } from '../data/productos'
import '../styles/style-productos.css'

export default function ProductosCategoria() {
  const { categoria } = useParams()

  useEffect(() => {
    document.title = 'Productos'
  }, [])

  if (!CATEGORIAS[categoria]) {
    return <Navigate to="/categorias" replace />
  }

  const lista = getProductosPorCategoria(categoria)

  return (
    <div className="contenedor">
      <div className="row row-cols-4 row-cols-md-5 justify-content-center g-3">
        {lista.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  )
}
