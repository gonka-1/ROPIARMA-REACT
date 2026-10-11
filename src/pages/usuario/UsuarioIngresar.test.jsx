import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { test, expect } from 'vitest'
import UsuarioIngresar from './UsuarioIngresar'
import { SessionProvider } from '../../context/SessionContext'

test('Muestra el encabezado principal de Ingresar', () => {
  render(
    <SessionProvider>
      <BrowserRouter>
        <UsuarioIngresar />
      </BrowserRouter>
    </SessionProvider>
  )

  expect(screen.getByRole('heading', { name: /Ingresar/i })).toBeInTheDocument()
})