//funcion para generar las categorias//
function generarPosts(informacion){
    for (var i=0; i<informacion.length; i++){
        document.getElementById('listar-post').innerHTML += 
        `<div class="col-lg-6">
        <div class="panel panel-default">
            <div class="panel-heading">
                Post
            </div>
            <div class="panel-body">

                
                <a href="#"><p class="lead">${informacion[i].titulo}</p></a>
                <p>${informacion[i].contenido}
                <p>
                    <strong>${informacion[i].categoria}</strong>
                </p>
                <h5 style="color:#8e8d8a">${informacion[i].autor} | <span>${informacion[i].fecha}</span></h5>
                <form action="pagesPost.html" method="GET">
                <input type="hidden" id="_id" name="_id" value="${informacion[i]._id}">
                <button type="subtmit" class="btn btn-success">Leer mas <i class="fa fa-arrow-right"></i></button>
                </form>
            </div>
            <!-- /.panel-body -->
        </div>
        <!-- /.panel -->
    </div>`;

    
    }
}
//funcion para obtener la categorias//
function obtenerPosts(){ 
    $.ajax({
        url:"/post/",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
            generarPosts(res);
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
                $("#listar-categorias").append(
                    `<a href="#" class="list-group-item list-group-item-action">${res[i].nombre}</a>`
                );
                
            }

            obtenerPosts();
        },
        error:function(error){
            console.log(error);
        }
    });
    
    
   
});

function eliminar(e,id){
    document.getElementById('tabla-posts').innerHTML ='';
    e.preventDefault(); //Evitar comportamiento por defecto de un anchor
    console.log('Eliminar el objeto: ' + id);

    $.ajax({
        url:"/post/"+id,
        method:"DELETE",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            //if (res.n==1 && res.ok == 1)
                $("#"+id).remove();
               
             obtenerPosts();
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
    
    $.ajax({
        url:"/user/"+id,
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
function mostrar(e,id){
    //window.location.href = 'pagesPost.html';
    document.getElementById('mostrarPost').innerHTML = " ";
    e.preventDefault();//Evitar comportamiento por defecto de un anchor
    console.log('Ver detalle de: ' + id);
    
    $.ajax({
        url:"/post/"+id,
        method:"get",
        dataType:"json",
        success:function(res){
            document.getElementById('mostrarPost').innerHTML += 
             `<div class="col-md-12">
             <h1 style="color:#ffbb00">${res[0].titulo}</h1>
         <hr>
     
     <div class="row" >
             <div class="col-md-9">
             <p>${res[0].contenido}</p>
         <img src="${res[0].imagen}" alt="" width="500px"; heigth="350px";>
         <h5 style="color:#8e8d8a"> ${res[0].autor} | <span>${res[0].fecha}</span></h5>
         <h4>Deja un comentario</h4>
     <form role="form" method="post" action="">
       <div class="form-group">
         <label for="exampleInputEmail1">Nombre</label>
         <input type="text" name="name" class="form-control" id="exampleInputEmail1" placeholder="Nombre">
       </div>
       <div class="form-group">
         <label for="exampleInputEmail1">Correo electronico</label>
         <input type="email" name="email" required class="form-control" id="exampleInputEmail1" placeholder="Correo Electronico">
       </div>
       <div class="form-group">
         <label for="exampleInputPassword1">Comentario</label>
         <textarea class="form-control" name="comment" required rows="4" placeholder="Escribe tu comentario ..."></textarea>
       </div>
       <input type="hidden" name="post_id" value="1">
       <button type="button" class="btn btn-success">Enviar comentario</button>
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
    document.getElementById('nombre-modificar').value = '';
    document.getElementById('apellido-modificar').value = '';
    document.getElementById('email-modificar').value = '';
    document.getElementById('password-modificar').value = '';
}