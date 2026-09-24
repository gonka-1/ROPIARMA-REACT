import { createBrowserRouter } from 'react-router-dom'

// Layouts
import Layout from './components/layout/Layout'
import AdminLayout from './components/admin/AdminLayout'

// Páginas Públicas
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

// Páginas Usuario
import Usuario from './pages/usuario/Usuario'
import UsuarioConf from './pages/usuario/UsuarioConf'
import UsuarioIngresar from './pages/usuario/UsuarioIngresar'

// Páginas Admin
import AdministradorIngresar from './pages/admin/AdministradorIngresar'
import Administrador from './pages/admin/Administrador'
import AdminInventario from './pages/admin/AdminInventario'
import AdminOrdenes from './pages/admin/AdminOrdenes'
import AdminClientes from './pages/admin/AdminClientes'
import AdminEmpleados from './pages/admin/AdminEmpleados'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Principal /> },
      { path: 'categorias', element: <Categorias /> },
      { path: 'productos/:categoria', element: <ProductosCategoria /> },
      { path: 'producto/:slug', element: <VistaProducto /> },
      { path: 'carrito', element: <Carrito /> },
      { path: 'nosotros', element: <Nosotros /> },
      { path: 'ubicaciones', element: <Ubicaciones /> },
      { path: 'blogs', element: <Blogs /> },
      { path: 'seguimiento', element: <Seguimiento /> },
      { path: 'perfil', element: <Perfil /> },
      { path: 'usuario/crear', element: <Usuario /> },
      { path: 'usuario/confirmar', element: <UsuarioConf /> },
      { path: 'usuario/ingresar', element: <UsuarioIngresar /> },
      { path: 'admin/ingresar', element: <AdministradorIngresar /> }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Administrador /> },
      { path: 'inventario', element: <AdminInventario /> },
      { path: 'ordenes', element: <AdminOrdenes /> },
      { path: 'clientes', element: <AdminClientes /> },
      { path: 'empleados', element: <AdminEmpleados /> }
    ]
  }
])