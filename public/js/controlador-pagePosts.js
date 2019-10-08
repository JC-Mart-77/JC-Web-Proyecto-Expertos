

//cargar las categorias//
$(document).ready(function(){
    console.log("El DOM ha sido cargado");
    //document.getElementById('mostrarPost').innerHTML = " ";
    //e.preventDefault();//Evitar comportamiento por defecto de un anchor
    //console.log('Ver detalle de: ' + id);
    var paramstr = window.location.search.substr(1);
    var paramarr = paramstr.split ("&");
    var params = {};

    for ( var i = 0; i < paramarr.length; i++) {
    var tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
    }
    if (params['_id']) {
    console.log('El valor del parámetro variable es: '+params['_id']);
    var id = params['_id'];
    
    } else {
        console.log('No se envió el parámetro variable');
    }

    $.ajax({
        url:"/post/"+id,
        method:"get",
        dataType:"json",
        success:function(res){
            $('#mostrarPosts').append(
        `<hr>
        <div class="col-md-2">
        </div>
        <div class="col-md-8">
        <h1 class="text-center" style="color:#ffbb00">${res[0].titulo}</h1>
        <p >${res[0].contenido}</p>
        
        <p class="mt-5 mb-3 text-center"><img src="../${res[0].imagen}" alt="" width="500px"; heigth="350px";></p>
        <br>
        <h5 style="color:#8e8d8a">${res[0].autor} | <span>${res[0].fecha}</span></h5>
            <div id="listar-comentarios">
            
            </div>
            <h4>Deja un comentario</h4>
    <form id="registrarComentarios">
       <div class="form-group">
            <label for="exampleInputEmail1">Nombre</label>
            <input type="hidden" name="titulo" class="form-control" id="titulo" value="${res[0].titulo}">
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
     
        
         <div class="col-md-2">

         </div>`);
    generarComentarios();
        },
        error:function(error){
            console.log(error);
        }
    });
    
    $.ajax({
        
      url:"/config/",
      method:"get",
      dataType:"json",
      success:function(res){
          console.log("Respuesta");
          console.log(res);
          document.getElementById('configPagina').innerHTML += 
                ` <h1>${res[0].encabezado}</h1>
                <p>${res[0].descripcion}</p>`;
          document.getElementById('footer').innerHTML += 
                ` <p class="mt-5 mb-3 text-center">&copy; ${res[0].piePagina}</p>`;
          document.getElementById('logo').innerHTML += 
                `<a class="navbar-brand" href="index.html"><img src="../${res[0].imagen}" class="img-fluid-top" width="100px" height="40px"></a>`;

                
      },
      error:function(error){
          console.log(error);
      }
  });
    
   
});



function agregarComentario(){
  var paramstr = window.location.search.substr(1);
  var paramarr = paramstr.split ("&");
  var params = {};

  for ( var i = 0; i < paramarr.length; i++) {
  var tmparr = paramarr[i].split("=");
  params[tmparr[0]] = tmparr[1];
  }
  if (params['_id']) {
  console.log('El valor del parámetro variable es: '+params['_id']);
  var id = params['_id'];
  
  } else {
      console.log('No se envió el parámetro variable');
  }
  var campos2= $("#registrarComentarios").serialize();
  console.log("Información a guardar: " + campos2);
    //console.log('Ver detalle de: ' + id);
    document.getElementById('listar-comentarios').innerHTML ='';
    $.ajax({
        url:"/post/"+id,
        method:"put",
        data:campos2,
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se registro el nuevo posts")
            generarComentarios();
            limpiarComentarios();
        },
        
        error:function(error){
            console.log(error);
        }
    });

    var campos3= $("#registrarComentarios").serialize();
    console.log("Información a guardar: " + campos3);
    $.ajax({
      url:"/comment/guardar-comentario",
      method:"POST",
      data:campos3,
      dataType:"json",
      success: function(res){
          console.log(res);
          console.log("se registro el comentarios")
          
      },
      
      error:function(error){
          console.log(error);
      }
  });

}

function generarComentarios(){
  var paramstr = window.location.search.substr(1);
  var paramarr = paramstr.split ("&");
  var params = {};

  for ( var i = 0; i < paramarr.length; i++) {
  var tmparr = paramarr[i].split("=");
  params[tmparr[0]] = tmparr[1];
  }
  if (params['_id']) {
  console.log('El valor del parámetro variable es: '+params['_id']);
  var id = params['_id'];
  
  } else {
      console.log('No se envió el parámetro variable');
  }
    //console.log('Ver detalle de: ' + id);
    document.getElementById('listar-comentarios').innerHTML = '';
    $.ajax({
        url:"/post/"+id,
        method:"get",
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se registro el nuevo posts")
            for(var i=0;i<res[0].comentario.length;i++){
          document.getElementById('listar-comentarios').innerHTML += 
                `
                <div class="" style="max-width: 500px;">
                <div class="row no-gutters">
                  <div class="col-md-2">
                    <img src="../img/user.webp" class="img-fluid img-circle" alt="...">
                  </div>
                  <div class="col-md-10">
                    <div class="card-body">
                      <h4 class="card-title" style="color:#ffbb00">${res[0].comentario[i].nombre}</h4>
                      <p class="card-text">${res[0].comentario[i].comentario}</p>
                      <hr>
                    </div>
                  </div>
                </div>
              </div>`;
            }
              limpiarComentarios();
            
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

