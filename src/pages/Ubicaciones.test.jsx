import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import Ubicaciones from "./Ubicaciones";

test("Actualiza el título de la pestaña del navegador a 'Ubicación'", () => {
  render(<Ubicaciones />);
  
  expect(document.title).toBe("Ubicación");
});