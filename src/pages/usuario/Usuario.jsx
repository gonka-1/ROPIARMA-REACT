import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../context/SessionContext'
import { UBICACIONES } from '../../data/ubicaciones'
import Formulario from '../../components/formulario/Formulario'
import { validarMayorDeEdad } from '../../utils/validaciones'
import '../../styles/style-usuario.css'

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

const REGIONES = [
  { valor: 'Valparaíso', texto: 'Región de Valparaíso' },
  { valor: 'Metropolitana', texto: 'Región Metropolitana de Santiago' },
  { valor: 'Biobío', texto: 'Región del Biobío' },
  { valor: 'Araucanía', texto: 'Región de la Araucanía' },
  { valor: 'Los Lagos', texto: 'Región de Los Lagos' },
]

const crearOpciones = (lista) => lista.map((item) => ({ valor: item, texto: item }))

const CAMPOS = [
      { nombre: 'nombre', etiqueta: 'Nombre', requerido: true },
  { nombre: 'apellido', etiqueta: 'Apellidos', requerido: true },
  {
    nombre: 'dia', etiqueta: 'Día', tipo: 'select', col: 'col-md-4', requerido: true,
    placeholderSelect: 'Día',
    opciones: Array.from({ length: 31 }, (_, i) => ({ valor: i + 1, texto: i + 1 })),
  },
  {
    nombre: 'mes', etiqueta: 'Mes', tipo: 'select', col: 'col-md-4', requerido: true,
    placeholderSelect: 'Mes',
    opciones: MESES.map((m, i) => ({ valor: i, texto: m })),
  },
  { nombre: 'anio', etiqueta: 'Año', tipo: 'number', col: 'col-md-4', requerido: true, min: 1900, max: 2026, placeholder: 'Ej. 1995' },
  { nombre: 'telefono', etiqueta: 'Número de teléfono', tipo: 'tel', prefijo: '+56', placeholder: '9 1234 5678', requerido: true },
  { nombre: 'calle', etiqueta: 'Dirección - Calle', col: 'col-md-5', requerido: true },
  { nombre: 'numeracion', etiqueta: 'Numeración', tipo: 'number', col: 'col-md-3', requerido: true },
  {
    nombre: 'region', etiqueta: 'Región', tipo: 'select', requerido: true,
    placeholderSelect: 'Selecciona una región',
    opciones: REGIONES,
    limpia: ['ciudad', 'comuna'],
  },
  {
    nombre: 'ciudad', etiqueta: 'Provincia', tipo: 'select', requerido: true,
    opciones: (v) => (v.region && UBICACIONES[v.region] ? crearOpciones(Object.keys(UBICACIONES[v.region])) : []),
    placeholderSelect: (ops) => (ops.length === 0 ? 'Primero selecciona una región' : 'Selecciona una ciudad'),
    limpia: ['comuna'],
  },
  {
    nombre: 'comuna', etiqueta: 'Comuna', tipo: 'select', requerido: true,
    opciones: (v) => (v.region && v.ciudad && UBICACIONES[v.region]?.[v.ciudad] ? crearOpciones(UBICACIONES[v.region][v.ciudad]) : []),
    placeholderSelect: (ops) => (ops.length === 0 ? 'Primero selecciona una ciudad' : 'Selecciona una comuna'),
  },
]

export default function Usuario() {
    const navigate = useNavigate()
    const { saveTempRegistration } = useSession()

      useEffect(() => {
    document.title = 'Crear usuario'
  }, [])

  function validar(v) {
    return validarMayorDeEdad(v.dia, v.mes, v.anio)
  }

  function guardar(v, { mostrarMensaje }) {
    saveTempRegistration({
      nombre: v.nombre.trim(),
      apellido: v.apellido.trim(),
      telefono: v.telefono.trim(),
      calle: v.calle.trim(),
      numeracion: String(v.numeracion).trim(),
      comuna: v.comuna,
      ciudad: v.ciudad,
      region: v.region,
    })

    mostrarMensaje('¡Datos guardados! Ahora completa los últimos pasos para crear tu cuenta.', 'success')
    setTimeout(() => navigate('/usuario/confirmar'), 1500)
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h1>Crea tu usuario</h1>
          <Formulario campos={CAMPOS} validar={validar} onEnviar={guardar} textoBoton="Confirmar" />
        </div>
      </div>
    </div>
  )
}

