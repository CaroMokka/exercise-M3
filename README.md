# App-Educativa

Informe resumido del desarrollo y pruebas de la aplicación educativa con TDD, patrón repositorio híbrido y principios de diseño SOLID.

---

## Requerimiento 1

Se desarrolló el método `createStudent()`.  
Inicialmente arrojó un error (**RED**) indicando que `StudentService` no era un constructor.  
Esto llevó a implementar la clase `Student` con una versión básica, logrando pasar la prueba (**GREEN**).  
Luego se refactorizó para agregar propiedades y validaciones, validando correctamente el método (`REFACTOR`).

---

## Ciclo TDD (RED-GREEN-REFACTOR)

- RED: pruebas fallidas al inicio.
- GREEN: implementación funcional del método.
- REFACTOR: mejoras con propiedades y validaciones.

_Evidencias:_  
- Consola de errores iniciales  
- Consola de pruebas superadas  
- Fragmentos de `Student.ts` y `StudentService.ts` después del refactor.

---

## Repositorio en memoria

Para pruebas unitarias se usa `this.students[]` como repositorio en memoria (`InMemoryRepository`), simulando una base de datos real.

**Ventajas:**  
- Pruebas rápidas e independientes  
- Aislamiento de la lógica de negocio  
- Evita depender de un motor de base de datos real en cada prueba

Para integración real se utiliza `openDb()` con SQLite para persistencia.

---

## Cobertura de Testing

CRUD validado con tests unitarios y de integración.  
Combina mock manual (`InMemoryRepository`) y conexión real (`SQLite`).

---

## Principios de Diseño

- **DRY:** Validación centralizada de campos y IDs duplicados.
- **KISS:** Métodos claros y cortos con nombres descriptivos.
- **SRP:** Separación de modelo (`Student`), servicio (`StudentService`) e infraestructura (`connection.ts`).
- **Patrón repositorio híbrido:** facilita pruebas unitarias y persistencia real.
- **Mejora propuesta:** usar `IStudentRepository` con `SqliteStudentRepository` o `MockStudentRepository` para mayor desac acoplamiento y testabilidad (**SOLID**).

---

## Estructura del proyecto

- src/ -> Modelos, servicios, conexión DB
- tests/ -> Unitarias e integración
- database/ -> SQLite

