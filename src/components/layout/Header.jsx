import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useSession } from '../../context/SessionContext'
import { obtenerNombreUsuario } from '../../context/SessionContext'

export default function Header() {
  const { count } = useCart()
  const { user, logout } = useSession()

  return (
    <header>
      <div className="cajaHeader">
        <nav className="navbar navbar-expand-lg barraMenu">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <i className="bi bi-house-fill icono-inicio"></i>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/categorias">Categorías</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/nosotros">Nosotros</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/ubicaciones">Ubicaciones</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/blogs">Blogs</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/seguimiento">Seguimiento</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="carrito">
            <Link className="carritoEmoji" to="/carrito">
              <div className="position-relative d-inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L1.01 2H.5a.5.5 0 0 1-.5-.5zM3.14 4l1.25 6h8.22l1.125-6H3.14zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <span
                  id="contadorCarrito"
                  className="position-absolute top-50 start-50 translate-middle fw-bold text-dark"
                  style={{ fontSize: '0.65rem', marginTop: '-3px', marginLeft: '2px', display: 'inline-block' }}
                >
                  {count}
                </span>
              </div>
            </Link>
          </div>

          <div className="logo dropdown">
            <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img height="60px" src="/imagenes/LogoPlanta.png" alt="logoPlanta" style={{ cursor: 'pointer' }} />
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              {user ? (
                <>
                  <li className="dropdown-header text-dark fw-bold border-bottom pb-2 mb-1">
                    👤 {user.nombre || obtenerNombreUsuario(user.email, '')}
                  </li>
                  <li><Link className="dropdown-item" to="/perfil">Perfil</Link></li>
                  <li><Link className="dropdown-item" to="/seguimiento">Mis pedidos</Link></li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        logout()
                      }}
                    >
                      Cerrar sesión
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li><Link className="dropdown-item" to="/usuario/ingresar">Ingresar</Link></li>
                  <li><Link className="dropdown-item" to="/usuario/crear">Crear usuario</Link></li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}
