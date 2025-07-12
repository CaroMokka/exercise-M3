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
}
