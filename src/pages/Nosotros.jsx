import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { sedes } from '../data/sedes'
import '../styles/style-nosotros.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconUrl: icon, shadowUrl: iconShadow })

function VoladorMapa({ indiceActivo }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo([sedes[indiceActivo].lat, sedes[indiceActivo].lng], 15, { duration: 1.5 })
  }, [indiceActivo, map])
  return null
}

export default function Nosotros() {
  const [indiceActivo, setIndiceActivo] = useState(0)
  const marcadoresRef = useRef([])

  useEffect(() => {
    document.title = 'Nosotros'
  }, [])

  useEffect(() => {
    const marcador = marcadoresRef.current[indiceActivo]
    if (marcador) marcador.openPopup()
  }, [indiceActivo])

  function cambiarSede(direccion) {
    setIndiceActivo((actual) => {
      let siguiente = actual + direccion
      if (siguiente >= sedes.length) siguiente = 0
      else if (siguiente < 0) siguiente = sedes.length - 1
      return siguiente
    })
  }

  return (
    <div className="contenedor-main">
      <div className="tituloNosotros">
        <div className="logoHuerto">
          <img src="/imagenes/LogoHuertoHogar.png" alt="Logo Huerto Hogar" />
        </div>
        <div className="historia">
          <p>
            Huerto Hogar nació de la unión de cuatro amigos con una visión común: Valentina Martinoli, Matías Vera,
            Lucas Pizarro y Jose Daniel Rojo, quien trajo desde Venezuela la fuerza y el amor por la tierra para
            echar raíces firmes. En nuestro propio huerto cultivamos de forma natural y consciente, cosechando
            alimentos y productos frescos libres de químicos directo de la tierra a tu mesa. A través de este
            espacio digital, abrimos las puertas de nuestra cosecha a la comunidad y al mundo, demostrando que
            alimentarse sano y conectar con la naturaleza está a solo un clic de distancia.
          </p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card shadow-sm border-0 p-4">
            <h3 className="text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Nuestras Sucursales</h3>

            <MapContainer center={[sedes[0].lat, sedes[0].lng]} zoom={14} id="mapa" className="mb-4 shadow-sm">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap | Huerto Hogar"
              />
              {sedes.map((sede, i) => (
                <Marker
                  key={sede.nombre}
                  position={[sede.lat, sede.lng]}
                  ref={(el) => { marcadoresRef.current[i] = el }}
                >
                  <Popup>
                    <div style={{ textAlign: 'center' }}>
                      <b style={{ color: '#2d5a27', fontSize: '16px' }}>{sede.nombre}</b><br />
                      <span style={{ color: '#6c757d', fontSize: '14px' }}>{sede.descripcion}</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
              <VoladorMapa indiceActivo={indiceActivo} />
            </MapContainer>

            <div className="controles d-flex justify-content-between align-items-center p-3 rounded" style={{ backgroundColor: 'transparent' }}>
              <button className="btn-huerto" onClick={() => cambiarSede(-1)}>Anterior</button>
              <span className="texto-huerto">{sedes[indiceActivo].nombre}</span>
              <button className="btn-huerto" onClick={() => cambiarSede(1)}>Siguiente</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
