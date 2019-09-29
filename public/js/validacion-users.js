var campos = [
  { id: 'nombre', valido: false },
  { id: 'apellido', valido: false },
  { id: 'email', valido: false },
  { id: 'password', valido: false },
  { id: 'tipoUsuario', valido: false }
];

var tipoUsuarios = ['Administrador', 'Autor', 'Lector'];
    for (let i=0;i<tipoUsuarios.length; i++)
    document.getElementById('tipoUsuario').innerHTML += `<option value="${i}">${tipoUsuarios[i]}</option>`;

function validarCampos() {
  for (let i = 0; i < campos.length; i++)
      campos[i].valido = validarCampoVacio(campos[i].id);

      
  for (let i = 0; i < campos.length; i++)
      if (!campos[i].valido)
    return;
   
    
    console.log(persona);
    return persona;  
    
}

function validarCampoVacio(id) {
  let resultado = (document.getElementById(id).value == "") ? true : false;
  marcarInput(id, resultado);
  return resultado;

}

function validarCorreo(correo) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let resultado = re.test(correo.value);
  marcarInput(correo.id, resultado);
  return resultado;
}

function marcarInput(id, valido) {
  if (valido) {
      document.getElementById(id).classList.remove('is-valid');
      document.getElementById(id).classList.add('is-invalid');
  } else {
      document.getElementById(id).classList.remove('is-invalid');
      document.getElementById(id).classList.add('is-valid');
  }
}
/*function agregarUsuarios() {
  
 
  let persona = {
    nombre: document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    tipoUsuario: document.getElementById('tipoUsuario').value
  }
  validarCampos();
console.log(persona);
  document.getElementById('tabla-usuarios').innerHTML += 
        `<tr>
        <td></td>
            <td>${persona.nombre}</td>
            <td>${persona.apellido}</td>
            <td>${persona.correo}</td>
            <td>${persona.tipoUsuario}</td>
            <td style="width:70px;">
            <a href="#" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i></a>
            <a href="#" class="btn btn-xs btn-danger"><i class="fa fa-remove"></i></a>
            </td>
        </tr>`;
        limpiarModalUsuarios();
}*/


function limpiarModalUsuarios(id){
  document.getElementById('nombre').value='';
  document.getElementById('apellido').value='';
  document.getElementById('email').value='';
  document.getElementById('password').value='';
  document.getElementById('tipoUsuario').value='';
  document.getElementById(id).classList.remove('is-valid');

}