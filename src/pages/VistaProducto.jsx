import { useEffect, useState } from 'react'
import App_alert from '../components/alerts/alert'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getProductoBySlug, getOtrosProductos } from '../data/productos'
import { useCart } from '../context/CartContext'
import ReviewsSection from '../components/product/ReviewsSection'
import '../styles/style-vistaProducto.css'

export default function VistaProducto() {
  const { slug } = useParams()
  const producto = getProductoBySlug(slug)
  const { addToCart, cantidadEnCarrito } = useCart()
  const [cantidad, setCantidad] = useState(1)
  const [mostrarAlert, setMostrarAlert] = useState(false)
  const [msgAlert, setMsgAlert] = useState('')
  const [variantAlert, setVariantAlert] = useState('success')

  useEffect(() => {
    if (producto) document.title = producto.nombre
  }, [producto])

  useEffect(() => {
    setCantidad(1)
  }, [slug])

  if (!producto) {
    return <Navigate to="/categorias" replace />
  }

  // Corrección de la variable stockDisponible
  const stockDisponible = producto.stock - cantidadEnCarrito(producto.id)
  const otros = getOtrosProductos(producto.slug)

  function handleAgregar() {
    if (stockDisponible <= 0 || cantidad <= 0 || cantidad > stockDisponible) {
      setMsgAlert('Sin stock disponible. No hay suficiente stock para esa cantidad.')
      setVariantAlert('danger')
      setMostrarAlert(true)
      return
    }
    addToCart(producto, cantidad)
    // Corrección de la plantilla del mensaje de alerta
    setMsgAlert(`Agregaste ${cantidad} ${producto.unidad} al carrito. Quedan ${stockDisponible - cantidad} ${producto.unidad} en stock`)
    setVariantAlert('success')
    setMostrarAlert(true)
    setCantidad(1)
  }

  return (
    <div className="container my-4">
      <App_alert
        mostrarAlert={mostrarAlert}
        cerrarAlert={() => setMostrarAlert(false)}
        variant={variantAlert}
        msgAlert={msgAlert}
      />

      <div className="row">
        <div className="col-6">
          <div className="texto">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                <li className="breadcrumb-item"><Link to={`/productos/${producto.categoria}`}>Productos</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Vista Productos</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="col-6">
          <div className="contendedor-producto">
            <h2 className="tituloProduto">{producto.tituloVista}</h2>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div id="carouselExampleSlidesOnly" className="carousel slide carusel" data-bs-ride="carousel">
            <div className="carousel-inner">
              {producto.imagenes.map((img, i) => (
                <div className={`carousel-item${i === 0 ? ' active' : ''}`} key={img}>
                  <img src={img} className="d-block w-100 img-carousel" alt={producto.nombre} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="text-success descripcion">
            <hr className="border border-dark border-2 opacity-50 Linea" />
            <p className="DescripcionProducto">{producto.descripcion}</p>
            <hr className="border border-dark border-3 opacity-75 Linea" />
          </div>
          <div className="contenedor-opciones">
            <h6 className="fw-bold m-0">Stock disponible</h6>
            <div className="d-flex align-items-center gap-2">
              <span>Cantidad:</span>
              <select
                className="form-select selector w-auto"
                aria-label="Seleccionar cantidad"
                disabled={stockDisponible <= 0}
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
              >
                {stockDisponible <= 0 ? (
                  <option value="0">Sin stock</option>
                ) : (
                  Array.from({ length: stockDisponible }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n} {producto.unidad}</option>
                  ))
                )}
              </select>
              <span className="text-muted small">(+{stockDisponible} {producto.unidad} disponibles)</span>
            </div>
            <button type="button" className="btn btn-relieve btn-guardar" onClick={handleAgregar}>
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>

      <hr className="border border-dark border-3 opacity-75 Linea my-5" />

      <div className="Otros mb-3">
        <h3>Otros Productos</h3>
      </div>

      {/* Estructura Grid Limpia para Otros Productos */}
      <div className="row g-3">
        {otros.map((op) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={op.id}>
            <div className="card h-100 border-0 shadow-sm p-2 text-center">
              <img
                src={op.cardImage}
                className="card-img-top rounded-3"
                alt={op.nombre}
                style={{ height: '120px', objectFit: 'cover', width: '100%' }}
              />
              <div className="card-body p-2 d-flex flex-column justify-content-between">
                <h6 className="card-title fw-bold my-2" style={{ fontSize: '0.9rem' }}>{op.nombre}</h6>
                <Link to={`/producto/${op.slug}`} className="btn btn-relieve btn-sm w-100 mt-auto">
                  Ver Producto
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ReviewsSection productId={producto.id} />
    </div>
  )
}