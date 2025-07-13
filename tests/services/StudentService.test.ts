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

describe("StudentService - updateStudent", () => {
  it("Debería modificar el estudiante existente", () => {
    const service = new StudentService();
    service.createStudent("Alicia", "001");
    const updated = service.updateStudent("001", "Alicia");
    expect(updated.name).toBe("Alicia");
  });
  it("Debería dar error si el estudiante no existe", () => {
    const service = new StudentService();
    expect(() => {
      service.updateStudent("000", "Ghost");
    }).toThrow("Estudiante no encontrado");
  });
  it("Debería validar los campos requeridos", () => {
    const service = new StudentService();
    service.createStudent("Alicia", "001");
    expect(() => {
      service.updateStudent("001", "");
    }).toThrow("Nombre requerido");
  });
});

describe("StudentService - deleteStudent", () => {
  it("Debería eliminar un estudiante existente", () => {
    const service = new StudentService();
    service.createStudent("Manuel", "002");
    service.deleteStudent("002");
    expect(service.getAllStudents().length).toBe(0);
  });
  it("Debería dar error si el estudiante no existe", () => {
    const service = new StudentService();
    expect(() => {
      service.deleteStudent("888");
    }).toThrow("Estudiante no encontrado");
  });
});

describe("StudentService - getAllStudents", () => {
  it("Debería retornar todos los estudiantes", () => {
    const service = new StudentService();
    service.createStudent("Camila", "003");
    service.createStudent("José", "004");
    const students = service.getAllStudents();
    expect(students.length).toBe(2);
  });
});
