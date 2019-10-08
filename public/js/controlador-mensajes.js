
function generarMensajes(información){
    for (var i=0; i<información.length; i++){
        document.getElementById('tabla-mensajes').innerHTML += 
        `<tr>
        <td>${información[i].nombre}</td>
        <td>${información[i].correo}</td>
        <td>${información[i].respuesta}</td>
        <td><a href="#">${información[i].titulo}</a></td>
        <td style="width:70px;">
        <a data-toggle="modal" href="#answermsg1" class="btn btn-success btn-xs"><i class="fa fa-send"></i></a>
        <a href="" onclick="eliminar(event, '${información[i]._id}');"class="btn btn-xs btn-danger"><i class="fa fa-remove"></i></a>
        </td>
    </tr>`;
    }
}
//funcion para obtener la categorias//
function obenterMensajes(){
   
    $.ajax({
        url:"/msj/",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
            generarMensajes(res);
        },
        error:function(error){
            console.log(error);
        }
    });
    
}
//cargar las categorias//
$(document).ready(function(){
    console.log("El DOM ha sido cargado");
    obenterMensajes();
    
   
});