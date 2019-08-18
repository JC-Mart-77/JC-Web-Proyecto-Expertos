var campos = [
    {id:'titulo', valido:false},
    {id:'autor', valido:false},
    {id:'fecha', valido:false}
];
function validarCampos(){
    for (let i = 0; i<campos.length; i++)
        campos[i].valido = validarCampoVacio(campos[i].id);
    
    console.log(campos);
    for (let i = 0; i<campos.length; i++)
        if (!campos[i].valido)
            return;
    
    let post = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        fecha: document.getElementById('fecha').value,
        summernote: document.getElementById('summernote').value
    }
   
    return post;
}


function validarCampoVacio(id){
    let resultado = (document.getElementById(id).value=="")?false:true;
    marcarInput(id,resultado);
    return resultado; 
    
}


function validarCorreo(correo) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let resultado = re.test(correo.value);
    marcarInput(correo.id, resultado);
    return resultado;
}

function marcarInput(id, valido){
    if (valido){
        document.getElementById(id).classList.remove('is-invalid');
        document.getElementById(id).classList.add('is-valid');
    }else{
        document.getElementById(id).classList.remove('is-valid');
        document.getElementById(id).classList.add('is-invalid');
    }
}

function agregarPostUsuarios() {      
    let validacion=validarCampos();
    if(validacion==null)
    return;
    let postUsuario = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        fecha: document.getElementById('fecha').value,
        contenido: document.getElementById('summernote').value
    }
    console.log(postUsuario);
    
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
        limpiarModalPosts()

}  
function limpiarModalPosts(){
    document.getElementById('titulo').value='';
    document.getElementById('autor').value='';
    document.getElementById('fecha').value='';
    document.getElementById('summernote').value='';
  
  }    
                   

