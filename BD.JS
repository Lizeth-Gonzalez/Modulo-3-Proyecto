// Definición del prototipo Alumno
function Alumno(nombre, apellidos, edad) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.edad = edad;
    this.materiasInscritas = [];
    this.calificaciones = {};
}

// Método para inscribir una materia
Alumno.prototype.inscribirMateria = function(materia) {
    this.materiasInscritas.push(materia);
}

// Método para asignar calificación a una materia
Alumno.prototype.asignarCalificacion = function(materia, calificacion) {
    this.calificaciones[materia] = calificacion;
}

// Crear una instancia de Alumno
let alumno1 = new Alumno("Carlos", "Jimenez", 17);

// Agregar materias inscritas
alumno1.agregarMateria("Matemáticas");
alumno1.agregarMateria("Física");
alumno1.agregarMateria("Programación");

// Agregar calificaciones en JavaScript
alumno1.agregarCalificacionJavaScript(85);
alumno1.agregarCalificacionJavaScript(90);
alumno1.agregarCalificacionJavaScript(75);

// Imprimir los detalles del alumno
console.log("Nombre:", alumno1.nombre);
console.log("Apellidos:", alumno1.apellidos);
console.log("Edad:", alumno1.edad);
console.log("Materias inscritas:", alumno1.materiasInscritas);
console.log("Calificaciones en JavaScript:", alumno1.calificacionesJavaScript);


// Array para almacenar los alumnos dados de alta
var listaAlumnos = [];

// Función para agregar un alumno
function agregarAlumno() {
    // Obtener los valores del formulario
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellido").value;
    let edad = document.getElementById("edad").value;

    // Validar que se ingresaron todos los datos
    if (nombre && apellidos && edad) {
        // Crear una instancia de Alumno
        let nuevoAlumno = new Alumno(nombre, apellidos, edad);
        
        // Agregar el nuevo alumno a la lista
        listaAlumnos.push(nuevoAlumno);

        // Limpiar los campos del formulario
        document.getElementById("nombre").value = "";
        document.getElementById("apellidos").value = "";
        document.getElementById("edad").value = "";

        // Confirmar que el alumno se ha dado de alta correctamente
        alert("Alumno dado de alta correctamente");
    } else {
        // Mostrar un mensaje de error si no se ingresaron todos los datos
        alert("Por favor, ingrese todos los datos del alumno.");
    }
}
