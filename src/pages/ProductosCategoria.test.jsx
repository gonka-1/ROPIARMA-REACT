import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { expect, test } from "vitest";
import ProductosCategoria from "./ProductosCategoria";

test("Renderiza el contenedor principal si la categoría es válida", () => {
  const { container } = render(
    // Simula que el usuario entra a una categoría válida, por ejemplo "frutas"
    <MemoryRouter initialEntries={['/frutas']}>
      <Routes>
        <Route path="/:categoria" element={<ProductosCategoria />} />
      </Routes>
    </MemoryRouter>
  );

  const contenedor = container.querySelector('.contenedor');
  expect(contenedor).toBeInTheDocument();
});