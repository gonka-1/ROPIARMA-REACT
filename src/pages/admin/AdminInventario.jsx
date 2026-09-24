import { useEffect } from 'react'
import CrudPanel from '../../components/admin/CrudPanel'

const CAMPOS = [
  { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Ej. Manzana Fuji', required: true },
  { name: 'precio', label: 'Precio ($)', type: 'number', placeholder: '1200', required: true, colClass: 'row g-2 mb-3 col-6' },
  { name: 'stock', label: 'Stock', type: 'number', placeholder: '50', required: true, colClass: 'row g-2 mb-3 col-6' },
  {
    name: 'categoria', label: 'Categoría', type: 'select', required: true,
    options: ['Frutas', 'Verduras', 'Organicas', { value: 'Otros', label: 'Lacteos' }],
  },
]

const COLUMNAS = [
  { key: 'nombre', label: 'Producto', render: (p) => <strong>{p.nombre}</strong> },
  { key: 'categoria', label: 'Categoría', render: (p) => <span className="badge badge-categoria">{p.categoria}</span> },
  { key: 'precio', label: 'Precio', render: (p) => `$${Number(p.precio).toLocaleString('es-CL')}` },
  { key: 'stock', label: 'Stock', render: (p) => `${p.stock} u.` },
]

export default function AdminInventario() {
  useEffect(() => {
    document.title = 'Panel de Administración - Huerto Hogar'
  }, [])

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="admin-title mb-1">Gestión de Inventario</h3>
          <p className="text-muted small mb-0">Administra los productos del catálogo, stock y precios.</p>
        </div>
      </div>

      <CrudPanel
        storageKey="inventario_ropiarma"
        idField="id"
        fields={CAMPOS}
        columns={COLUMNAS}
        tituloAgregar="Agregar Producto"
        tituloEditar="Editar Producto"
        botonAgregar="Guardar Producto"
        botonEditar="Actualizar Producto"
        confirmarEliminar="¿Estás seguro de eliminar este producto?"
        buildRecord={(valores, existente) => ({
          id: existente ? existente.id : Date.now(),
          nombre: valores.nombre.trim(),
          precio: parseFloat(valores.precio),
          stock: parseInt(valores.stock, 10),
          categoria: valores.categoria,
        })}
      />
    </>
  )
}
