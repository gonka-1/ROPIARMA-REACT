import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSession } from '../../context/SessionContext'
import '../../styles/style-usuario.css'
import App_alert from '../../components/alerts/alert' 

export default function UsuarioConf() {
  const navigate = useNavigate()
  const { login, getTempRegistration, clearTempRegistration } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [mostrarAlert, setMostrarAlert] = useState(false)
  const [msgAlert, setMsgAlert] = useState('')
  const [variantAlert, setVarianAlert] = useState('danger')

  function mostrarMensaje(mensaje, variant = 'danger'){
    setMsgAlert(mensaje)
    setVarianAlert(variant)
    setMostrarAlert(true)
  }

  useEffect(() => {
    document.title = 'Ingresar'
  }, [])

  const registroTemp = getTempRegistration()
  if (!registroTemp) {
    return <Navigate to="/usuario/crear" replace />
  }

  function handleSubmit(e) {
    e.preventDefault()

    const correo = email.trim()
    const pass = password.trim()

    if (!correo || !pass) {
      mostrarMensaje('Por favor, ingresa correo y contraseña')
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

    login({ ...registroTemp, email: correo })

    mostrarMensaje('¡Usuario creado con éxito!', 'success')
    setTimeout(() => {
      navigate('/')
      clearTempRegistration()
    }, 1500)
  }
  

  return (
    <div className="container my-5 position-relative">
      <App_alert
        mostrarAlert={mostrarAlert}
        cerrarAlert={() => setMostrarAlert(false)}
        variant={variantAlert}
        msgAlert={msgAlert}
      />
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2>Últimos pasos</h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                placeholder="ejemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <div className="input-group">
                <input
                  type={mostrarPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Crea tu contraseña"
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
                  <i className={`bi ${mostrarPassword ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                </button>
              </div>
              <div className="form-text">
                La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y un número.
              </div>

              <div className="contenedor-boton">
                <button type="submit" className="btn btn-relieve">
                  Crear usuario
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
