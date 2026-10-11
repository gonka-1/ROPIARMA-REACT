import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App_alert from "./alert";




test("Probar que la alerta muestra el mensaje", () => {
    render(
        <App_alert
            mostrarAlert={true}
            cerrarAlert={() => {}}
            variant="success"
            msgAlert="Producto agregado"
        />
    )

    expect(screen.getByText("Producto agregado")).toBeInTheDocument();
})