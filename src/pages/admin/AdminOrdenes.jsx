import { useEffect } from 'react'
import CrudPanel from '../../components/admin/CrudPanel'

const ESTADOS = ['Pendiente', 'En Preparación', 'Enviado', 'Entregado']

const CAMPOS = [
  { name: 'cliente', label: 'Cliente', type: 'text', required: true },
  { name: 'correo', label: 'Correo', type: 'email', required: true },
  { name: 'total', label: 'Total ($)', type: 'number', required: true },
  { name: 'estado', label: 'Estado', type: 'select', required: true, options: ESTADOS },
]

function obtenerBadgeEstado(estado) {
  switch (estado) {
    case 'Pendiente': return <span className="badge bg-warning text-dark">Pendiente</span>
    case 'En Preparación': return <span className="badge bg-info text-dark">En Preparación</span>
    case 'Enviado': return <span className="badge bg-primary">Enviado</span>
    case 'Entregado': return <span className="badge bg-success">Entregado</span>
    default: return <span className="badge bg-secondary">{estado}</span>
  }
}

const COLUMNAS = [
  { key: 'id', label: 'ID', render: (o) => <span className="fw-bold">{o.id}</span> },
  {
    key: 'cliente', label: 'Cliente',
    render: (o) => <><div>{o.cliente}</div><small className="text-muted">{o.correo}</small></>,
  },
  { key: 'fecha', label: 'Fecha' },
  { key: 'total', label: 'Total', render: (o) => `$${Number(o.total).toLocaleString('es-CL')}` },
  { key: 'estado', label: 'Estado', render: (o) => obtenerBadgeEstado(o.estado) },
]

function fechaHoy() {
  const hoy = new Date()
  return `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`
}

export default function AdminOrdenes() {
  useEffect(() => {
    document.title = 'Panel de Administración - Huerto Hogar'
  }, [])

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="admin-title mb-1">Gestión de Órdenes</h3>
          <p className="text-muted small mb-0">Administra los pedidos de tus clientes.</p>
        </div>
      </div>

      <CrudPanel
        storageKey="ordenes_huerto_hogar"
        idField="id"
        fields={CAMPOS}
        columns={COLUMNAS}
        tituloAgregar="Registrar Nueva Órden"
        tituloEditar="Editar Órden"
        botonAgregar="Registrar Órden"
        botonEditar="Actualizar Órden"
        confirmarEliminar="¿Estás seguro de eliminar esta órden?"
        buildRecord={(valores, existente) => ({
          id: existente ? existente.id : `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
          cliente: valores.cliente.trim(),
          correo: valores.correo.trim(),
          total: parseFloat(valores.total),
          estado: valores.estado,
          fecha: existente ? existente.fecha : fechaHoy(),
        })}
      />
    </>
  )
}
