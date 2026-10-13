import { useEffect } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import { CartProvider } from "../../context/CartContext";
import { SessionProvider, useSession } from "../../context/SessionContext";
import Header from "./Header";

function LoginPrevio() {
    const { login } = useSession();
    useEffect(() => {
        login({ nombre: "Test", email: "test@test.com" });
    }, []);
    return null;
}

test("Probar alerta del header al cerrar sesión", async () => {
    render(
        <MemoryRouter>
            <SessionProvider>
                <CartProvider>
                    <LoginPrevio />
                    <Header />
                </CartProvider>
            </SessionProvider>
        </MemoryRouter>
    );

    fireEvent.click(await screen.findByText(/cerrar sesión/i));

    expect(await screen.findByText("Sesion cerrada correctamente")).toBeInTheDocument();
});