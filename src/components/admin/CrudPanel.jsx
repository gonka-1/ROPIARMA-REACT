import { useState } from 'react'
import { useLocalStorageState } from '../../hooks/useLocalStorageState'
import App_alert from '../alerts/alert'
import Modal from 'react-bootstrap/Modal'

const VACIO = ''

function opcionValor(op) {
  return typeof op === 'string' ? op : op.value
}

function valorPorDefecto(field) {
  if (field.type === 'select' && field.noPlaceholder) {
    return opcionValor(field.options[0])
  }
  return VACIO
}

export default function CrudPanel({
  storageKey,
  idField,
  fields,
  columns,
  tituloAgregar,
  tituloEditar,
  botonAgregar,
  botonEditar,
  buildRecord,
  confirmarEliminar,
}) {
  const [items, setItems] = useLocalStorageState(storageKey, [])
  const [editandoId, setEditandoId] = useState(null)
  const valoresIniciales = () => Object.fromEntries(fields.map((f) => [f.name, valorPorDefecto(f)]))
  const [valores, setValores] = useState(valoresIniciales)
  const [itemAEliminar, setItemAEliminar] = useState(null)

  const [mostrarAlert, setMostrarAlert] = useState(false)
  const [msgAlert, setMsgAlert] = useState("")
  const [variantAlert, setVarianAlert] = useState("success")

  function mostrarMensaje(mensaje, variant = "success") {
    setMsgAlert(mensaje)
    setVarianAlert(variant)
    setMostrarAlert(true)
  }

  function actualizarCampo(nombre, valor) {
    setValores((actual) => ({ ...actual, [nombre]: valor }))
  }

  function resetearFormulario() {
    setEditandoId(null)
    setValores(valoresIniciales())
  }

  function handleSubmit(e) {
    e.preventDefault()
    const registro = buildRecord(valores, editandoId ? items.find((i) => i[idField] === editandoId) : null)

    setItems((actual) => {
      if (editandoId) {
        return actual.map((item) => (item[idField] === editandoId ? registro : item))
      }
      return [...actual, registro]
    })

    mostrarMensaje(editandoId ? 'Registro actualizado correctamente' : 'Registro agregado correctamente')
    resetearFormulario()
  }

  function cargarParaEditar(item) {
    setEditandoId(item[idField])
    setValores(Object.fromEntries(fields.map((f) => [f.name, item[f.name] ?? valorPorDefecto(f)])))
  }

  function pedirEliminar(item) {
    setItemAEliminar(item)
  }
  
  function confirmarEliminarItem() {
    const item = itemAEliminar
    setItems((actual) => actual.filter((i) => i[idField] !== item[idField]))
    if (editandoId === item[idField]) resetearFormulario()
    mostrarMensaje('Registro eliminado', 'warning')
    setItemAEliminar(null)
  }

  return (
    /* align-items-start evita que las tarjetas se estiren artificialmente hacia abajo */
    <div className="row g-4 align-items-start">
      <App_alert
        mostrarAlert={mostrarAlert}
        cerrarAlert={() => setMostrarAlert(false)}
        variant={variantAlert}
        msgAlert={msgAlert}
      />
      <Modal
        show={itemAEliminar !== null}
        onHide={() => setItemAEliminar(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>{confirmarEliminar}</Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-light"
            onClick={() => setItemAEliminar(null)}
          >
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={confirmarEliminarItem}>
            Eliminar
          </button>
        </Modal.Footer>
      </Modal>

      {/* Columna Izquierda: Formulario */}
      <div className="col-lg-4">
        <div className="card admin-card border-0 shadow-sm" style={{ backgroundColor: '#FEF4E7', height: 'auto' }}>
          <div className="card-header bg-transparent border-0 pt-3 pb-0 text-center">
            <h6 className="card-title-custom fw-bold fs-5">
              {editandoId ? tituloEditar : tituloAgregar}
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-2">
                {fields.map((f) => (
                  <div className={f.colClass || "col-12 mb-3"} key={f.name}>
                    <label className="form-label small fw-semibold text-dark">
                      {f.label}
                    </label>
                    {f.type === "select" ? (
                      <select
                        className="form-select"
                        required={f.required}
                        value={valores[f.name]}
                        onChange={(e) => actualizarCampo(f.name, e.target.value)}
                      >
                        {!f.noPlaceholder && (
                          <option value="" disabled>
                            Seleccionar...
                          </option>
                        )}
                        {f.options.map((op) => {
                          const opcion =
                            typeof op === "string"
                              ? { value: op, label: op }
                              : op;
                          return (
                            <option key={opcion.value} value={opcion.value}>
                              {opcion.label}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <input
                        type={f.type || "text"}
                        className="form-control"
                        placeholder={f.placeholder}
                        min={f.type === "number" ? 0 : undefined}
                        required={f.required}
                        value={valores[f.name]}
                        onChange={(e) => actualizarCampo(f.name, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="d-grid gap-2 pt-2">
                <button
                  type="submit"
                  className={`btn ${
                    editandoId ? "btn-warning" : "btn-verde-admin"
                  } w-100 py-2 fw-semibold`}
                >
                  {editandoId ? botonEditar : botonAgregar}
                </button>
                {editandoId && (
                  <button
                    type="button"
                    className="btn btn-light btn-sm text-muted"
                    onClick={resetearFormulario}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Columna Derecha: Tabla Extendida */}
      <div className="col-lg-8">
        <div className="card admin-card border-0 shadow-sm p-3" style={{ backgroundColor: '#FEF4E7', height: 'auto' }}>
          <div className="card-body p-0">
            <div className="table-responsive bg-white rounded-3 shadow-sm w-100">
              <table className="table table-hover align-middle mb-0 w-100">
                <thead className="table-light">
                  <tr>
                    {columns.map((c) => (
                      <th key={c.key} className={c.thClass}>
                        {c.label}
                      </th>
                    ))}
                    <th className="text-end pe-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td
                        colSpan={columns.length + 1}
                        className="text-center text-muted py-4"
                      >
                        No hay registros todavía.
                      </td>
                    </tr>
                  ) : (
                    items.map((item) => (
                      <tr key={item[idField]}>
                        {columns.map((c) => (
                          <td key={c.key} className={c.tdClass}>
                            {c.render ? c.render(item) : item[c.key]}
                          </td>
                        ))}
                        <td className="text-end pe-3">
                          <button
                            className="btn btn-outline-warning btn-sm me-1"
                            onClick={() => cargarParaEditar(item)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => pedirEliminar(item)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}