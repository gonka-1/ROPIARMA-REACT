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

      <div className="card border-0 shadow-sm p-4 mb-4 rounded-4 tarjeta-buscador">
        <form onSubmit={buscarPedido}>
          <label className="form-label fw-bold text-dark">Código de Seguimiento:</label>
          <div className="input-group input-group-lg">
            <input
              type="text"
              className="form-control input-seguimiento"
              placeholder="Ej: HH-1001"
              required
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
            <button className="btn fw-bold px-4 btn-seguimiento" type="submit">Buscar</button>
          </div>
          <small className="text-muted mt-2 d-block">
            Códigos de prueba: <b>HH-1001</b> (En camino) o <b>HH-1002</b> (En preparación)
          </small>
        </form>
      </div>

      {resultado && (
        <div className="card border-0 shadow-sm p-4 rounded-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap border-bottom pb-3 mb-3">
            <div>
              <h5 className="fw-bold mb-1 id-pedido">Pedido: <span>{resultado.id}</span></h5>
              <span className="text-muted small">Realizado hoy</span>
            </div>
            <span className="badge rounded-pill fs-6 px-3 py-2 mt-2 mt-sm-0 badge-estado">{resultado.estado}</span>
          </div>

          <div className="row g-3 mb-4 text-dark">
            <div className="col-sm-6">
              <p className="mb-1 text-muted small">Cliente:</p>
              <strong>{resultado.cliente}</strong>
            </div>
            <div className="col-sm-6">
              <p className="mb-1 text-muted small">Dirección de entrega:</p>
              <strong>{resultado.direccion}</strong>
            </div>
          </div>

          <h6 className="fw-bold mb-3 subtitulo-seguimiento">Progreso de Envío</h6>
          <div className="progress mb-3 contenedor-progreso">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated barra-progreso-fill"
              role="progressbar"
              style={{ width: resultado.progreso }}
            ></div>
          </div>

          <div className="d-flex justify-content-between text-center small text-muted mt-2">
            <div>Recibido</div>
            <div>Preparando</div>
            <div>En Camino</div>
            <div>Entregado</div>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger border-0 shadow-sm rounded-3 mt-3 text-center" role="alert">
          No encontramos ningún pedido con ese código. Revisa que esté bien escrito (ej: HH-1001).
        </div>
      )}
    </div>
  )
}
