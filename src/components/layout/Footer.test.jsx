import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import Footer from "./Footer";

test("Probar alerta del footer al suscribirse sin correo", () => {
    render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    )

    fireEvent.click(screen.getByText("Suscribirse"));

    expect(screen.getByText("Correo no valido para la suscripción")).toBeInTheDocument();
});