import { describe, it, expect } from "vitest";
import { validarNifCif, poblacionesMadrid } from "./poblacionesMadrid";

describe("validarNifCif (validación simplificada de formato)", () => {
  describe("NIF válidos", () => {
    it("debería validar un NIF con formato correcto (8 números + letra)", () => {
      const resultado = validarNifCif("12345678Z");
      expect(resultado.valido).toBe(true);
      expect(resultado.tipo).toBe("NIF");
    });

    it("debería validar otro NIF con formato correcto", () => {
      const resultado = validarNifCif("00000000T");
      expect(resultado.valido).toBe(true);
      expect(resultado.tipo).toBe("NIF");
    });

    it("debería validar NIF con cualquier letra final", () => {
      // La validación simplificada acepta cualquier letra
      const resultado = validarNifCif("12345678A");
      expect(resultado.valido).toBe(true);
      expect(resultado.tipo).toBe("NIF");
    });
  });

  describe("NIF inválidos", () => {
    it("debería rechazar un NIF con formato incorrecto (menos de 8 números)", () => {
      const resultado = validarNifCif("1234567Z");
      expect(resultado.valido).toBe(false);
    });

    it("debería rechazar un NIF sin letra", () => {
      const resultado = validarNifCif("12345678");
      expect(resultado.valido).toBe(false);
    });
  });

  describe("NIE válidos", () => {
    it("debería validar un NIE con X", () => {
      const resultado = validarNifCif("X0000000T");
      expect(resultado.valido).toBe(true);
      expect(resultado.tipo).toBe("NIE");
    });

    it("debería validar un NIE con Y", () => {
      const resultado = validarNifCif("Y0000000Z");
      expect(resultado.valido).toBe(true);
      expect(resultado.tipo).toBe("NIE");
    });

    it("debería validar un NIE con Z", () => {
      const resultado = validarNifCif("Z0000000M");
      expect(resultado.valido).toBe(true);
      expect(resultado.tipo).toBe("NIE");
    });

    it("debería validar NIE con cualquier letra final", () => {
      // La validación simplificada acepta cualquier letra
      const resultado = validarNifCif("X0000000A");
      expect(resultado.valido).toBe(true);
      expect(resultado.tipo).toBe("NIE");
    });
  });

  describe("NIE inválidos", () => {
    it("debería rechazar un NIE con formato incorrecto", () => {
      const resultado = validarNifCif("X000000T"); // Solo 6 números
      expect(resultado.valido).toBe(false);
    });
  });

  describe("CIF válidos", () => {
    it("debería validar un CIF de sociedad anónima", () => {
      const resultado = validarNifCif("A58818501");
      expect(resultado.valido).toBe(true);
      expect(resultado.tipo).toBe("CIF");
    });

    it("debería validar un CIF de sociedad limitada", () => {
      const resultado = validarNifCif("B12345674");
      expect(resultado.valido).toBe(true);
      expect(resultado.tipo).toBe("CIF");
    });

    it("debería validar CIF con cualquier dígito de control", () => {
      // La validación simplificada acepta cualquier dígito/letra de control
      const resultado = validarNifCif("A12345678");
      expect(resultado.valido).toBe(true);
      expect(resultado.tipo).toBe("CIF");
    });

    it("debería validar CIF con letra de control", () => {
      const resultado = validarNifCif("B1234567A");
      expect(resultado.valido).toBe(true);
      expect(resultado.tipo).toBe("CIF");
    });
  });

  describe("CIF inválidos", () => {
    it("debería rechazar un CIF con letra inicial no válida", () => {
      const resultado = validarNifCif("I12345678"); // I no es válida para CIF
      expect(resultado.valido).toBe(false);
    });

    it("debería rechazar un CIF con formato incorrecto", () => {
      const resultado = validarNifCif("B123456"); // Muy corto
      expect(resultado.valido).toBe(false);
    });
  });

  describe("Documentos vacíos o inválidos", () => {
    it("debería rechazar un documento vacío", () => {
      const resultado = validarNifCif("");
      expect(resultado.valido).toBe(false);
      expect(resultado.tipo).toBeNull();
    });

    it("debería rechazar un formato no reconocido", () => {
      const resultado = validarNifCif("ABC123");
      expect(resultado.valido).toBe(false);
      expect(resultado.tipo).toBeNull();
    });

    it("debería rechazar documentos muy cortos", () => {
      const resultado = validarNifCif("123");
      expect(resultado.valido).toBe(false);
    });
  });

  describe("Normalización", () => {
    it("debería aceptar minúsculas", () => {
      const resultado = validarNifCif("12345678z");
      expect(resultado.valido).toBe(true);
    });

    it("debería ignorar espacios y guiones", () => {
      const resultado = validarNifCif("12-345-678-Z");
      expect(resultado.valido).toBe(true);
    });
  });
});

describe("poblacionesMadrid", () => {
  it("debería contener Madrid", () => {
    const madrid = poblacionesMadrid.find(p => p.nombre === "Madrid");
    expect(madrid).toBeDefined();
    expect(madrid?.codigoPostal).toBe("28001");
  });

  it("debería contener poblaciones principales", () => {
    const poblacionesPrincipales = [
      "Alcalá de Henares",
      "Getafe",
      "Leganés",
      "Móstoles",
      "Alcorcón"
    ];
    
    for (const nombre of poblacionesPrincipales) {
      const poblacion = poblacionesMadrid.find(p => p.nombre === nombre);
      expect(poblacion).toBeDefined();
      expect(poblacion?.codigoPostal).toMatch(/^28/);
    }
  });

  it("todas las poblaciones deberían tener código postal de Madrid", () => {
    for (const poblacion of poblacionesMadrid) {
      expect(poblacion.codigoPostal).toMatch(/^28/);
    }
  });
});
