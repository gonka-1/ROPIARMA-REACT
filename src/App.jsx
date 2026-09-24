import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { CartProvider } from './context/CartContext'
import { SessionProvider } from './context/SessionContext'

export default function App() {
  return (
    <SessionProvider>
      <CartProvider>
        <RouterProvider router={routes} />
      </CartProvider>
    </SessionProvider>
  )
}