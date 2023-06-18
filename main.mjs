
const boton1 = document.getElementById("boton1");
const boton2 = document.getElementById("boton2");
const boton3 = document.getElementById("boton3");
const boton4 = document.getElementById("boton4");
const borrar = document.getElementById('borrar');
const ingrese = document.getElementById('ingrese');
const mostrar = document.getElementById("mostrar");
let alumnos = [];
console.log("inicio");
if (!localStorage.getItem('alumnos')) {
  // El localStorage está vacío, cargar los datos del JSON
  fetch('./alumnos.json')
    .then(response => response.json())
    .then(data => {
      // Asignar los datos del archivo JSON al array alumnos
      const alumnoscargados = data;
      console.log(alumnoscargados);
console.log("cargado");
      // Guardar los datos en el localStorage
      localStorage.setItem('alumnos', JSON.stringify(alumnoscargados));
    })
    .catch(error => {
      console.log('Error:', error);
    });
} else{
  console.log("ya hay cargadas");
}
ingrese.addEventListener('click', () => {
  Swal.fire({
    title: 'Guardar Alumnos',
    html: `
      <label for="nombre">Nombre:</label><br>
      <input type="text" id="nombre" required><br><br>
      <label for="nMat">Nota de Matemáticas:</label><br>
      <input type="number" id="nMat" required><br><br>
      <label for="nLeng">Nota de Lenguaje:</label><br>
      <input type="number" id="nLeng" required><br><br>
      <label for="nHist">Nota de Historia:</label><br>
      <input type="number" id="nHist" required><br>
    `,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    focusConfirm: false,
    preConfirm: () => {
      const nombre = document.getElementById('nombre').value;
      const nMat = parseInt(document.getElementById('nMat').value);
      const nLeng = parseInt(document.getElementById('nLeng').value);
      const nHist = parseInt(document.getElementById('nHist').value);

      let promed = nMat + nLeng + nHist ;
      promed = promed /3;
      // Crear objeto alumno
      const alumno = {
        nombre: nombre,
        NMat: nMat,
        NLeng: nLeng,
        NHist: nHist,
        promedio: promed
      };
    
      let alumnos = localStorage.getItem('alumnos');
        alumnos = JSON.parse(alumnos);
        console.log(alumnos);
        alumnos.push(alumno);
        localStorage.setItem('alumnos', JSON.stringify(alumnos));




    }
  }).then((result) => {
    if (result.isConfirmed) {
      const alumno = result.value;

      // Aquí puedes hacer algo con los datos del alumno

      Swal.fire('¡Guardado!', `El alumno ${alumno.nombre} ha sido guardado.`, 'success');
    }
  });
});



boton1.addEventListener('click', () => {
  const alumnosGuardados = localStorage.getItem('alumnos');
  const alumnos = JSON.parse(alumnosGuardados);
  let contenido = ""; 

  alumnos.forEach(item => {
    contenido += "<p>El alumno " + item.nombre + " tiene un promedio de " + item.promedio + "</p>";
  });

  mostrar.innerHTML = contenido; 
});




borrar.addEventListener('click', function() {
  // Eliminar todos los elementos almacenados en localStorage
localStorage.clear();


});

boton2.addEventListener('click', () => {
  const alumnosGuardados = localStorage.getItem('alumnos');
  const alumnos = JSON.parse(alumnosGuardados);
  let contenido = ""; 

  alumnos.forEach(item => {
    contenido += "<p>El alumno " + item.nombre + " tiene una nota de " + item.nLeng + " en lengua </p>";
  });

  mostrar.innerHTML = contenido; 
});


boton3.addEventListener('click', () => {
  const alumnosGuardados = localStorage.getItem('alumnos');
  const alumnos = JSON.parse(alumnosGuardados);
  let contenido = ""; 

  alumnos.forEach(item => {
    contenido += "<p>El alumno " + item.nombre + " tiene una nota de " + item.nMat + " en matematica</p>";
  });

  mostrar.innerHTML = contenido; 
});

boton4.addEventListener('click', () => {
  const alumnosGuardados = localStorage.getItem('alumnos');
  const alumnos = JSON.parse(alumnosGuardados);
  let contenido = ""; 

  alumnos.forEach(item => {
    contenido += "<p>El alumno " + item.nombre + " tiene una nota de " + item.nHist + " en historia</p>";
  });

  mostrar.innerHTML = contenido; 
});