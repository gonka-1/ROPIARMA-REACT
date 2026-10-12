import { render, screen } from '@testing-library/react'
import { MemoryRouter, Link } from 'react-router-dom'
import { test, expect } from 'vitest'

test('El botón "Ver producto" apunta al ID correcto del producto', () => {
  const idProducto = 101

  render(
    <MemoryRouter>
      <Link to={`/producto/${idProducto}`} className="btn">
        Ver producto
      </Link>
    </MemoryRouter>
  )

  const enlace = screen.getByRole('link', { name: /Ver producto/i })

  expect(enlace.getAttribute('href')).toBe('/producto/101')
})