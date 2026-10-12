import { render, screen } from '@testing-library/react'
import { MemoryRouter, Link } from 'react-router-dom'
import { test, expect } from 'vitest'

test('El botón de la casita redirige a la página principal "/"', () => {
  render(
    <MemoryRouter>
      <Link to="/" aria-label="Inicio">
        <i className="bi bi-house-door-fill"></i>
      </Link>
    </MemoryRouter>
  )

  const botonCasita = screen.getByRole('link', { name: /inicio/i })

  expect(botonCasita.getAttribute('href')).toBe('/')
})