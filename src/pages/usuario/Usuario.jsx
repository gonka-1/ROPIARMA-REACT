import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../context/SessionContext'
import { UBICACIONES } from '../../data/ubicaciones'
import '../../styles/style-usuario.css'

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

export default function Usuario() {
  const navigate = useNavigate()
  const { saveTempRegistration } = useSession()

  const [form, setForm] = useState({
    nombre: '', apellido: '', dia: '', mes: '', anio: '',
    telefono: '', calle: '', numeracion: '',
    region: '', ciudad: '', comuna: '',
  })
  const [errores, setErrores] = useState({})

  useEffect(() => {
    document.title = 'Crear usuario'
  }, [])

  function actualizar(campo, valor) {
    setForm((actual) => {
      const siguiente = { ...actual, [campo]: valor }
      if (campo === 'region') {
        siguiente.ciudad = ''
        siguiente.comuna = ''
      }
      if (campo === 'ciudad') {
        siguiente.comuna = ''
      }
      return siguiente
    })
  }

  const ciudades = form.region && UBICACIONES[form.region] ? Object.keys(UBICACIONES[form.region]) : []
  const comunas = form.region && form.ciudad && UBICACIONES[form.region][form.ciudad]
    ? UBICACIONES[form.region][form.ciudad]
    : []

  function handleSubmit(e) {
    e.preventDefault()

    const camposRequeridos = ['nombre', 'apellido', 'dia', 'mes', 'anio', 'telefono', 'calle', 'numeracion', 'region', 'ciudad', 'comuna']
    const nuevosErrores = {}
    camposRequeridos.forEach((campo) => {
      if (!String(form[campo]).trim()) nuevosErrores[campo] = true
    })
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      alert('Por favor, completa todos los campos obligatorios')
      return
    }

    const fechaNac = new Date(Number(form.anio), Number(form.mes), Number(form.dia))
    const hoy = new Date()
    let edad = hoy.getFullYear() - fechaNac.getFullYear()
    const difMeses = hoy.getMonth() - fechaNac.getMonth()
    if (difMeses < 0 || (difMeses === 0 && hoy.getDate() < fechaNac.getDate())) edad--

    if (edad < 18) {
      alert('Debes ser mayor de 18 años para registrarte')
      return
    }

    saveTempRegistration({
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      telefono: form.telefono.trim(),
      calle: form.calle.trim(),
      numeracion: form.numeracion.trim(),
      comuna: form.comuna,
      ciudad: form.ciudad,
      region: form.region,
    })

    navigate('/usuario/confirmar')
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h1>Crea tu usuario</h1>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" value={form.nombre} onChange={(e) => actualizar('nombre', e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Apellidos</label>
              <input type="text" className="form-control" value={form.apellido} onChange={(e) => actualizar('apellido', e.target.value)} required />
            </div>

            <div className="row g-2">
              <div className="col-md-4 mb-3">
                <label className="form-label">Día</label>
                <select className="form-select" value={form.dia} onChange={(e) => actualizar('dia', e.target.value)} required>
                  <option value="" disabled>Día</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Mes</label>
                <select className="form-select" value={form.mes} onChange={(e) => actualizar('mes', e.target.value)} required>
                  <option value="" disabled>Mes</option>
                  {MESES.map((m, i) => <option key={m} value={i}>{m}</option>)}
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Año</label>
                <input type="number" className="form-control" min="1900" max="2026" placeholder="Ej. 1995" value={form.anio} onChange={(e) => actualizar('anio', e.target.value)} required />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Número de teléfono</label>
              <div className="input-group">
                <span className="input-group-text">+56</span>
                <input type="tel" className="form-control" placeholder="9 1234 5678" value={form.telefono} onChange={(e) => actualizar('telefono', e.target.value)} required />
              </div>
            </div>

            <div className="row g-2">
              <div className="col-md-5 mb-3">
                <label className="form-label">Dirección - Calle</label>
                <input type="text" className="form-control" value={form.calle} onChange={(e) => actualizar('calle', e.target.value)} required />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Numeración</label>
                <input type="number" className="form-control" value={form.numeracion} onChange={(e) => actualizar('numeracion', e.target.value)} required />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Región</label>
              <select className="form-select" value={form.region} onChange={(e) => actualizar('region', e.target.value)} required>
                <option value="" disabled>Selecciona una región</option>
                <option value="Valparaíso">Región de Valaparaíso</option>
                <option value="Metropolitana">Región Metropolitana de Santiago</option>
                <option value="Biobío">Región del Biobío</option>
                <option value="Araucanía">Región de la Araucanía</option>
                <option value="Los Lagos">Región de Los Lagos</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Provincia</label>
              <select className="form-select" value={form.ciudad} onChange={(e) => actualizar('ciudad', e.target.value)} disabled={ciudades.length === 0} required>
                <option value="" disabled>{ciudades.length === 0 ? 'Primero selecciona una región' : 'Selecciona una ciudad'}</option>
                {ciudades.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Comuna</label>
              <select className="form-select" value={form.comuna} onChange={(e) => actualizar('comuna', e.target.value)} disabled={comunas.length === 0} required>
                <option value="" disabled>{comunas.length === 0 ? 'Primero selecciona una ciudad' : 'Selecciona una comuna'}</option>
                {comunas.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="contenedor-boton">
              <button type="submit" className="btn btn-relieve">Confirmar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
