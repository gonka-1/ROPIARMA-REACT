import { createContext, useContext, useMemo, useState } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'

const CUPONES = {
  HUERTITO10: 0.1,
  FUJI123: 0.2,
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorageState('carrito', [])
  const [discountRate, setDiscountRate] = useState(0)
  const [couponMessage, setCouponMessage] = useState(null)

  function addToCart(producto, cantidad) {
    setItems((lista) => {
      const indiceExistente = lista.findIndex((item) => item.id === producto.id)
      if (indiceExistente !== -1) {
        const copia = [...lista]
        copia[indiceExistente] = {
          ...copia[indiceExistente],
          cantidad: copia[indiceExistente].cantidad + cantidad,
        }
        return copia
      }
      return [
        ...lista,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad,
          unidad: producto.unidad,
        },
      ]
    })
  }

  function changeQty(indice, cambio) {
    setItems((lista) => {
      const copia = [...lista]
      copia[indice] = { ...copia[indice], cantidad: copia[indice].cantidad + cambio }
      if (copia[indice].cantidad <= 0) {
        copia.splice(indice, 1)
      }
      return copia
    })
  }

  function removeItem(indice) {
    setItems((lista) => lista.filter((_, i) => i !== indice))
  }

  function clear() {
    setItems([])
    setDiscountRate(0)
    setCouponMessage(null)
  }

  function applyCoupon(codigoIngresado) {
    const codigo = codigoIngresado.trim().toUpperCase()
    if (CUPONES[codigo]) {
      setDiscountRate(CUPONES[codigo])
      setCouponMessage({ tipo: 'exito', texto: `Cupón del ${CUPONES[codigo] * 100}% aplicado!!` })
    } else {
      setDiscountRate(0)
      setCouponMessage({ tipo: 'error', texto: 'Cupón no valido' })
    }
  }

  function cantidadEnCarrito(productoId) {
    const item = items.find((i) => i.id === productoId)
    return item ? item.cantidad : 0
  }

  const subtotal = useMemo(() => items.reduce((acc, item) => acc + item.precio * item.cantidad, 0), [items])
  const discountAmount = useMemo(() => Math.round(subtotal * discountRate), [subtotal, discountRate])
  const total = subtotal - discountAmount
  const count = useMemo(() => items.reduce((acc, item) => acc + (item.cantidad || 1), 0), [items])

  const value = {
    items,
    addToCart,
    changeQty,
    removeItem,
    clear,
    applyCoupon,
    couponMessage,
    discountRate,
    subtotal,
    discountAmount,
    total,
    count,
    cantidadEnCarrito,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}
