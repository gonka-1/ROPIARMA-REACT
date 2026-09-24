import { useEffect } from 'react'
import { useSession } from '../context/SessionContext'
import '../styles/style-perfil.css'

export default function Perfil() {
  const { user } = useSession()

  useEffect(() => {
    document.title = 'Perfil'
  }, [])

  const nombreCompleto = user ? [user.nombre, user.apellido].filter(Boolean).join(' ') : ''
  const direccion = user?.calle ? `${user.calle}${user.numeracion ? ' #' + user.numeracion : ''}` : ''
  const ubicacion = user ? [user.comuna, user.ciudad, user.region].filter(Boolean).join(', ') : ''

  return (
    <div className="card card-perfil">
      <div className="card-body">
        <h5 className="card-title">{nombreCompleto || user?.nombre || 'Nombre Usuario'}</h5>
        <p className="card-subtitle text-muted mb-3">{user?.email || 'correo@ejemplo.com'}</p>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span>Teléfono</span>
          <span className="text-muted">{user?.telefono || '—'}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Dirección</span>
          <span className="text-muted">{direccion || '—'}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Ubicación</span>
          <span className="text-muted">{ubicacion || '—'}</span>
        </li>
      </ul>
    </div>
  )
}
