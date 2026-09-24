import { useState } from 'react'
import { useLocalStorageState } from '../../hooks/useLocalStorageState'

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

    resetearFormulario()
  }

  function cargarParaEditar(item) {
    setEditandoId(item[idField])
    setValores(Object.fromEntries(fields.map((f) => [f.name, item[f.name] ?? valorPorDefecto(f)])))
  }

  function eliminar(item) {
    if (!confirm(confirmarEliminar)) return
    setItems((actual) => actual.filter((i) => i[idField] !== item[idField]))
    if (editandoId === item[idField]) resetearFormulario()
  }

  return (
    <div className="row g-4">
      <div className="col-lg-4">
        <div className="card admin-card">
          <div className="card-header bg-white border-0 pt-3 pb-0">
            <h6 className="card-title-custom">{editandoId ? tituloEditar : tituloAgregar}</h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {fields.map((f) => (
                <div className={f.colClass || 'mb-3'} key={f.name}>
                  <label className="form-label small fw-semibold">{f.label}</label>
                  {f.type === 'select' ? (
                    <select
                      className="form-select form-select-sm"
                      required={f.required}
                      value={valores[f.name]}
                      onChange={(e) => actualizarCampo(f.name, e.target.value)}
                    >
                      {!f.noPlaceholder && <option value="" disabled>Seleccionar...</option>}
                      {f.options.map((op) => {
                        const opcion = typeof op === 'string' ? { value: op, label: op } : op
                        return <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                      })}
                    </select>
                  ) : (
                    <input
                      type={f.type || 'text'}
                      className="form-control form-control-sm"
                      placeholder={f.placeholder}
                      min={f.type === 'number' ? 0 : undefined}
                      required={f.required}
                      value={valores[f.name]}
                      onChange={(e) => actualizarCampo(f.name, e.target.value)}
                    />
                  )}
                </div>
              ))}

              <div className="d-grid gap-2 pt-2">
                <button type="submit" className={`btn btn-sm ${editandoId ? 'btn-warning' : 'btn-verde-admin'}`}>
                  {editandoId ? botonEditar : botonAgregar}
                </button>
                {editandoId && (
                  <button type="button" className="btn btn-light btn-sm text-muted" onClick={resetearFormulario}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-lg-8">
        <div className="card admin-card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small">
                  <tr>
                    {columns.map((c) => <th key={c.key} className={c.thClass}>{c.label}</th>)}
                    <th className="text-end pe-3">Acciones</th>
                  </tr>
                </thead>
                <tbody className="small">
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length + 1} className="text-center text-muted py-4">
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
                          <button className="btn btn-outline-warning btn-sm me-1" onClick={() => cargarParaEditar(item)}>Editar</button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => eliminar(item)}>Eliminar</button>
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
  )
}
