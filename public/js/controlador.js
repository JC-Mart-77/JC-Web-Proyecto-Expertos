
var campos = [
    { id: 'nombre', valido: false },
    { id: 'apellido', valido: false },
    { id: 'email', valido: false },
    { id: 'usuario', valido: false },
    { id: 'password', valido: false },
    { id: 'tipoUsuario', valido: false },
];
var datosPersonales=[
    {nombre:'Juan Carlos Martinez', usuario:'jcmh', correo:'juan@gmail.com', password:'asd.456', tipoUsuario:'Administrador'},
    {nombre:'Juan Carlos Martinez', usuario:'jcmh', correo:'juan@gmail.com', password:'asd.456', tipoUsuario:'Administrador'}
];


/*var tipoUsuarios = ['Administrador', 'Autor', 'Lector'];
    for (let i=0;i<tipoUsuarios.length; i++)
    document.getElementById('tipo-usuario').innerHTML += `<option value="${i}">${tipoUsuarios[i]}</option>`;
*/



function validarRegistro() {
    for (let i = 0; i < campos.length; i++)
        campos[i].valido = validarCampoVacio(campos[i].id);

    console.log(campos);
    for (let i = 0; i < campos.length; i++)
        if (!campos[i].valido)
            return;

  
    console.log(persona);
    console.log(i);
    
    
    

}

function validarCampoVacio(id) {
    let resultado = (document.getElementById(id).value == "") ? false : true;
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
        document.getElementById(id).classList.remove('is-invalid');
        document.getElementById(id).classList.add('is-valid');
    } else {
        document.getElementById(id).classList.remove('is-valid');
        document.getElementById(id).classList.add('is-invalid');
    }
}


/*funcion agregar usuarios ala tabla */
function agregarUsuarios() {
    
    

    let persona = {
        nombre: document.getElementById('nombre-completo').value,
        usuario: document.getElementById('nombre-usuario').value,
        correo: document.getElementById('correo').value,
        password: document.getElementById('password').value,
        tipoUsuario: document.getElementById('tipo-usuario').value,
    }
    
    document.getElementById('tabla-usuarios').innerHTML += 
        `<tr>
        <td></td>
            <td>${persona.nombre}</td>
            <td>${persona.usuario}</td>
            <td>${persona.correo}</td>
            <td>${persona.tipoUsuario}</td>
            <td style="width:70px;">
            <a href="#" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i></a>
            <a href="#" class="btn btn-xs btn-danger"><i class="fa fa-remove"></i></a>
            </td>
        </tr>`;
        limpiarModalUsuarios();

}
 /*funcoin para agregar usuarios */
function agregarPostUsuarios() {
    let postUsuario = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        fecha: document.getElementById('fecha').value,
        contenido: document.getElementById('summernote').value,
    }
    console.log('agregar post')
    document.getElementById('tabla-posts').innerHTML += 
        `<tr>
            <td></td>
            <td>${postUsuario.titulo}</td>
            <td>${postUsuario.autor}</td>
            <td>${postUsuario.fecha}</td>
            <td>
            <a href="#" class="btn btn-xs btn-default"id="ver"><i class="fa fa-eye"></i></a>
            <a href="#" class="btn btn-xs btn-warning"id="editar"><i class="fa fa-pencil"></i></a>
            <a href="#" class="btn btn-xs btn-danger"id="eliminar"><i class="fa fa-remove"></i></a>
            </td>
        </tr>`;
        

}
function agregarPagina() {
    let pagina = {
        titulo: document.getElementById('titulo').value,
        contenido: document.getElementById('summernote').value
    }
    console.log(pagina);
    document.getElementById('tabla-paginas').innerHTML += 
        `<tr>
            <td></td>
            <td>${pagina.titulo}</td>
            <td>
            <a href="pagesPub.html" class="btn btn-xs btn-default"id="ver"><i class="fa fa-eye"></i></a>
            <a href="#" class="btn btn-xs btn-warning"id="editar"><i class="fa fa-pencil"></i></a>
            <a href="#" class="btn btn-xs btn-danger"id="eliminar"><i class="fa fa-remove"></i></a>
            </td>
        </tr>`;
        

}
function agregarCategoria(){
    var ncategoria = document.getElementById('nombre-categoria').value;
    if(ncategoria ==""){
        document.getElementById('nombre-categoria').classList.add('is-invalid');
    }else{
        document.getElementById('nombre-categoria').classList.remove('is-invalid');
    let categoria = {
        nombrecategoria: document.getElementById('nombre-categoria').value,
    
    }
    console.log(categoria);
       document.getElementById('tabla-categorias').innerHTML += 
        `<tr>
        <td></td>
        <td>${categoria.nombrecategoria}</td>
        <td>                                   
        <a href="#" class="btn btn-xs btn-warning" id="editar"><i class="fa fa-pencil"></i></a>
        <a href="#" class="btn btn-xs btn-danger" id="eliminar"><i class="fa fa-remove"></i></a>
        </td>
        </tr>`;
        limpiarModalCategorias();
    }   
}

 /*funcoin para login */

 /*funcoin para limpiar modal usuarios */
function limpiarModalUsuarios(){
    document.getElementById('nombre-completo').value='';
    document.getElementById('nombre-usuario').value='';
    document.getElementById('correo').value='';
    document.getElementById('password').value='';
    document.getElementById('tipo-usuario').value='';

}

function limpiarModalCategorias(){
    document.getElementById('nombre-categoria').value='';


}

$( "#btn-alerta" ).click(function() {
    alert( "Este post es privado...." );
  });