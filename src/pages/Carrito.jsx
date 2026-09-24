import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import '../styles/style-carrito.css'

export default function Carrito() {
  const { items, changeQty, removeItem, clear, applyCoupon, couponMessage, subtotal, discountAmount, total } = useCart()
  const [cupon, setCupon] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Carrito'
  }, [])

  function handleComprar() {
    if (items.length === 0) {
      alert('Tu carrito está vacio. Agrega productos antes de continuar.')
      return
    }
    alert('Muchas gracias por tu compra en Huerto-Hogar!!')
    clear()
    setCupon('')
    navigate('/')
  }

  function handleVaciar() {
    clear()
    setCupon('')
  }

  return (
    <div className="container my-4">
      <div className="row g-4">
        <div className="col-lg-8">
          {items.length === 0 ? (
            <div className="card corder-0 shadow-sm p-4 text-center text-muted">
              Tu carrito vacío.
            </div>
          ) : (
            items.map((item, indice) => (
              <div className="card border-0 shadow-sm p-3 mb-3 rounded-3" key={item.id}>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div>
                    <h6 className="fw-bold mb-1">{item.nombre}</h6>
                    <span className="text-muted small">${item.precio} / {item.unidad}</span>
                  </div>
                  <div className="d-flex align-items-center border rounded-2 px-2 py-1">
                    <button className="btn btn-sm border-0 px-2" onClick={() => changeQty(indice, -1)}>-</button>
                    <span className="px-3 fw-bold">{item.cantidad} {item.unidad}</span>
                    <button className="btn btn-sm border-0 px-2" onClick={() => changeQty(indice, 1)}>+</button>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className="fw-bold fs-5">${item.precio * item.cantidad}</span>
                    <button className="btn btn-link text-danger p-0 border-0" onClick={() => removeItem(indice)}>
                      ❌
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 rounded-3 card">
            <h5 className="fw-bold mb-3 fs-6">Resumen de compra</h5>
            <div className="d-flex justify-content-between mb-2 text-muted">
              <span>Productos</span>
              <span>${subtotal}</span>
            </div>
            {discountAmount > 0 && (
              <div className="d-flex justify-content-between mb-2 text-success">
                <span>Descuento</span>
                <span>-${discountAmount}</span>
              </div>
            )}
            <div className="d-flex justify-content-between mb-3 text-muted">
              <span>Envío</span>
              <span className="text-success fw-semibold">Gratis</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold fs-5">Total</span>
              <span className="fw-bold fs-4 text-dark">${total}</span>
            </div>
            <div className="mb-3">
              <label className="form-label text-muted small mb-1">Ingrese el cupón de descuento</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={cupon}
                  onChange={(e) => setCupon(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary text-uppercase fw-semibold"
                  type="button"
                  onClick={() => applyCoupon(cupon)}
                >
                  Aplicar
                </button>
              </div>
              {couponMessage && (
                <small className={`d-block mt-1 small ${couponMessage.tipo === 'exito' ? 'text-success' : 'text-danger'}`}>
                  {couponMessage.texto}
                </small>
              )}
            </div>
            <button className="btn btn-primary w-100 py-2 fw-semibold" onClick={handleComprar}>
              Continuar compra
            </button>
            <button className="btn btn-link text-danger w-100 mt-2 text-decoration-none btn-sm" onClick={handleVaciar}>
              Vaciar carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
