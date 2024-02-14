let alumnos = [];
let grupos = {};

function Alumno(nombre, apellidos, edad) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.edad = edad;
    this.materias = [];
    this.calificaciones = {};
}

function Grupo(nombre) {
    this.nombre = nombre;
    this.alumnos = [];
}

function registrarAlumno() {
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let edad = document.getElementById("edad").value;

    let nuevoAlumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(nuevoAlumno);
    mostrarAlumnos();
    limpiarFormulario();
}

function inscribirAlumnoAGrupo() {
    let alumnoIndex = document.getElementById("alumnoIndex").value;
    let grupo = document.getElementById("grupo").value;

    if (alumnoIndex >= 0 && alumnoIndex < alumnos.length && grupos.hasOwnProperty(grupo)) {
        grupos[grupo].alumnos.push(alumnos[alumnoIndex]);
        mostrarGrupos();
    } else {
        alert("Indice de alumno o nombre de grupo incorrecto");
    }
}

function asignarCalificaciones() {
    let alumnoIndex = document.getElementById("alumnoIndexCal").value;
    let materia = document.getElementById("materia").value;
    let calificacion = document.getElementById("calificacion").value;

    if (alumnoIndex >= 0 && alumnoIndex < alumnos.length) {
        alumnos[alumnoIndex].calificaciones[materia] = calificacion;
        mostrarAlumnos();
        limpiarFormularioCal();
    } else {
        alert("Indice de alumno incorrecto");
    }
}

function crearGrupo() {
    let nombreGrupo = prompt("Ingrese el nombre del grupo:");

    if (nombreGrupo) {
        grupos[nombreGrupo] = new Grupo(nombreGrupo);
        mostrarGrupos();
    }
}

function mostrarAlumnos() {
    let listaAlumnos = document.getElementById("lista-alumnos");
    listaAlumnos.innerHTML = "";
    alumnos.forEach((alumno, index) => {
        let li = document.createElement("li");
        li.textContent = `${index}: ${alumno.nombre} ${alumno.apellidos} - Edad: ${alumno.edad}`;
        listaAlumnos.appendChild(li);
    });
}

function mostrarGrupos() {
    let listaGrupos = document.getElementById("lista-grupos");
    listaGrupos.innerHTML = "";
    for (let nombreGrupo in grupos) {
        let li = document.createElement("li");
        li.textContent = `${nombreGrupo}: `;
        grupos[nombreGrupo].alumnos.forEach(alumno => {
            li.textContent += `${alumno.nombre} ${alumno.apellidos}, `;
        });
        listaGrupos.appendChild(li);
    }
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("edad").value = "";
}

function limpiarFormularioCal() {
    document.getElementById("alumnoIndexCal").value = "";
    document.getElementById("materia").value = "";
    document.getElementById("calificacion").value = "";
}
function buscarPorNombre(nombre) {
    let resultados = alumnos.filter(alumno => alumno.nombre.toLowerCase() === nombre.toLowerCase());
    return resultados;
}

function buscarPorApellido(apellido) {
    let resultados = alumnos.filter(alumno => alumno.apellidos.toLowerCase() === apellido.toLowerCase());
    return resultados;
}

function obtenerPromedioAlumno(nombre, apellido) {
    let alumno = buscarPorNombre(nombre)[0];
    if (!alumno) return "Alumno no encontrado";
    let promedio = 0;
    let calificaciones = Object.values(alumno.calificaciones);
    if (calificaciones.length > 0) {
        let suma = calificaciones.reduce((total, calificacion) => total + parseFloat(calificacion), 0);
        promedio = suma / calificaciones.length;
    }
    return promedio.toFixed(2);
}

function obtenerPromedioGrupo(nombreGrupo) {
    let grupo = grupos[nombreGrupo];
    if (!grupo) return "Grupo no encontrado";
    let promedio = 0;
    let totalAlumnos = grupo.alumnos.length;
    if (totalAlumnos === 0) return "El grupo está vacío";
    let suma = 0;
    grupo.alumnos.forEach(alumno => {
        let calificaciones = Object.values(alumno.calificaciones);
        if (calificaciones.length > 0) {
            suma += calificaciones.reduce((total, calificacion) => total + parseFloat(calificacion), 0);
        }
    });
    promedio = suma / (totalAlumnos * Object.keys(grupo.alumnos[0].calificaciones).length);
    return promedio.toFixed(2);
}

function obtenerListaAlumnosOrdenAsc() {
    let listaOrdenada = alumnos.slice().sort((a, b) => {
        let sumaA = Object.values(a.calificaciones).reduce((total, calificacion) => total + parseFloat(calificacion), 0);
        let sumaB = Object.values(b.calificaciones).reduce((total, calificacion) => total + parseFloat(calificacion), 0);
        return sumaA - sumaB;
    });
    return listaOrdenada;
}

function obtenerListaAlumnosOrdenDesc() {
    let listaOrdenada = alumnos.slice().sort((a, b) => {
        let sumaA = Object.values(a.calificaciones).reduce((total, calificacion) => total + parseFloat(calificacion), 0);
        let sumaB = Object.values(b.calificaciones).reduce((total, calificacion) => total + parseFloat(calificacion), 0);
        return sumaB - sumaA;
    });
    return listaOrdenada;
}

// Punto extra: Ordenamiento por edad
function obtenerListaAlumnosOrdenEdadAsc() {
    let listaOrdenada = alumnos.slice().sort((a, b) => a.edad - b.edad);
    return listaOrdenada;
}

function obtenerListaAlumnosOrdenEdadDesc() {
    let listaOrdenada = alumnos.slice().sort((a, b) => b.edad - a.edad);
    return listaOrdenada;
}

function MostrarListaOrdenada(){

}

function MostrarCalificaciones(){

}


