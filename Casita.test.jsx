import { render, screen } from '@testing-library/react'
import { BrowserRouter, Link } from 'react-router-dom'
import { test, expect } from 'vitest'

test('El botón de la casita redirige a la página principal "/"', () => {
  render(
    <BrowserRouter>
      <Link to="/" aria-label="Inicio">
        <i className="bi bi-house-door-fill"></i>
      </Link>
    </BrowserRouter>
  )

  const botonCasita = screen.getByRole('link', { name: /inicio/i })

  expect(botonCasita.getAttribute('href')).toBe('/')
})