import { StudentService } from "../../src/services/StudentService";

describe("StudentService - createStudent", () => {
  it("Debería crear un nuevo estudiante", () => {
    const servicio = new StudentService();
    const estudiante = servicio.createStudent("Carolina", "123");
    expect(estudiante.name).toBe("Carolina");
    expect(estudiante.id).toBe("123");
  });
  it("Debería no permitir duplicar los IDs", () => {
    const servicio = new StudentService();
    servicio.createStudent("Carolina", "123");
    expect(() => {
      servicio.createStudent("Francisca", "123");
    }).toThrow("Estudiante ya existe con este ID");
  });
  it("Debería validar campos requeridos", () => {
    const servicio = new StudentService();
    expect(() => {
      servicio.createStudent("", "122");
    }).toThrow("Nombre requerido");
  });
});
