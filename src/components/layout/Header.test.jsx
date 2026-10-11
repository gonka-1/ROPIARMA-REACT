import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import { CartProvider } from "../../context/CartContext";
import { SessionProvider } from "../../context/SessionContext";
import Header from "./Header";

test("Probar alerta del header al cerrar sesión", () => {
    render(
        <MemoryRouter>
            <SessionProvider>
                <CartProvider>
                    <Header />
                </CartProvider>
            </SessionProvider>
        </MemoryRouter>
    );


    fireEvent.click(screen.getByText("Cerrar sesión"));

    expect(screen.getByText("Sesion cerrada correctamente")).toBeInTheDocument();
});