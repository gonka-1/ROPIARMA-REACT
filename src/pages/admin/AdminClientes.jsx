import { useEffect } from 'react'
import CrudPanel from '../../components/admin/CrudPanel'

const CAMPOS = [
  { name: 'nombre', label: 'Nombre Completo', type: 'text', placeholder: 'Ej: María González', required: true },
  { name: 'correo', label: 'Correo Electrónico', type: 'email', placeholder: 'maria@ejemplo.com', required: true },
  { name: 'telefono', label: 'Teléfono', type: 'tel', placeholder: '+56 9 1234 5678' },
  {
    name: 'region', label: 'Región', type: 'select', required: true,
    options: ['Región Metropolitana', 'Valparaíso', 'Bío Bío', 'Coquimbo', { value: 'Otra', label: 'Otra Región' }],
  },
]

const COLUMNAS = [
  { key: 'nombre', label: 'Nombre', render: (c) => <strong>{c.nombre}</strong> },
  { key: 'correo', label: 'Correo' },
  { key: 'telefono', label: 'Teléfono', render: (c) => c.telefono || 'Sin registro' },
  { key: 'region', label: 'Región' },
]

export default function AdminClientes() {
  useEffect(() => {
    document.title = 'Panel de Administración - Huerto Hogar'
  }, [])

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="admin-title mb-1">Gestión de Clientes</h3>
          <p className="text-muted small mb-0">Administra la información de tus clientes.</p>
        </div>
      </div>

      <CrudPanel
        storageKey="clientes_huerto_hogar"
        idField="id"
        fields={CAMPOS}
        columns={COLUMNAS}
        tituloAgregar="Registrar Cliente"
        tituloEditar="Editar Cliente"
        botonAgregar="Guardar Cliente"
        botonEditar="Actualizar Cliente"
        confirmarEliminar="¿Estás seguro de eliminar este cliente?"
        buildRecord={(valores, existente) => ({
          id: existente ? existente.id : Date.now(),
          nombre: valores.nombre.trim(),
          correo: valores.correo.trim(),
          telefono: valores.telefono.trim(),
          region: valores.region,
        })}
      />
    </>
  )
}
