import { useEffect } from 'react'

export default function Administrador() {
  useEffect(() => {
    document.title = 'Panel de Administración - Huerto Hogar'
  }, [])

  return (
    <div className="admin-main-content">
      {/* Título y Resumen */}
      <div className="mb-4">
        <h5 className="fuente-titulos fw-bold mb-3">Resumen de Hoy</h5>
        
        <div className="row g-3">
          {/* Ventas del Día */}
          <div className="col-12 col-md-4">
            <div className="admin-kpi-card kpi-border-verde">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small fw-semibold">Ventas del Día</span>
                  <h3 className="m-0 fw-bold text-dark mt-1">$125.000</h3>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded-3 text-success fs-3 d-flex align-items-center justify-content-center">
                  <i className="bi bi-currency-dollar"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Pedidos Nuevos */}
          <div className="col-12 col-md-4">
            <div className="admin-kpi-card kpi-border-azul">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small fw-semibold">Pedidos Nuevos</span>
                  <h3 className="m-0 fw-bold text-dark mt-1">14</h3>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded-3 text-primary fs-3 d-flex align-items-center justify-content-center">
                  <i className="bi bi-box-seam"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Bajo Stock */}
          <div className="col-12 col-md-4">
            <div className="admin-kpi-card kpi-border-amarillo">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small fw-semibold">Bajo Stock</span>
                  <h3 className="m-0 fw-bold text-dark mt-1">
                    3 <span className="fs-6 text-muted fw-normal">productos</span>
                  </h3>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded-3 text-warning fs-3 d-flex align-items-center justify-content-center">
                  <i className="bi bi-exclamation-triangle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Detalles Recientes */}
      <div className="admin-card-detalles mt-4">
        <h5 className="fuente-titulos fw-bold mb-3">Detalles Recientes</h5>
        
        <div className="bg-white rounded-3 p-3 shadow-sm">
          <p className="text-muted mb-0">Contenido de la segunda sección...</p>
        </div>
      </div>
    </div>
  )
}