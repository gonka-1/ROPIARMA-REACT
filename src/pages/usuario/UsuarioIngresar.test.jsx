import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import UsuarioIngresar from './UsuarioIngresar'
import { SessionProvider } from '../../context/SessionContext'
import { MemoryRouter } from "react-router-dom";

test('Muestra el encabezado principal de Ingresar', () => {
  render(
    <SessionProvider>
      <MemoryRouter>
        <UsuarioIngresar />
      </MemoryRouter>
    </SessionProvider>
  )

  expect(screen.getByRole('heading', { name: /Ingresar/i })).toBeInTheDocument()
})