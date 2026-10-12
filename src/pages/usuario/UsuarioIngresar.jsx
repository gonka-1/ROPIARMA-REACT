import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession, obtenerNombreUsuario } from '../../context/SessionContext'
import Formulario from '../../components/formulario/Formulario'
import { validarEmail, validarPassword } from '../../utils/validaciones'
import '../../styles/style-usuario.css'

const CAMPOS = [
  { nombre: 'email', etiqueta: 'Correo electrónico', tipo: 'email', placeholder: 'ejemplo@correo.com', requerido: true },
  { nombre: 'password', etiqueta: 'Contraseña', tipo: 'password', placeholder: '••••••••', minLength: 8, requerido: true },
]

export default function UsuarioIngresar() {
  const navigate = useNavigate()
  const { user, login, getTempRegistration } = useSession()

  useEffect(() => {
    document.title = 'Ingresar - Huerto Hogar'
  }, [])

  function validar(v) {
    return validarEmail(v.email) || validarPassword(v.password)
  }

  function ingresar(v, { mostrarMensaje }) {
    const correo = v.email.trim()
    const registroTemp = getTempRegistration()
    const esAdmin = correo === 'admin@huertohogar.cl'

    const datosBase = user && user.email === correo
      ? user
      : {
          nombre: esAdmin ? 'Administrador' : obtenerNombreUsuario(correo, registroTemp && registroTemp.nombre),
          role: esAdmin ? 'admin' : 'user',
        }

    login({ ...datosBase, email: correo })

    mostrarMensaje(esAdmin ? '¡Bienvenido Administrador!' : '¡Bienvenido de nuevo!', 'success')
    setTimeout(() => navigate(esAdmin ? '/admin/inventario' : '/'), 1500)
  }

  return (
    <div className="container my-5 d-flex justify-content-center align-items-center" style={{ minHeight: '65vh' }}>
      <div className="w-100" style={{ maxWidth: '450px' }}>
        {/* Contenedor tipo Tarjeta */}
        <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 bg-white">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark m-0">Ingresar</h2>
            <p className="text-muted small mt-1">Inicia sesión en tu cuenta de Huerto Hogar</p>
          </div>

          <Formulario
            campos={CAMPOS}
            validar={validar}
            onEnviar={ingresar}
            msgRequeridos="Por favor, ingresa tu correo y contraseña para ingresar"
            textoBoton="Ingresar"
            claseEtiqueta="form-label fw-semibold text-dark small"
            claseContenedorBoton="mb-3"
            claseBoton="w-100 py-2 fs-6 fw-bold"
          />

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
  )
}
