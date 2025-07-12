import { Student } from "../models/Student";

export class StudentService {
  private students: Student[] = [];

  createStudent(name: string, id: string): Student {
    if (!name) throw new Error("Nombre requerido");
    if (this.students.some((item) => item.id === id))
      throw new Error("Estudiante ya existe con este ID");

    const student = new Student(name, id);
    this.students.push(student);
    return student;
  }
  updateStudent(id: string, newName: string): Student {
    if (!newName) throw new Error("Nombre requerido");
    const student = this.students.find((item) => item.id === id);
    if (!student) throw new Error("Estudiante no existe");
    student.name = newName;
    return student;
  }
}
