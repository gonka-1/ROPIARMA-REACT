import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import { CartProvider } from "../context/CartContext";
import Carrito from "./Carrito";

test("Probar alerta al continuar compra con el carrito vaio", () =>{
    render(
        <MemoryRouter>
            <CartProvider>
                <Carrito />
            </CartProvider>
        </MemoryRouter>
    )

    fireEvent.click(screen.getByText("Continuar compra"));

    expect(screen.getByText(/Tu carrito está lleno/)).toBeInTheDocument();
})