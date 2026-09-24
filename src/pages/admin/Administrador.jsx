import { useEffect } from 'react'

export default function Administrador() {
  useEffect(() => {
    document.title = 'Panel de Administración - Huerto Hogar'
  }, [])

  return (
    <>
      <div>
        <h5 className="fuente-titulos text-secondary fw-bold mb-3">Resumen de Hoy</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 border-start border-success border-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Ventas del Día</h6>
                  <h3 className="m-0 fw-bold">$125.000</h3>
                </div>
                <div className="bg-success bg-opacity-10 p-2 rounded text-success h3 m-0">
                  <i className="bi bi-currency-dollar"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 border-start border-primary border-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Pedidos Nuevos</h6>
                  <h3 className="m-0 fw-bold">14</h3>
                </div>
                <div className="bg-primary bg-opacity-10 p-2 rounded text-primary h3 m-0">
                  <i className="bi bi-box-seam"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 border-start border-warning border-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Bajo Stock</h6>
                  <h3 className="m-0 fw-bold">3 <span className="fs-6 text-muted fw-normal">productos</span></h3>
                </div>
                <div className="bg-warning bg-opacity-10 p-2 rounded text-warning h3 m-0">
                  <i className="bi bi-exclamation-triangle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm p-4 flex-grow-1 mt-2">
        <h5 className="fuente-titulos text-secondary fw-bold mb-4">Detalles Recientes</h5>
        <p className="text-muted">Contenido de la segunda sección...</p>
      </div>
    </>
  )
}
