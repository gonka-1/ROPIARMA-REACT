import { NavLink, Outlet } from 'react-router-dom'
import '../../styles/style-administrador.css'

export default function AdminLayout() {
  return (
    <div className="d-flex vh-100 overflow-hidden bg-light">
      <aside className="d-flex flex-column p-3 bg-white border-end shadow-sm" style={{ width: '260px' }}>
        <div className="text-center mb-4 mt-2">
          <img src="/imagenes/LogoHuertoHogar.png" alt="Logo" className="rounded-circle" width="150" height="110" style={{ objectFit: 'contain' }} />
        </div>

        <ul className="nav nav-pills flex-column mb-auto gap-1">
          <li className="nav-item">
            <NavLink end to="/admin" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <i className="bi bi-grid-1x2 me-2"></i> Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/ordenes" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <i className="bi bi-box-seam me-2"></i> Órdenes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/inventario" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <i className="bi bi-boxes me-2"></i> Inventario
            </NavLink>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link"><i className="bi bi-bar-chart me-2"></i> Reportes</a>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/empleados" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <i className="bi bi-person-badge me-2"></i> Empleados
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/clientes" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <i className="bi bi-people me-2"></i> Clientes
            </NavLink>
          </li>
        </ul>

        <hr className="text-secondary my-3" />

        <ul className="nav nav-pills flex-column mb-3 gap-1">
          <li className="nav-item"><a href="#" className="nav-link"><i className="bi bi-gear me-2"></i> Configuración</a></li>
          <li className="nav-item"><a href="#" className="nav-link"><i className="bi bi-person-plus me-2"></i> Perfil +</a></li>
          <li className="nav-item"><a href="#" className="nav-link"><i className="bi bi-search me-2"></i> Búsqueda</a></li>
          <li className="nav-item"><a href="#" className="nav-link"><i className="bi bi-question-circle me-2"></i> Ayuda</a></li>
        </ul>

        <div className="d-flex align-items-center p-2 bg-light border rounded">
          <img src="https://ui-avatars.com/api/?name=Admin+Huerto&background=2d5a27&color=fff" alt="Perfil" className="rounded-circle me-2" width="40" height="40" />
          <div className="small">
            <strong className="d-block text-dark">Administrador</strong>
            <span className="text-muted">Perfil activo</span>
          </div>
        </div>
      </aside>

      <div className="d-flex flex-column flex-grow-1 overflow-auto">
        <header className="d-flex justify-content-between align-items-center bg-white p-4 border-bottom">
          <h2 className="fuente-titulos m-0">¡HOLA Administrador!</h2>
          <div className="position-relative campana-container">
            <i className="bi bi-bell-fill campana-notificacion"></i>
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
          </div>
        </header>

        <main className="d-flex flex-column gap-4 p-4 flex-grow-1">
          <Outlet />
        </main>

        <footer className="bg-white border-top text-center p-3 text-muted small">
          &copy; 2026 Huerto Hogar. Panel de Administración.
        </footer>
      </div>
    </div>
  )
}
