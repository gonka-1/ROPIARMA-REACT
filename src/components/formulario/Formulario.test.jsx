import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Formulario from "./Formulario"

// Comprobar que el Formulario genera una alerta en el caso que el usuario 
// intente Guardar sin llenar algún campo obligatorio

test("Probar alerta al guardar con campos obligatorios vacíos", () => {
    render(
        <Formulario
            campos={[{ nombre: "nombre", etiqueta: "Nombre", requerido: true }]}
        />
    )
    
    fireEvent.click(screen.getByText("Guardar"));

    expect(screen.getByText(/Por favor, completa todos los campos obligatorios/)).toBeInTheDocument();

})