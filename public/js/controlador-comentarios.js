//funcion para generar las categorias//
function generarComentarios(info){
    for (var i=0; i<info.length; i++){
        document.getElementById('tabla-comentarios').innerHTML += 
        `<tr>
            <td width="10%">${info[i].nombre}</td>
            <td width="10%">${info[i].correo}</td>
            <td>${info[i].comentario}</td>
            <td><a href='#'>${info[i].titulo}</a></td>
            <td width="15%">
            <a href="" onclick="aprobarComentario(event, '${info[i]._id}');" id="aprobar" class="btn btn-xs btn-primary"><i class="fa fa-thumbs-up"></i></a>
            <a href=""  onclick="mostrarMensaje(event, '${info[i]._id}');" class="btn btn-success btn-xs"><i class="fa fa-send"></i></a>
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



function conteo(){ 
    $.ajax({
        url:"/comment/conteo",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
            console.log('res.conteo');
            
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
function mostrarMensaje(e,id){
    document.getElementById('detalleMensaje').innerHTML ='';
    e.preventDefault();//Evitar comportamiento por defecto de un anchor
    $("#mensaje").modal("show");
    console.log('Ver detalle de: ' + id);
    document.getElementById('_id').value=id;
    
    $.ajax({
        url:`/comment/${id}`,
        method:"get",
        dataType:"json",
        success:function(res){
            console.log(res);
        document.getElementById('detalleMensaje').innerHTML+=
            `<form id="enviarMensaje">
           <h4>COMENTARIO</h4>
           <p ><b>Nombre:</b>${res[0].nombre}</p>
           <input name="nombre" type="hidden" value="${res[0].nombre}">
           <p ><b>Email:</b>${res[0].correo}</p>
           <input name="correo" type="hidden" value="${res[0].correo}">
           <p ><b>Contenido:</b> ${res[0].comentario}</p>
           <p ><b>Titulo:</b> ${res[0].titulo}</p>
           <input name="titulo" type="hidden" value="${res[0].titulo}">
           <p><b>Fecha:</b> 2019-09-09 04:33:45</p>
           <h4>RESPUESTA</h4>
       <div class="form-group">
           <label for="exampleInputEmail1">Mensaje</label>
           <textarea name="respuesta" id="respuesta" rows="4" class="form-control" placeholder="Escribe tu mensaje ..."></textarea>
       </div>
           <button type="button" onclick="enviarMensaje();" class="btn btn-primary">Responder</button>
       </form>`;
       limpiarMesnajes();

        },
        error:function(error){
            console.log(error);
        }
    });
}

function enviarMensaje(){
    var campos2= $("#enviarMensaje").serialize();
    console.log("Información a modificar: " + campos2);
    $.ajax({
        url:"/msj/guardar-mensaje",
        method:"POST",
        data:campos2,
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se registro el mensaje");

            
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
function limpiarMesnajes(){
    document.getElementById('respuesta').value = '';
}
function aprobarComentario(e,id){
    e.preventDefault();
    document.getElementById('_id').value=id;
    Swal.fire({
        imageUrl: '../img/like.webp',
        imageHeight: 100,
        imageAlt: 'A tall image'
      })
      document.getElementById('aprobar').style.display="none";
}