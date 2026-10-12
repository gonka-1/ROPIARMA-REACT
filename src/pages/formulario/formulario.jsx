import { useState } from 'react'
import App_alert from '../alerts/alert'
import { estaVacio } from '../../utils/validaciones'

function valoresIniciales(campos) {
    const valores = {}
    campos.forEach((campo) => {
        valores[campo.nombre] = campo.valoresIniciales ?? ''
    })
    return valores
}

export default function Formulario({
    campos,
    validar,
    onEnviar,
    msgRequeridos = 'Por favor, completa todos los campos obligatorios',
    textoBoton = 'Guardar',
    claseBoton = 'btn btn-relieve',
    claseContenedorBoton = 'contenedor-boton',
    claseEtiqueta = 'form-label',
    children,
}) {
    const [valores, setValores] = useState(() => valoresIniciales(campos))
    const [errores, setErrores] = useState({})
    const [passwordsVisibles, setPasswordsVisibles] = useState({})

    const [mostrarAlert, setMostrarAlert] = useState(false)
    const [msgAlert, setMsgAlert] = useState('')
    const [variantAlert, setVariantAlert] = useState('danger')

    function mostrarMensaje(mensaje, variant = 'danger') {
        setMsgAlert(mensaje)
        setVariantAlert(variant)
        setMostrarAlert(true)
    }

    function reiniciar() {
        setValores(valoresIniciales(campos))
        setErrores({})
    }

    function actualizar(campo, valor) {
        setValores((actual) => {
            const siguiente = { ...actual, [campo.nombre]: valor }
                ; (campo.limpia || []).forEach((dependiente) => {
                    siguiente[dependiente] = ''
                })
            return siguiente
        })
        if (errores[campo.nombre]) {
            setErrores((actual) => ({ ...actual, [campo.nombre]: false }))
        }
    }

    function handleSubmit(e) {
        e.preventDefault()

        // Campos obligatorios
        const nuevosErrores = {}
        campos.forEach((campo) => {
            if (campo.requerido && estaVacio(valores[campo.nombre])) nuevosErrores[campo.nombre] = true
        })
        setErrores(nuevosErrores)
        if (Object.keys(nuevosErrores).length > 0) {
            mostrarMensaje(msgRequeridos)
            return
        }

        // Validaciones propias de cada página
        if (validar) {
            const error = validar(valores)
            if (error) {
                mostrarMensaje(error)
                return
            }
        }

        // Todo OK
        if (onEnviar) onEnviar(valores, { mostrarAlert, reiniciar })
    }

    function renderControl(campo) {
        const id = `campo-${campo.nombre}`
        const clase = (base) => `${base}${errores[campo.nombre] ? ' is-invalid' : ''}`

        if (campo.tipo === 'select') {
            const opciones = typeof campo.opciones === 'function' ? campo.opciones(valores) : campo.opciones || []
            const placeholder = typeof campo.placeholderSelect === 'function'
                ? campo.placeholderSelect(opciones)
                : campo.placeholderSelect ?? 'Selecciona una opción'

            return (
                <select
                    id={id}
                    className={clase('form-select')}
                    value={valores[campo.nombre]}
                    onChange={(e) => actualizar(campo, e.target.value)}
                    disable={campo.deshabilitado ?? opciones.length === 0}
                    required={campo.requerido}
                >
                    <option value="" disabled>{placeholder}</option>
                    {opciones.map((op) => (
                        <option key={op.valor} value={op.valor}>{op.texto}</option>
                    ))}
                </select>
            )
        }

        const esPassword = campo.tipo === 'password'
        const visible = passwordsVisibles[campo.nombre]

        const input = (
            <input
                id={id}
                type={esPassword && visible ? 'text' : campo.tipo || 'text'}
                className={clase('form-control')}
                placeholder={campo.placeholder}
                value={valores[campo.nombre]}
                onChange={(e) => actualizar(campo, e.target.value)}
                min={campo.min}
                max={campo.max}
                minLength={campo.minLength}
                maxLength={campo.maxLength}
                required={campo.requerido}
            />
        )

        if (!esPassword && !campo.prefijo) return input

        return (
            <div className='input-group'>
                {campo.prefijo && <span className='input-group-text'>{campo.prefijo}</span>}
                {input}
                {esPassword && (
                    <button
                        className='btn btn-outline-secondary'
                        type='button'
                        aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        onClick={() => setPasswordsVisibles((v) => ({ ...v, [campo.nombre]: !v[campo.nombre] }))}
                    >
                        <i className={`bi ${visible ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                )}
            </div>
        )

    }

    return (
        <>
            <App_alert
                mostrarAlert={mostrarAlert}
                cerrarAlert={() => setMostrarAlert(false)}
                variant={variantAlert}
                msgAlert={msgAlert}
            />

            <form onSubmit={handleSubmit} noValidate>
                <div className="row g-2">
                    {campos.map((campo) => (
                        <div key={campo.nombre} className={`${campo.col || 'col-12'} mb-3`}>
                            <label htmlFor={`campo-${campo.nombre}`} className={claseEtiqueta}>
                                {campo.etiqueta}
                            </label>
                            {renderControl(campo)}
                            {campo.ayuda && <div className="form-text">{campo.ayuda}</div>}
                        </div>
                    ))}
                </div>

                {children}

                <div className={claseContenedorBoton}>
                    <button type="submit" className={claseBoton}>{textoBoton}</button>
                </div>
            </form>
        </>
    )



}