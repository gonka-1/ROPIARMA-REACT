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
    document.title = 'Ingresar'
  }, [])

  function mostrarMensaje(mensaje, variant = 'danger'){
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
    const datosBase = user && user.email === correo
      ? user
      : { nombre: obtenerNombreUsuario(correo, registroTemp && registroTemp.nombre) }

    login({ ...datosBase, email: correo })

    mostrarMensaje('¡Bienvenido de nuevo!', 'success')
    setTimeout(() =>navigate('/'), 1500)
  }

  return (
    <>
      <App_alert
        mostrarAlert={mostrarAlert}
        cerrarAlert={() => setMostrarAlert(false)}
        variant={variantAlert}
        msgAlert={msgAlert}
      />
      <div className="container my-5 position-relative">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2>Ingresar</h2>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Contraseña</label>
                <div className="input-group">
                  <input
                    type={mostrarPassword ? "text" : "password"}
                    className="form-control"
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
              <div className="contenedor-boton">
                <button type="submit" className="btn btn-relieve">
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
