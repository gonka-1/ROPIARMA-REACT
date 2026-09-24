import { useEffect } from 'react'
import { tiendas } from '../data/tiendas'
import '../styles/style-ubicaciones.css'

export default function Ubicaciones() {
  useEffect(() => {
    document.title = 'Ubicación'
  }, [])

  return (
    <div className="contenedor-main">
      <div className="contenedor-titulo">
        <h2>Nuestras tiendas</h2>
      </div>
      {tiendas.map((tienda) => (
        <div className="main-row row" key={tienda.nombre}>
          <div className="col">
            <h3>{tienda.nombre}</h3>
            <img className="img-mapa" src={tienda.imagen} alt="dirección de la ubicación" />
          </div>
          <div className="col">
            <div className="informacion">
              <h3>Dirección</h3>
              <p>{tienda.direccion}</p>
              <h3>Horario de Atención</h3>
              {tienda.horario.map((linea) => <p key={linea}>{linea}</p>)}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${tienda.mapsQuery}`}
                className="btn btn-outline-success"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver dirección en Google Maps
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
