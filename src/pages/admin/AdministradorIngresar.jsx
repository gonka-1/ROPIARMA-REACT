import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/style-usuario.css'

export default function AdministradorIngresar() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)

  useEffect(() => {
    document.title = 'Ingresar'
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    const correo = email.trim()
    const pass = password

    if (!correo.includes('@') || !correo.includes('.') || correo.length <= 8) {
      alert('El correo no cumple con los requisitos.')
      return
    }

    if (pass.length < 8 || !/[A-Z]/.test(pass) || !/[0-9]/.test(pass)) {
      alert('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.')
      return
    }

    navigate('/admin')
  }

  return (
    <div className="container my-5 position-relative">
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
