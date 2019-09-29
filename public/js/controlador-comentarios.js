//funcion para generar las categorias//
function generarComentarios(info){
    for (var i=0; i<info.length; i++){
        document.getElementById('tabla-comentarios').innerHTML += 
        `<tr>
            <td width="10%">${info[i].nombre}</td>
            <td width="10%">${info[i].correo}</td>
            <td>${info[i].comentario}</td>
            <td><a href='#'>Por que usar JC Web</a></td>
            <td width="15%">
            <a href="#" class="btn btn-xs btn-primary"><i class="fa fa-thumbs-up"></i></a>
            <a data-toggle="modal" href="#answermsg6" class="btn btn-success btn-xs"><i class="fa fa-send"></i></a>
            <a href="#" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i></a>
            <a href="" onclick="eliminar(event, '${info[i]._id}');"class="btn btn-xs btn-danger"><i class="fa fa-remove"></i></a>
        </td>`;
    }
}
//funcion para obtener la categorias//
function obtenerComentarios(){ 
    $.ajax({
        url:"/comment/",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
            generarComentarios(res);
        },
        error:function(error){
            console.log(error);
        }
    });
    
}
//cargar las categorias//
$(document).ready(function(){
    console.log("El DOM ha sido cargado");
    obtenerComentarios();
    
   
});

function eliminar(e,id){
    document.getElementById('tabla-comentarios').innerHTML ='';
    e.preventDefault(); //Evitar comportamiento por defecto de un anchor
    console.log('Eliminar el objeto: ' + id);

    $.ajax({
        url:"/comment/"+id,
        method:"DELETE",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            //if (res.n==1 && res.ok == 1)
                $("#"+id).remove();
               
             obtenerComentarios();
        },
        
        error:function(error){
            console.log(error);
        }
    });
    
}
//funcion editar categoriaa//
function editar(e,id){
    
    e.preventDefault();//Evitar comportamiento por defecto de un anchor
    $("#update-user").modal("show");
    console.log('Ver detalle de: ' + id);
    document.getElementById('_id').value=id;
    
    $.ajax({
        url:`/user/${id}`,
        method:"get",
        dataType:"json",
        success:function(res){
            console.log(res);
            document.getElementById('nombre-modificar').value = res[0].nombre;
            document.getElementById('apellido-modificar').value = res[0].apellido;
            document.getElementById('email-modificar').value = res[0].email;
            document.getElementById('password-modificar').value = res[0].password;


        },
        error:function(error){
            console.log(error);
        }
    });
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
function limpiarCampos(){
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('usuario').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('nombre').classList.remove('is-valid');
    document.getElementById('apellido').classList.remove('is-valid');
    document.getElementById('usuario').classList.remove('is-valid');
    document.getElementById('email').classList.remove('is-valid');
    document.getElementById('password').classList.remove('is-valid');

  
    
}
function limpiarModal(){
    document.getElementById('nombre-modificar').value = '';
    document.getElementById('apellido-modificar').value = '';
    document.getElementById('email-modificar').value = '';
    document.getElementById('password-modificar').value = '';
    
}