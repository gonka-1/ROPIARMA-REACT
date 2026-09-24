import { useState } from 'react'
import { Link } from 'react-router-dom'

const CUPONES_SUSCRIPCION = ['HUERTITO10', 'FUJI123']

export default function Footer() {
  const [email, setEmail] = useState('')

  function suscribirse() {
    const correo = email.trim()
    if (correo.includes('@') && correo.includes('.') && correo.length >= 8) {
      const cupon = CUPONES_SUSCRIPCION[Math.floor(Math.random() * CUPONES_SUSCRIPCION.length)]
      alert('Gracias por suscribirte. Te asignamos el cupón ' + cupon + ' para tu siguiente compra')
      setEmail('')
    } else {
      alert('Correo no valido para la suscripción')
    }
  }

  return (
    <footer>
      <div className="footer-contendor">
        <div className="row">
          <div className="col">
            <div className="logoFooter">
              <img src="/imagenes/LogoHuertoHogar.png" alt="Logo Huerto Hogar" style={{ width: '200px', height: 'auto' }} />
            </div>
            <p className="descripcion-huerto" style={{ fontSize: '15px' }}>
              Productos agrícolas de calidad, directamente para tu hogar.
            </p>
          </div>

          <div className="col">
            <h4 className="titulos">Categorías</h4>
            <ul>
              <li><Link to="/productos/frutas">Frutas Frescas</Link></li>
              <li><Link to="/productos/verduras">Verduras Orgánicas</Link></li>
              <li><Link to="/productos/organicos">Frutas Secas</Link></li>
              <li><Link to="/productos/lacteos">Productos Lácteos</Link></li>
            </ul>
          </div>

          <div className="col">
            <h4 className="titulos">Contacto</h4>
            <ul>
              <li>Dirección: Emco 4780, San Joaquín, Santiago</li>
              <li>Teléfono: +56 9 1234 5678</li>
              <li>Email: info@huertohogar.cl</li>
            </ul>
          </div>

          <div className="col">
            <h4 className="titulos">Nutre tu día</h4>
            <p className="titulo-correo">Obtén beneficios por tu suscripción</p>
            <input
              type="email"
              className="form-control"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={suscribirse} type="button" className="btn btn-success">Suscribirse</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
