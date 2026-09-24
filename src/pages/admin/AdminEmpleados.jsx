import { useEffect } from 'react'
import CrudPanel from '../../components/admin/CrudPanel'

const CAMPOS = [
  { name: 'rut', label: 'RUT', type: 'text', placeholder: '12.345.678-9', required: true },
  { name: 'nombre', label: 'Nombre Completo', type: 'text', placeholder: 'Ej: Carlos Rojas', required: true },
  { name: 'cargo', label: 'Cargo', type: 'select', required: true, options: ['Administrador', 'Vendedor', 'Bodeguero', 'Repartidor'] },
  { name: 'estado', label: 'Estado', type: 'select', required: true, noPlaceholder: true, options: ['Activo', 'Inactivo'] },
]

const COLUMNAS = [
  { key: 'rut', label: 'RUT', render: (e) => <span className="fw-bold">{e.rut}</span> },
  { key: 'nombre', label: 'Nombre' },
  { key: 'cargo', label: 'Cargo', render: (e) => <span className="badge bg-info text-dark">{e.cargo}</span> },
  {
    key: 'estado', label: 'Estado',
    render: (e) => e.estado === 'Activo'
      ? <span className="badge bg-success">Activo</span>
      : <span className="badge bg-secondary">Inactivo</span>,
  },
]

export default function AdminEmpleados() {
  useEffect(() => {
    document.title = 'Panel de Administración - Huerto Hogar'
  }, [])

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="admin-title mb-1">Gestión de Empleados</h3>
          <p className="text-muted small mb-0">Administra el personal de Huerto Hogar.</p>
        </div>
      </div>

      <CrudPanel
        storageKey="empleados_huerto_hogar"
        idField="id"
        fields={CAMPOS}
        columns={COLUMNAS}
        tituloAgregar="Registrar Empleado"
        tituloEditar="Editar Empleado"
        botonAgregar="Guardar Empleado"
        botonEditar="Actualizar Empleado"
        confirmarEliminar="¿Estás seguro de eliminar este empleado?"
        buildRecord={(valores, existente) => ({
          id: existente ? existente.id : Date.now(),
          rut: valores.rut.trim(),
          nombre: valores.nombre.trim(),
          cargo: valores.cargo,
          estado: valores.estado,
        })}
      />
    </>
  )
}
