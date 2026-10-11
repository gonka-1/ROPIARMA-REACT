import { render, screen } from '@testing-library/react'
import { BrowserRouter, Link } from 'react-router-dom'
import { test, expect } from 'vitest'

test('El botón "Ver producto" apunta al ID correcto del producto', () => {
  const idProducto = 101

  render(
    <BrowserRouter>
      <Link to={`/producto/${idProducto}`} className="btn">
        Ver producto
      </Link>
    </BrowserRouter>
  )

  const enlace = screen.getByRole('link', { name: /Ver producto/i })

  expect(enlace.getAttribute('href')).toBe('/producto/101')
})