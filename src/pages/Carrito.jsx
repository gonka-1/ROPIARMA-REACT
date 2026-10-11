import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import '../styles/style-carrito.css'
import App_alert from '../components/alerts/alert'

function formatoPrecio(valor) {
  return '$' + (valor || 0).toLocaleString('es-CL')
}

export default function Carrito() {
  const { items, changeQty, removeItem, clear, applyCoupon, couponMessage, subtotal, discountAmount, total } = useCart()
  const [cupon, setCupon] = useState('')
  const navigate = useNavigate()
  const [mostrarAlert, setMostrarAlert] = useState(false)
  const [msgAlert, setMsgAlert] = useState('')
  const [variantAlert, setVariantAlert] = useState('success')

  function mostrarMensaje(mensaje, variant = 'success') {
    setMsgAlert(mensaje)
    setVariantAlert(variant)
    setMostrarAlert(true)
  }

  useEffect(() => {
    document.title = 'Carrito - Huerto Hogar'
  }, [])

  function handleComprar() {
    if (items.length === 0) {
      mostrarMensaje('Tu carrito está vacío. Agrega productos antes de continuar.', 'danger')
      return
    }
    mostrarMensaje('¡Muchas gracias por tu compra en Huerto Hogar!', 'success')
    clear()
    setCupon('')
    setTimeout(() => navigate('/'), 1500)
  }

  function handleVaciar() {
    if (items.length === 0) return
    clear()
    setCupon('')
    mostrarMensaje('Carrito vaciado', 'warning')
  }

  function handleEliminar(indice, nombre) {
    removeItem(indice)
    mostrarMensaje(`${nombre} eliminado del carrito`, 'warning')
  }

  return (
    <div className="container my-5">
      <App_alert
        mostrarAlert={mostrarAlert}
        cerrarAlert={() => setMostrarAlert(false)}
        variant={variantAlert}
        msgAlert={msgAlert}
      />

      <div className="row g-4 align-items-start">
        {/* Columna Izquierda: Productos alineados de arriba hacia abajo */}
        <div className="col-lg-8">
          {items.length === 0 ? (
            <div className="card border-0 shadow-sm p-5 text-center text-muted rounded-4">
              <h5>Tu carrito está vacío</h5>
              <p className="mb-0">Agrega productos desde la tienda para verlos aquí.</p>
            </div>
          ) : (
            <div 
              className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-column justify-content-start gap-3"
              style={{ minHeight: 'auto', backgroundColor: '#FFF3E0' }}
            >
              {/* Encabezado */}
              <h5 className="fw-bold mb-2 text-dark border-bottom pb-2">
                Productos en el Carrito
              </h5>

              {/* Lista compacta de ítems */}
              <div className="d-flex flex-column gap-3">
                {items.map((item, indice) => (
                  <div
                    className="card border-0 shadow-sm p-3 rounded-3 bg-white"
                    key={item.id}
                    style={{ height: 'auto' }}
                  >
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                      
                      {/* Información del Producto */}
                      <div style={{ minWidth: '160px' }}>
                        <h6 className="fw-bold mb-1 text-dark">{item.nombre}</h6>
                        <span className="text-muted small">
                          {formatoPrecio(item.precio)} / {item.unidad}
                        </span>
                      </div>

                      {/* Controles de Cantidad */}
                      <div className="d-flex align-items-center border rounded-3 px-2 py-1 bg-light">
                        <button
                          className="btn btn-sm border-0 px-2 fw-bold text-dark"
                          onClick={() => changeQty(indice, -1)}
                        >
                          -
                        </button>
                        <span className="px-3 fw-bold small">
                          {item.cantidad} {item.unidad}
                        </span>
                        <button
                          className="btn btn-sm border-0 px-2 fw-bold text-dark"
                          onClick={() => changeQty(indice, 1)}
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal por ítem y Botón Eliminar */}
                      <div className="d-flex align-items-center gap-3">
                        <span className="fw-bold fs-5 text-dark">
                          {formatoPrecio(item.precio * item.cantidad)}
                        </span>
                        <button
                          className="btn btn-link text-danger p-0 border-0 fs-5 text-decoration-none"
                          onClick={() => handleEliminar(indice, item.nombre)}
                          title="Eliminar producto"
                        >
                          ✕
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Columna Derecha: Resumen de Compra */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white" style={{ height: 'auto' }}>
            <h5 className="fw-bold mb-4 text-dark border-bottom pb-2">Resumen de compra</h5>
            
            <div className="d-flex justify-content-between align-items-center mb-2 text-muted">
              <span>Productos</span>
              <span className="fw-semibold text-dark">{formatoPrecio(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="d-flex justify-content-between align-items-center mb-2 text-success">
                <span>Descuento</span>
                <span className="fw-semibold">-{formatoPrecio(discountAmount)}</span>
              </div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-3 text-muted">
              <span>Envío</span>
              <span className="text-success fw-semibold">Gratis</span>
            </div>

            <hr className="my-3" />

            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="fw-bold fs-5 text-dark">Total</span>
              <span className="fw-bold fs-3 text-success">{formatoPrecio(total)}</span>
            </div>

            {/* Cupón */}
            <div className="mb-4">
              <label className="form-label text-muted small mb-2">
                Ingrese el cupón de descuento
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: DESCUENTO10"
                  value={cupon}
                  onChange={(e) => setCupon(e.target.value)}
                />
                <button
                  className="btn btn-outline-success text-uppercase fw-semibold"
                  type="button"
                  onClick={() => applyCoupon(cupon)}
                >
                  Aplicar
                </button>
              </div>
              {couponMessage && (
                <small
                  className={`d-block mt-2 small ${
                    couponMessage.tipo === 'exito' ? 'text-success' : 'text-danger'
                  }`}
                >
                  {couponMessage.texto}
                </small>
              )}
            </div>

            {/* Acciones */}
            <button
              className="btn btn-success w-100 py-3 fw-bold rounded-3 mb-2"
              onClick={handleComprar}
              style={{ backgroundColor: '#2E8B57', borderColor: '#2E8B57' }}
            >
              Continuar compra
            </button>
            <button
              className="btn btn-link text-danger w-100 text-decoration-none btn-sm"
              onClick={handleVaciar}
            >
              Vaciar carrito
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}