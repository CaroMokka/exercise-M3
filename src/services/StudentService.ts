import { openDb } from "../../database/connection";
import { Student } from "../models/Student";

export class StudentService {
  private students: Student[] = [];
  async createTable() {
    const db = await openDb();
    await db.exec(`CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL
    )`);
  }

  async createStudent(name: string, id: string): Promise<Student> {
    if (!name) throw new Error("Nombre requerido");
    if (this.students.some((item) => item.id === id))
      throw new Error("Estudiante ya existe con este ID");

    const db = await openDb();
    const exists = await db.get("SELECT * FROM students WHERE id = ?", [id]);
    if (exists) throw new Error("Estudiante ya existe con este ID");
    await db.run("INSERT INTO students (id, name) VALUES (?, ?)", [id, name]);
    const student = new Student(name, id);
    this.students.push(student);
    return student;
  }
  async updateStudent(id: string, newName: string): Promise<Student> {
    if (!newName) throw new Error("Nombre requerido");
    const student = this.students.find((item) => item.id === id);
    if (!student) throw new Error("Estudiante no encontrado");
    student.name = newName;
    const db = await openDb();
    await db.run("UPDATE students SET name = ? WHERE id = ?", [newName, id]);
    return student;
  }
  async deleteStudent(id: string): Promise<void> {
    if (!id) throw new Error("ID requerido");
    const studentIndex = this.students.findIndex((item) => item.id === id);
    if (studentIndex === -1) throw new Error("Estudiante no encontrado");
    this.students.splice(studentIndex, 1);
    const db = await openDb();
    await db.run("DELETE FROM students WHERE id = ?", [id]);
  }

  async getAllStudents(): Promise<Student[]> {
    const db = await openDb();
    const students = await db.all("SELECT * FROM students");
    return this.students;
  }
}
