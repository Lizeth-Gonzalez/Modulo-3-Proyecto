let alumnos = [];
let grupos = {};

function iniciar() {
    alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    grupos = JSON.parse(localStorage.getItem("grupos")) || {};
}

iniciar();
mostrarAlumnos();
mostrarGrupos();
mostrarCalificaciones();

function ActualizarBaseDatos() {
    localStorage.removeItem('alumnos');
    localStorage.removeItem('grupos');
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    localStorage.setItem('grupos', JSON.stringify(grupos));
}

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
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const edad = document.getElementById("edad").value;

    if (nombre.trim() !== '' && apellidos.trim() !== '' && edad.trim() !== '') {
        let nuevoAlumno = new Alumno(nombre, apellidos, edad);
        alumnos.push(nuevoAlumno);
        mostrarAlumnos();
        limpiarFormulario();
        alert("Alumno dado de alta correctamente");
        ActualizarBaseDatos();
    } else {
        alert("Por favor, ingrese todos los datos del alumno");
    }
}

function inscribirAlumnoAGrupo() {
    let alumnoIndex = document.getElementById("alumnoIndex").value;
    let grupo = document.getElementById("grupo").value;

    if (alumnoIndex >= 0 && alumnoIndex < alumnos.length && grupos.hasOwnProperty(grupo)) {
        grupos[grupo].alumnos.push(alumnos[alumnoIndex]);
        mostrarGrupos();
        ActualizarBaseDatos();
    } else {
        alert("Indice de alumno/nombre de grupo incorrecto o campo vacio");
    }
}

function asignarCalificaciones() {
    let alumnoIndex = document.getElementById("alumnoIndexCal").value;
    let materia = document.getElementById("materia").value;
    let calificacion = document.getElementById("calificacion").value;

    if (alumnoIndex >= 0 && alumnoIndex < alumnos.length) {
        alumnos[alumnoIndex].calificaciones[materia] = calificacion;
        mostrarCalificaciones();
        limpiarFormularioCal();
        ActualizarBaseDatos();
    } else {
        alert("Indice/materia de alumno incorrecto o campo vacio");
    }
}

function mostrarCalificaciones() {
    let listaCalificiones = document.getElementById("lista-calificaciones");
    listaCalificiones.innerHTML = "";
    alumnos.forEach((alumno, index) => {
        let li = document.createElement("li");
        li.textContent = `${index}: ${alumno.nombre} ${alumno.apellidos} - Edad: ${alumno.edad}\n`;
        listaCalificiones.appendChild(li);
        for (let materia in alumno.calificaciones) {
            li.textContent += ` - ${materia}: ${alumno.calificaciones[materia]}\n`;
            listaCalificiones.appendChild(li);
        }
    });
}

function crearGrupo() {
    let nombreGrupo = prompt("Ingrese el nombre del grupo:");

    if (nombreGrupo) {
        grupos[nombreGrupo] = new Grupo(nombreGrupo);
        mostrarGrupos();
        ActualizarBaseDatos();
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

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("edad").value = "";
    // formulario Inscribir a Grupo
    document.getElementById("alumnoIndex").value = "";
    document.getElementById("grupo").value = "";
}

function limpiarFormularioCal() {
    document.getElementById("alumnoIndexCal").value = "";
    document.getElementById("materia").value = "";
    document.getElementById("calificacion").value = "";
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
    // Implementa funcionalidad si es necesario
}

//Buscador

function filtrarAlumnos() {
    let textoBusqueda = document.getElementById('buscador').value.toLowerCase();
    let alumnosFiltrados = alumnos.filter(alumno =>
        alumno.nombre.toLowerCase().includes(textoBusqueda) || alumno.apellidos.toLowerCase().includes(textoBusqueda)
    );
    mostrarAlumnosFiltrados(alumnosFiltrados);
}

function mostrarAlumnosFiltrados(alumnosFiltrados) {
    let listaAlumnos = document.getElementById("lista-alumnos");
    listaAlumnos.innerHTML = "";
    alumnosFiltrados.forEach((alumno, index) => {
        let li = document.createElement("li");
        li.textContent = `${index}: ${alumno.nombre} ${alumno.apellidos} - Edad: ${alumno.edad}`;
        listaAlumnos.appendChild(li);
    });
}

function calcularPromedioAlumno() {
    let nombre = prompt("Ingrese el nombre del alumno:");
    let apellido = prompt("Ingrese el apellido del alumno:");
    let promedio = obtenerPromedioAlumno(nombre, apellido);
    alert(`El promedio del alumno ${nombre} ${apellido} es: ${promedio}`);
}

function calcularPromedioGrupo() {
    let nombreGrupo = prompt("Ingrese el nombre del grupo:");
    let promedio = obtenerPromedioGrupo(nombreGrupo);
    alert(`El promedio del grupo ${nombreGrupo} es: ${promedio}`);
}

function ordenarAscendente() {
    let listaOrdenada = obtenerListaAlumnosOrdenAsc();
    mostrarAlumnosOrdenadas(listaOrdenada);
}

function ordenarDescendente() {
    let listaOrdenada = obtenerListaAlumnosOrdenDesc();
    mostrarAlumnosOrdenadas(listaOrdenada);
}

function mostrarAlumnosOrdenadas(listaOrdenada) {
    let listaAlumnos = document.getElementById("lista-alumnos");
    listaAlumnos.innerHTML = "";
    listaOrdenada.forEach((alumno, index) => {
        let li = document.createElement("li");
        li.textContent = `${index}: ${alumno.nombre} ${alumno.apellidos} - Edad: ${alumno.edad}`;
        listaAlumnos.appendChild(li);
    });
}

// Cálculo y ordenamiento
function obtenerPromedioAlumno(nombre, apellido) {
    let alumno = alumnos.find(alumno => alumno.nombre.toLowerCase() === nombre.toLowerCase() && alumno.apellidos.toLowerCase() === apellido.toLowerCase());
    if (!alumno) return "Alumno no encontrado";
    let calificaciones = Object.values(alumno.calificaciones);
    if (calificaciones.length === 0) return "No hay calificaciones registradas para este alumno";
    let suma = calificaciones.reduce((total, calificacion) => total + parseFloat(calificacion), 0);
    let promedio = suma / calificaciones.length;
    return promedio.toFixed(2);
}

function obtenerPromedioGrupo(nombreGrupo) {
    let grupo = grupos[nombreGrupo];
    if (!grupo) return "Grupo no encontrado";
    let calificacionesTotales = 0;
    let cantidadCalificaciones = 0;
    grupo.alumnos.forEach(alumno => {
        let calificaciones = Object.values(alumno.calificaciones);
        calificacionesTotales += calificaciones.reduce((total, calificacion) => total + parseFloat(calificacion), 0);
        cantidadCalificaciones += calificaciones.length;
    });
    if (cantidadCalificaciones === 0) return "No hay calificaciones registradas en este grupo";
    let promedio = calificacionesTotales / cantidadCalificaciones;
    return promedio.toFixed(2);
}

function calcularSumaCalificaciones(alumno) {
    let calificaciones = Object.values(alumno.calificaciones);
    let suma = calificaciones.reduce((total, calificacion) => total + parseFloat(calificacion), 0);
    return suma;
}

function obtenerListaAlumnosOrdenDesc() {
    let listaOrdenada = alumnos.slice().sort((a, b) => {
        let sumaA = calcularSumaCalificaciones(a);
        let sumaB = calcularSumaCalificaciones(b);
        return sumaB - sumaA;
    });
    return listaOrdenada;
}

function obtenerListaAlumnosOrdenAsc() {
    let listaOrdenada = alumnos.slice().sort((a, b) => {
        let sumaA = calcularSumaCalificaciones(a);
        let sumaB = calcularSumaCalificaciones(b);
        return sumaA - sumaB;
    });
    return listaOrdenada;
}

