import { useEffect, useState } from 'react'
import { pedidosBaseDatos } from '../data/pedidos'
import '../styles/style-seguimiento.css'

export default function Seguimiento() {
  const [codigo, setCodigo] = useState('')
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    document.title = 'Huerto Hogar'
  }, [])

  function buscarPedido(e) {
    e.preventDefault()
    const codigoNormalizado = codigo.trim().toUpperCase()
    const pedido = pedidosBaseDatos[codigoNormalizado]

    if (pedido) {
      setResultado({ ...pedido, id: codigoNormalizado })
      setError(false)
    } else {
      setResultado(null)
      setError(true)
    }
  }

  return (
    <div className="container my-5 contenedor-principal-seguimiento">
      <div className="text-center mb-5">
        <h2 className="fw-bold display-6 titulo-seguimiento">Seguimiento de Pedido</h2>
        <p className="text-muted">Consulta el estado de tu compra en tiempo real ingresando tu código de pedido</p>
      </div>

      {/* Buscador */}
      <div className="card border-0 shadow-sm p-4 mb-4 rounded-4 tarjeta-buscador">
        <form onSubmit={buscarPedido}>
          <label className="form-label fw-bold text-dark mb-2">Código de Seguimiento:</label>
          <div className="d-flex gap-0" style={{ height: '48px' }}>
            <input
              type="text"
              className="form-control input-seguimiento"
              placeholder="Ej: HH-1001"
              required
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            />
            <button 
              className="btn fw-bold px-4 btn-seguimiento d-flex align-items-center justify-content-center" 
              type="submit"
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, whiteSpace: 'nowrap' }}
            >
              Buscar
            </button>
          </div>
          <small className="text-muted mt-2 d-block">
            Códigos de prueba: <b>HH-1001</b> (En camino) o <b>HH-1002</b> (En preparación)
          </small>
        </form>
      </div>

      {/* Resultado */}
      {resultado && (
        <div className="card border-0 shadow-sm p-4 rounded-4" style={{ backgroundColor: '#FFF3E0' }}>
          
          {/* Header del resultado con Flexbox reforzado */}
          <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
            <div>
              <h4 className="fw-bold mb-1 id-pedido" style={{ color: '#2E8B57' }}>
                Pedido: <span>{resultado.id}</span>
              </h4>
              <small className="text-muted">Realizado hoy</small>
            </div>
            
            <span 
              className="badge rounded-pill fs-6 px-3 py-2 text-white"
              style={{ backgroundColor: '#2E8B57', whiteSpace: 'nowrap' }}
            >
              {resultado.estado}
            </span>
          </div>

          {/* Datos del Cliente */}
          <div className="row g-3 mb-4 text-dark">
            <div className="col-sm-6">
              <p className="mb-1 text-muted small">Cliente:</p>
              <strong className="d-block">{resultado.cliente}</strong>
            </div>
            <div className="col-sm-6">
              <p className="mb-1 text-muted small">Dirección de entrega:</p>
              <strong className="d-block">{resultado.direccion}</strong>
            </div>
          </div>

          {/* Progreso del Envío (Barra asegurada) */}
          <h6 className="fw-bold mb-3 subtitulo-seguimiento" style={{ color: '#2E8B57' }}>Progreso de Envío</h6>
          
          <div 
            className="w-100 mb-2 rounded-pill overflow-hidden" 
            style={{ height: '14px', backgroundColor: '#E0E0E0' }}
          >
            <div
              className="h-100 rounded-pill"
              style={{ 
                width: resultado.progreso, 
                backgroundColor: '#2E8B57',
                transition: 'width 0.4s ease'
              }}
            ></div>
          </div>

          {/* Textos distribuidos en 4 columnas separadas */}
          <div className="row text-center small text-muted mt-2">
            <div className="col-3">Recibido</div>
            <div className="col-3">Preparando</div>
            <div className="col-3">En Camino</div>
            <div className="col-3">Entregado</div>
          </div>

        </div>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-danger border-0 shadow-sm rounded-3 mt-3 text-center" role="alert">
          No encontramos ningún pedido con ese código. Revisa que esté bien escrito (ej: HH-1001).
        </div>
      )}
    </div>
  )
}