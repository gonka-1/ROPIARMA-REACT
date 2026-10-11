import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession, obtenerNombreUsuario } from '../../context/SessionContext'
import '../../styles/style-usuario.css'
import App_alert from '../../components/alerts/alert'

export default function UsuarioIngresar() {
  const navigate = useNavigate()
  const { user, login, getTempRegistration } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [mostrarAlert, setMostrarAlert] = useState(false)
  const [msgAlert, setMsgAlert] = useState('')
  const [variantAlert, setVariantAlert] = useState('danger')

  useEffect(() => {
    document.title = 'Ingresar - Huerto Hogar'
  }, [])

  function mostrarMensaje(mensaje, variant = 'danger') {
    setMsgAlert(mensaje)
    setVariantAlert(variant)
    setMostrarAlert(true)
  }

  function handleSubmit(e) {
    e.preventDefault()

    const correo = email.trim()
    const pass = password.trim()

    if (!correo || !pass) {
      mostrarMensaje('Por favor, ingresa tu correo y contraseña para ingresar')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      mostrarMensaje('Por favor, ingresa un correo electrónico válido (ejemplo: nombre@dominio.com)')
      return
    }

    const tieneMinuscula = /[a-z]/.test(pass)
    const tieneMayuscula = /[A-Z]/.test(pass)
    const tieneNumero = /[0-9]/.test(pass)
    const tieneEspacios = /\s/.test(pass)

    if (pass.length < 8) return mostrarMensaje('La contraseña debe tener al menos 8 caracteres')
    if (pass.length > 16) return mostrarMensaje('La contraseña no puede tener más de 16 caracteres')
    if (tieneEspacios) return mostrarMensaje('La contraseña no puede contener espacios')
    if (!tieneMinuscula || !tieneMayuscula || !tieneNumero) {
      return mostrarMensaje('La contraseña debe incluir al menos una letra mayúscula, una letra minúscula y un número')
    }

    const registroTemp = getTempRegistration()
    const esAdmin = correo === 'admin@huertohogar.cl'

    const datosBase = user && user.email === correo
      ? user
      : { 
          nombre: esAdmin ? 'Administrador' : obtenerNombreUsuario(correo, registroTemp && registroTemp.nombre),
          role: esAdmin ? 'admin' : 'user'
        }

    login({ ...datosBase, email: correo })

    mostrarMensaje(esAdmin ? '¡Bienvenido Administrador!' : '¡Bienvenido de nuevo!', 'success')
    
    setTimeout(() => {
      if (esAdmin) {
        navigate('/admin/inventario')
      } else {
        navigate('/')
      }
    }, 1500)
  }

  return (
    <>
      <App_alert
        mostrarAlert={mostrarAlert}
        cerrarAlert={() => setMostrarAlert(false)}
        variant={variantAlert}
        msgAlert={msgAlert}
      />
      <div className="container my-5 d-flex justify-content-center align-items-center" style={{ minHeight: '65vh' }}>
        <div className="w-100" style={{ maxWidth: '450px' }}>
          
          {/* Contenedor tipo Tarjeta */}
          <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 bg-white">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark m-0">Ingresar</h2>
              <p className="text-muted small mt-1">Inicia sesión en tu cuenta de Huerto Hogar</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label fw-semibold text-dark small">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-dark small">Contraseña</label>
                <div className="input-group">
                  <input
                    type={mostrarPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="••••••••"
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setMostrarPassword((v) => !v)}
                  >
                    <i
                      className={`bi ${
                        mostrarPassword ? "bi-eye-slash" : "bi-eye"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>

              <div className="contenedor-boton mb-3">
                <button type="submit" className="btn btn-relieve w-100 py-2 fs-6 fw-bold">
                  Ingresar
                </button>
              </div>
            </form>

            {/* Recuadro informativo de credenciales de prueba */}
            <div className="alert alert-info border-0 rounded-3 p-3 mt-3 mb-0 small">
              <p className="fw-bold mb-1 text-dark">🔑 Accesos de prueba:</p>
              <ul className="mb-0 ps-3 text-muted">
                <li>
                  <b>Admin:</b> <code>admin@huertohogar.cl</code> / <code>Admin123</code>
                </li>
                <li>
                  <b>Cliente:</b> <code>cliente@huertohogar.cl</code> / <code>Cliente123</code>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}