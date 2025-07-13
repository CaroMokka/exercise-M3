import { StudentService } from "../src/services/StudentService";

(async () => {
  const service = new StudentService();
  await service.createTable();

  await service.createStudent("1", "Alice");
  await service.createStudent("2", "Bob");

  console.log(await service.getAllStudents());

  await service.updateStudent("1", "Alicia");
  console.log(await service.getAllStudents());

  await service.deleteStudent("2");
  console.log(await service.getAllStudents());
})();
