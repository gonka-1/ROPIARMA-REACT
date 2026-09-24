import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { SessionProvider } from './context/SessionContext'
import Layout from './components/layout/Layout'
import AdminLayout from './components/admin/AdminLayout'

import Principal from './pages/Principal'
import Categorias from './pages/Categorias'
import ProductosCategoria from './pages/ProductosCategoria'
import VistaProducto from './pages/VistaProducto'
import Carrito from './pages/Carrito'
import Nosotros from './pages/Nosotros'
import Ubicaciones from './pages/Ubicaciones'
import Blogs from './pages/Blogs'
import Seguimiento from './pages/Seguimiento'
import Perfil from './pages/Perfil'
import Usuario from './pages/usuario/Usuario'
import UsuarioConf from './pages/usuario/UsuarioConf'
import UsuarioIngresar from './pages/usuario/UsuarioIngresar'
import AdministradorIngresar from './pages/admin/AdministradorIngresar'
import Administrador from './pages/admin/Administrador'
import AdminInventario from './pages/admin/AdminInventario'
import AdminOrdenes from './pages/admin/AdminOrdenes'
import AdminClientes from './pages/admin/AdminClientes'
import AdminEmpleados from './pages/admin/AdminEmpleados'

export default function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Principal />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/productos/:categoria" element={<ProductosCategoria />} />
              <Route path="/producto/:slug" element={<VistaProducto />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/ubicaciones" element={<Ubicaciones />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/seguimiento" element={<Seguimiento />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/usuario/crear" element={<Usuario />} />
              <Route path="/usuario/confirmar" element={<UsuarioConf />} />
              <Route path="/usuario/ingresar" element={<UsuarioIngresar />} />
              <Route path="/admin/ingresar" element={<AdministradorIngresar />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Administrador />} />
              <Route path="inventario" element={<AdminInventario />} />
              <Route path="ordenes" element={<AdminOrdenes />} />
              <Route path="clientes" element={<AdminClientes />} />
              <Route path="empleados" element={<AdminEmpleados />} />
            </Route>
          </Routes>
        </CartProvider>
      </SessionProvider>
    </BrowserRouter>
  )
}
