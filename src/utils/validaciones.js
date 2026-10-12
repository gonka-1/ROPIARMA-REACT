export function estaVacio(valor) {
  return String(valor ?? '').trim().length === 0
}

export function validarTexto(valor, nombreCampo) {
  if (estaVacio(valor)) return `El campo ${nombreCampo} no puede estar vacío`
  return null
}

export function validarNumeroPositivo(valor, nombreCampo) {
  if (estaVacio(valor) || Number(valor) <= 0) return `El campo ${nombreCampo} debe ser mayor a 0`
  return null
}

export function validarEmail(correo) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(correo).trim())) {
    return 'Por favor, ingresa un correo electrónico válido (ejemplo: nombre@dominio.com)'
  }
  return null
}

export function validarPassword(pass) {
  const valor = String(pass).trim()
  if (valor.length < 8) return 'La contraseña debe tener al menos 8 caracteres'
  if (valor.length > 16) return 'La contraseña no puede tener más de 16 caracteres'
  if (/\s/.test(valor)) return 'La contraseña no puede contener espacios'
  if (!/[a-z]/.test(valor) || !/[A-Z]/.test(valor) || !/[0-9]/.test(valor)) {
    return 'La contraseña debe incluir al menos una letra mayúscula, una letra minúscula y un número'
  }
  return null
}

export function calcularEdad(dia, mes, anio) {
  const fechaNac = new Date(Number(anio), Number(mes), Number(dia))
  const hoy = new Date()
  let edad = hoy.getFullYear() - fechaNac.getFullYear()
  const difMeses = hoy.getMonth() - fechaNac.getMonth()
  if (difMeses < 0 || (difMeses === 0 && hoy.getDate() < fechaNac.getDate())) edad--
  return edad
}

export function validarMayorDeEdad(dia, mes, anio, edadMinima = 18) {
  if (calcularEdad(dia, mes, anio) < edadMinima) {
    return `Debes ser mayor de ${edadMinima} años para registrarte`
  }
  return null
}
