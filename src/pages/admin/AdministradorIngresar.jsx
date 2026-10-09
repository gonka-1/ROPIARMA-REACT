import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/style-usuario.css'
import App_alert from '../../components/alerts/alert'

export default function AdministradorIngresar() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [mostrarAlert, setMostrarAlert] = useState(false)
  const [msgAlert, setMsgAlert] = useState('')
  const [variantAlert, setVarianAlert] = useState('danger')

  function mostrarMensaje(mensaje, variant = 'danger') {
    setMsgAlert(mensaje)
    setVarianAlert(variant)
    setMostrarAlert(true)
  }

  useEffect(() => {
    document.title = 'Ingresar'
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    const correo = email.trim()
    const pass = password

    if (!correo.includes('@') || !correo.includes('.') || correo.length <= 8) {
      mostrarMensaje('El correo no cumple con los requisitos.')
      return
    }

    if (pass.length < 8 || !/[A-Z]/.test(pass) || !/[0-9]/.test(pass)) {
      mostrarMensaje('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.')
      return
    }

    mostrarMensaje('Bienvenido, administrador', 'success')
    setTimeout(() => navigate('/admin'),1500)

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
          <h2>Ingresar</h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label>Contraseña</label>
              <div className="input-group">
                <input
                  type={mostrarPassword ? 'text' : 'password'}
                  className="form-control"
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button className="btn btn-outline-secondary" type="button" onClick={() => setMostrarPassword((v) => !v)}>
                  <i className={`bi ${mostrarPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </div>
            <div className="contenedor-boton">
              <button type="submit" className="btn btn-relieve">Ingresar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
