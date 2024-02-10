// Prototipo de Alumno
function alumno(nombre, apellidos, edad, materiasInscritas,) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.materiasInscritas = materiasInscritas;
    this.calificaciones = {};
}

// Agregar Calificacion
alumno.prototype.agregarCalificacion = function(materia, calificacion) {
    this.calificaciones[materia].push(calificacion);
}

// Nueva instancia del prototipo Alumno con los datos proporcionados
let nuevoAlumno = new alumno(nombre, apellidos, edad, materias);

mostrarAlumno(nuevoAlumno);

// Agregar materias inscritas
alumno.agregarMateria("Matemáticas");
alumno.agregarMateria("Física");
alumno.agregarMateria("Programación");

// Agregar calificaciones en JavaScript
alumno.agregarCalificacion(85);
alumno.agregarCalificacion(90);
alumno.agregarCalificacion(75);

// Imprimir los detalles del alumno
console.log("Nombre:", alumno.nombre);
console.log("Apellidos:", alumno.apellidos);
console.log("Edad:", alumno.edad);
console.log("Materias inscritas:", alumno.materiasInscritas);
console.log("Calificaciones", alumno.calificaciones);

//Registro de alumno
function AgregarAlumno() {}

// Datos del formulario
let Aombre = document.getElementById("Nombre").value;
let Apellidos = document.getElementById("Apellidos").value;
let Edad = document.getElementById("Adad").value;
let Materias = document.getElementById("Materias").value.split(",");

// Limpiar el formulario después de agregar un alumno
document.getElementById("nombre").value = "";
document.getElementById("apellidos").value = "";
document.getElementById("edad").value = "";
document.getElementById("materias").value = "";
}

function mostrarAlumno(alumno) {
    let listaAlumnos = document.getElementById("listaAlumnos");
    let listItem = document.createElement("li");
    listItem.textContent = `Nombre: ${alumno.nombre}, Apellidos: ${alumno.apellidos}, Edad: ${alumno.edad}, Materias: ${alumno.materiasInscritas.join(", ")}`;
    listaAlumnos.appendChild(listItem);
}