import { useState } from 'react'
import { useLocalStorageState } from '../../hooks/useLocalStorageState'

export default function ReviewsSection({ productId }) {
  const [todas, setTodas] = useLocalStorageState('resenas', {})
  const [rating, setRating] = useState('5')
  const [author, setAuthor] = useState('')
  const [comment, setComment] = useState('')

  const lista = todas[productId] || []
  const promedio = lista.length
    ? (lista.reduce((acc, r) => acc + Number(r.rating), 0) / lista.length).toFixed(1)
    : '0.0'
  const estrellasPromedio = '★'.repeat(Math.round(promedio)) + '☆'.repeat(5 - Math.round(promedio))

  function handleSubmit(e) {
    e.preventDefault()
    const nueva = {
      author,
      rating,
      comment,
      date: new Date().toLocaleDateString(),
    }
    setTodas((actual) => ({
      ...actual,
      [productId]: [nueva, ...(actual[productId] || [])],
    }))
    setRating('5')
    setAuthor('')
    setComment('')
  }

  return (
    <div className="reviews-section my-5 p-4 bg-white rounded shadow-sm">
      <h4 className="fw-bold mb-3">Opiniones de nuestros clientes</h4>

      <div className="d-flex align-items-center mb-4">
        <div className="display-6 fw-bold me-3 text-rating-number numeros">{promedio}</div>
        <div>
          <div className="fs-5 stars-color color-estrellas">{lista.length ? estrellasPromedio : '☆☆☆☆☆'}</div>
          <small className="text-muted"><span>{lista.length}</span> reseñas en total</small>
        </div>
      </div>

      <hr />

      <form onSubmit={handleSubmit} className="mb-4">
        <h6 className="fw-bold">Deja tu comentario</h6>
        <div className="mb-2">
          <label className="form-label mb-1">Calificación:</label>
          <select className="form-select w-auto" required value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
            <option value="4">⭐⭐⭐⭐ (4/5)</option>
            <option value="3">⭐⭐⭐ (3/5)</option>
            <option value="2">⭐⭐ (2/5)</option>
            <option value="1">⭐ (1/5)</option>
          </select>
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Tu nombre"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <textarea
            className="form-control"
            rows="3"
            placeholder="¿Qué te pareció este producto?"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-review-submit btn-review">Publicar reseña</button>
      </form>

      <div className="d-flex flex-column gap-3">
        {lista.length === 0 ? (
          <p>Sin opiniones aún.</p>
        ) : (
          lista.map((r, i) => (
            <div className="tarjeta-resena" key={i}>
              <div className="encabezado-resena">
                <span className="autor-resena">{r.author}</span>
                <span className="estrellas">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              </div>
              <p className="comentario-texto">{r.comment}</p>
              <span className="fecha-resena">{r.date}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
