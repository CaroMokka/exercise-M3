import { openDb } from "../../database/connection";
import { StudentService } from "../../src/services/StudentService";

describe("StudentService - integration", () => {
  const service = new StudentService();

  beforeEach(async () => {
    const db = await openDb();
    await db.exec("DROP TABLE IF EXISTS students");
    await service.createTable();
  });
  describe("createStudent", () => {
    it("Debería crear un nuevo estudiante", async () => {
      const estudiante = await service.createStudent("Carolina", "123");
      expect(estudiante.name).toBe("Carolina");
      expect(estudiante.id).toBe("123");
    });
    it("Debería no permitir duplicar los IDs", async () => {
      const servicio = new StudentService();
      await servicio.createStudent("Carolina", "123");
      await expect(servicio.createStudent("Francisca", "123")).rejects.toThrow(
        "Estudiante ya existe con este ID"
      );
    });
    it("Debería validar campos requeridos", async () => {
      const servicio = new StudentService();
      await expect(servicio.createStudent("", "122")).rejects.toThrow(
        "Nombre requerido"
      );
    });
  });
  describe("updateStudent", () => {
    it("Debería modificar el estudiante existente", async () => {
      const service = new StudentService();
      await service.createStudent("Alicia", "001");

      const updated = await service.updateStudent("001", "Alicia actualizada");
      expect(updated.name).toBe("Alicia actualizada");
      expect(updated.id).toBe("001");
    });
    it("Debería dar error si el estudiante no existe", async () => {
      const service = new StudentService();
      await expect(service.updateStudent("999", "Ghost")).rejects.toThrow(
        "Estudiante no encontrado"
      );
    });
    it("Debería validar los campos requeridos", async () => {
      const service = new StudentService();
      await service.createStudent("Alicia", "001");
      await expect(service.updateStudent("001", "")).rejects.toThrow(
        "Nombre requerido"
      );
    });
  });
  describe("deleteStudent", () => {
    it("Debería eliminar un estudiante existente", async () => {
      const service = new StudentService();
      await service.createStudent("Manuel", "002");
      await service.deleteStudent("002");
      const students = await service.getAllStudents();
      const exists = students.find((s) => s.id === "002");
      expect(exists).toBeUndefined();
    });
    it("Debería dar error si el estudiante no existe", async () => {
      const service = new StudentService();
      await expect(service.deleteStudent("888")).rejects.toThrow(
        "Estudiante no encontrado"
      );
    });
  });

  describe("getAllStudents", () => {
    it("Debería retornar todos los estudiantes", async () => {
      const service = new StudentService();
      await service.createStudent("Camila", "003");
      await service.createStudent("José", "004");
      const students = await service.getAllStudents();
      expect(students.length).toBe(2);
    });
  });
});
