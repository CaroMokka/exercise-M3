import { Student } from "../../src/models/Student";

describe("Student", () => {
  it("Debería crear un estudiante con nombre y con ID", () => {
    const estudiante = new Student("Carolina", "123");
    expect(estudiante.name).toBe("Carolina");
    expect(estudiante.id).toBe("123");
  });
});
