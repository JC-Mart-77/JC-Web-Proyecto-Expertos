//funcion registrar un nuevo usuario//
    $("#btn-registrar-pages").click(function(){
    var campos = [
        {campo:'titulo',valido:false},
        {campo:'summernote',valido:false},
        {campo:'imagenes',valido:false},
        {campo:'categorias',valido:false}
    ];
    
    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampoVacio(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }
    var campos2= $("#registrarPages").serialize() + "&contenido="+ $("#summernote").summernote("code");
    
    console.log("Información a guardar: " + campos2);
    $.ajax({
        url:"/pages/add-pagina",
        method:"POST",
        data:campos2,
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se registro el nuevo posts")
            
            document.getElementById('tabla-paginas').innerHTML += 
                ` <tr>
                    <td>${res.titulo}</td>
                    <td>${res.categoria}</td>
                    <td>
                    <form action="pagesPub.html" method="GET">
                        <input type="hidden" id="_id" name="_id" value="${res._id}">
                        <button type="subtmit" class="btn btn-xs btn-default"id="ver"><i class="fa fa-eye"></i></button>
                    
                        <a href="" onclick="editar(event, '${res._id}');" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i></a>
                        <a href="" onclick="eliminar(event, '${res._id}');" class="btn btn-xs btn-danger"><i class="fa fa-remove"></i></a>
                    </form>
                    </td>
                </tr>`;
          
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Pagina Registrada con Exito..',
                showConfirmButton: false,
                timer: 1500
              })
              limpiarCampos();
            //window.location.href="../pages/login.html"
        },
        error:function(error){
            console.log(error);
        }
    });
})

function actualizarPages(){
    document.getElementById('tabla-paginas').innerHTML ='';
    var campos2= $("#registrarPages").serialize();
    console.log("Información a modificar: " + campos2);
    $.ajax({
        url:`/pages/${document.getElementById('codigo').value}`,
        method:"PUT",
        data:campos2,
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se modifico la categoria");
            
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Pagina modificada con exito..',
                showConfirmButton: false,
                timer: 1300
              })
              
              obtenerPosts();
            
        },
        error:function(error){
            console.log(error);
        }
    });
}
//funcion para generar las paginas//
function generarPages(info){
    for (var i=0; i<info.length; i++){
        document.getElementById('tabla-paginas').innerHTML += 
        ` <tr>
            <td>${info[i].titulo}</td>
            <td>${info[i].categoria}</td>
            <td>
            <form action="pagesPub.html" method="GET">
                <input type="hidden" id="_id" name="_id" value="${info[i]._id}">
            <button type="subtmit" class="btn btn-xs btn-default"id="ver"><i class="fa fa-eye"></i></button>
            
            <a href="" onclick="editar(event, '${info[i]._id}');" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i></a>
            <a href="" onclick="eliminar(event, '${info[i]._id}');" class="btn btn-xs btn-danger"><i class="fa fa-remove"></i></a>
            </form>
            </td>
        </tr>`;
    }
}
//funcion para obtener la categorias//
function obtenerPages(){ 
    $.ajax({
        url:"/pages/listar",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
            generarPages(res);
        },
        error:function(error){
            console.log(error);
        }
    });
    
}
//cargar las categorias//
$(document).ready(function(){
    console.log("El DOM ha sido cargado");
    $.ajax({
        url:"/cate/",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta");
            console.log(res);
            for (var i=0; i<res.length; i++){
                $("#categorias").append(
                    `<option value="${res[i].nombre}">${res[i].nombre}</option>`
                );
                
            }

            obtenerPages();
        },
        error:function(error){
            console.log(error);
        }
    });

    $.ajax({
        url:"/listar-img/",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta");
            console.log(res);
            for (var i=0; i<res.length; i++){
                $("#imagenes").append(
                    `<option value="${res[i].nombre}">${res[i].nombre}</option>`
                );
                
            }

        },
        error:function(error){
            console.log(error);
        }
    });
    
    
   
});

function eliminar(e,id){
    document.getElementById('tabla-paginas').innerHTML ='';
    e.preventDefault(); //Evitar comportamiento por defecto de un anchor
    console.log('Eliminar el objeto: ' + id);

    $.ajax({
        url:"/pages/"+id,
        method:"DELETE",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            //if (res.n==1 && res.ok == 1)
                $("#"+id).remove();
               
             obtenerPages();
        },
        
        error:function(error){
            console.log(error);
        }
    });
    
}
//funcion editar categoriaa//
function editar(e,id){
    
    e.preventDefault();//Evitar comportamiento por defecto de un anchor
    $("#add-page").modal("show");
    console.log('Ver detalle de: ' + id);
    document.getElementById('codigo').value=id;
    
    $.ajax({
        url:`/pages/${id}`,
        method:"get",
        dataType:"json",
        success:function(res){
            console.log(res);
            $($("#summernote").summernote("code", res[0].contenido)).text();
            document.getElementById('titulo').value = res[0].titulo;
            document.getElementById('imagenes').value = res[0].imagen;
            document.getElementById('categorias').value = res[0].categoria;
            document.getElementById("btn-modificar-pages").style.display = "block";
            document.getElementById("btn-registrar-pages").style.display = "none";
        },
        error:function(error){
            console.log(error);
        }
    });
}
function actualizarPagina(){
    document.getElementById('tabla-paginas').innerHTML ='';
    var campos2= $("#registrarPages").serialize()+ "&contenido="+ $("#summernote").summernote("code");
    console.log("Información a modificar: " + campos2);
   
    $.ajax({
        url:`/pages/modificar/${document.getElementById('codigo').value}`,
        method:"PUT",
        data:campos2,
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se modifico la pagina");
            
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Post modificado con exito..',
                showConfirmButton: false,
                timer: 1300
              })
              
              obtenerPages();
            
        },
        error:function(error){
            console.log(error);
        }
    });
}
function mostrar(e,id){
    //window.location.href = 'pagesPost.html';
    document.getElementById('mostrarPagina').innerHTML = " ";
    e.preventDefault();//Evitar comportamiento por defecto de un anchor
    console.log('Ver detalle de: ' + id);
    
    $.ajax({
        url:"/pages/"+id,
        method:"get",
        dataType:"json",
        success:function(res){
            document.getElementById('mostrarPagina').innerHTML += 
             `<div class="col-md-12">
                <h1 style="color:#ffbb00">${res[0].titulo}</h1>
            <hr>
     
    <div class="row" >
        <p>${res[0].contenido}</p>
        <div class="col-md-9">
        <img src="../${res[0].imagen}" alt="" width="500px"; heigth="350px";>
       <div id="listar-comentarios">
            
            </div>
            <h4>Deja un comentario</h4>
    <form id="registrarComentarios">
       <div class="form-group">
            <label for="exampleInputEmail1">Nombre</label>
            <input type="text" name="nombre" class="form-control" id="nombre" placeholder="Nombre">
       </div>
       <div class="form-group">
            <label for="exampleInputEmail1">Correo electronico</label>
            <input type="email" name="correo" required class="form-control" id="correo" placeholder="Correo Electronico">
            
       </div>
       <div class="form-group">
            <label for="exampleInputPassword1">Comentario</label>
            <textarea class="form-control" name="comentario"  id="comentario" placeholder="Escribe tu comentario ..."></textarea>
       </div>
            <input type="hidden" name="post_id" value="1">
            <button type="button" onclick="agregarComentario();" id="btn-comentarios" class="btn btn-success">Enviar comentario</button>
    </form>
            </div>
     
         </div>
     
        <br><br>
     
    </div>`;
        },
        error:function(error){
            console.log(error);
        }
    });
}

function agregarComentario(){
    var campos2= $("#registrarComentarios").serialize();
    console.log("Información a guardar: " + campos2);
    //console.log('Ver detalle de: ' + id);
    $.ajax({
        url:"/comment/guardar-comentario",
        method:"POST",
        data:campos2,
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se registro el nuevo posts")
            
            document.getElementById('listar-comentarios').innerHTML += 
                `<div class="" style="max-width: 200px;">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img src="../img/user.webp" class="img-fluid img-circle" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h4 class="card-title" style="color:#ffbb00">${res.nombre}</h4>
                      <p class="card-text">${res.comentario}</p>
                    </div>
                  </div>
                </div>
              </div>`;
              limpiarComentarios();
              /*Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Posts Registrado con Exito..',
                showConfirmButton: false,
                timer: 1500
              })
              limpiarCampos();
            //window.location.href="../pages/login.html"*/
        },
        error:function(error){
            console.log(error);
        }
    });

}
function limpiarComentarios(){
    document.getElementById('nombre').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('comentario').value = '';
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
    document.getElementById('titulo').value = '';
}