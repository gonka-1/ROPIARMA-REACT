import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSession } from '../../context/SessionContext'
import Formulario from '../../components/formulario/Formulario'
import { validarEmail, validarPassword } from '../../utils/validaciones'
import '../../styles/style-usuario.css'

const CAMPOS = [
  { nombre: 'email', etiqueta: 'Correo electrónico', tipo: 'email', placeholder: 'ejemplo@email.com', requerido: true },
  {
    nombre: 'password', etiqueta: 'Contraseña', tipo: 'password', placeholder: 'Crea tu contraseña', minLength: 8, requerido: true,
    ayuda: 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y un número.',
  },
]

export default function UsuarioConf() {
  const navigate = useNavigate()
  const { login, getTempRegistration, clearTempRegistration } = useSession()

  useEffect(() => {
    document.title = 'Ingresar'
  }, [])

  const registroTemp = getTempRegistration()
  if (!registroTemp) {
    return <Navigate to="/usuario/crear" replace />
  }

  function validar(v) {
    return validarEmail(v.email) || validarPassword(v.password)
  }

  function crearUsuario(v, { mostrarMensaje }) {
    login({ ...registroTemp, email: v.email.trim() })

    mostrarMensaje('¡Usuario creado con éxito!', 'success')
    setTimeout(() => {
      navigate('/')
      clearTempRegistration()
    }, 1500)
  }

  return (
    <div className="container my-5 position-relative">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2>Últimos pasos</h2>
          <Formulario
            campos={CAMPOS}
            validar={validar}
            onEnviar={crearUsuario}
            msgRequeridos="Por favor, ingresa correo y contraseña"
            textoBoton="Crear usuario"
          />
        </div>
      </div>
    </div>
  )
}
