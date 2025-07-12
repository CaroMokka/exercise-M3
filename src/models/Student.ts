export class Student {
  public name: string;
  public id: string;
  constructor(name: string, id: string) {
    if (!name) throw new Error("Nombre requerido");
    if (!id) throw new Error("ID requerido");

    this.name = name;
    this.id = id;
  }
}
