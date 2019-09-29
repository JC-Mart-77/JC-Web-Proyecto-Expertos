/*var tipoUsuarios = ['Administrador', 'Autor', 'Lector'];
    for (let i=0;i<tipoUsuarios.length; i++)
    document.getElementById('tipoUsuario').innerHTML += `<option value="${i}">${tipoUsuarios[i]}</option>`;

    var tipoUsuarios = ['Administrador', 'Autor', 'Lector'];
    for (let i=0;i<tipoUsuarios.length; i++)
    document.getElementById('tipoUsuario-modificar').innerHTML += `<option value="${i}">${tipoUsuarios[i]}</option>`;
*/
/*var imagenes =[
    { "imagenes" : [ "uploads/1.jpg", "uploads/2.jpg", "uploads/3.jpg", "uploads/4.jpg" ]},
    { "imagenes" : [ "uploads/1.jpg", "uploads/2.jpg", "uploads/3.jpg", "uploads/4.jpg" ]}, 
    { "imagenes" : [ "uploads/1.jpg", "uploads/2.jpg", "uploads/3.jpg", "uploads/4.jpg" ]}, 
    { "imagenes" : [ "uploads/1.jpg", "uploads/2.jpg", "uploads/3.jpg", "uploads/4.jpg" ]}, 
    { "imagenes" : [ "uploads/1.jpg", "uploads/2.jpg", "uploads/3.jpg", "uploads/4.jpg" ]}, 
    { "imagenes" : [ "uploads/1.jpg", "uploads/2.jpg", "uploads/3.jpg", "uploads/4.jpg" ]} 
]
    //funcion registrar un nuevo usuario//
    $("#btn-registrar-posts").click(function(){
    var campos = [
        {campo:'titulo',valido:false},
        {campo:'autor',valido:false},
        {campo:'fechaActual',valido:false},
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
    var campos2= $("#registrarPost").serialize() + "&nombreCategoria="+$("#categorias option:selected").text()+
    "&contenido="+ $($("#summernote").summernote("code")).text();
    
    console.log("Información a guardar: " + campos2);
    $.ajax({
        url:"/post/add-posts",
        method:"POST",
        data:campos2 + "&nombreCategoria",
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se registro el nuevo posts")
            
            document.getElementById('tabla-posts').innerHTML += 
                ` <tr>
                    <td></td>
                    <td>${res.titulo}</td>
                    <td>${res.autor}</td>
                    <td>${res.fecha}</td>
                    <td>
                    <a href="pagesPost.html" onclick="mostrar(event, '${res._id}');"class="btn btn-xs btn-default"id="ver"><i class="fa fa-eye"></i></a>
                    <a href="" onclick="editar(event, '${res._id}');" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i></a>
                    <a href="" onclick="eliminar(event, '${res._id}');" class="btn btn-xs btn-danger"><i class="fa fa-remove"></i></a>
                    </td>
                </tr>`;
          
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Posts Registrado con Exito..',
                showConfirmButton: false,
                timer: 1500
              })
              //limpiarCampos();
            //window.location.href="../pages/login.html"
        },
        error:function(error){
            console.log(error);
        }
    });
})

function actualizarUsuarios(id){
    document.getElementById('tabla-usuarios').innerHTML ='';
    var campos2= $("#modificarUsers").serialize();
    console.log("Información a modificar: " + campos2);
    $.ajax({
        url:"/user/"+id,
        method:"PUT",
        data:campos2,
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se modifico la categoria");
            
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Usuario modificado con exito..',
                showConfirmButton: false,
                timer: 1300
              })
              
              obtenerUsuarios();
            
        },
        error:function(error){
            console.log(error);
        }
    });
}
//funcion para generar las categorias//
function generarPosts(informacion){
    for (var i=0; i<informacion.length; i++){
        document.getElementById('tabla-posts').innerHTML += 
        ` <tr>
            <td></td>
            <td>${informacion[i].titulo}</td>
            <td>${informacion[i].autor}</td>
            <td>${informacion[i].fecha}</td>
            <td>
            <a href="" onclick="mostrar(event, '${informacion[i]._id}');"class="btn btn-xs btn-default"id="ver"><i class="fa fa-eye"></i></a>
            <a href="" onclick="editar(event, '${informacion[i]._id}');" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i></a>
            <a href="" onclick="eliminar(event, '${informacion[i]._id}');" class="btn btn-xs btn-danger"><i class="fa fa-remove"></i></a>
            </td>
        </tr>`;
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
    
}*/
//cargar las categorias//
$(document).ready(function(){
    console.log("El DOM ha sido cargado");
    //document.getElementById('mostrarPost').innerHTML = " ";
    //e.preventDefault();//Evitar comportamiento por defecto de un anchor
    //console.log('Ver detalle de: ' + id);
    
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
         <img src="../${res[0].imagen}" alt="" >
         <h5 style="color:#8e8d8a">${res[0].autor} | <span>${res[0].fecha}</span></h5>
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
    
    
   
});

/*function eliminar(e,id){
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
}*/