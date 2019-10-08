$(document).ready(function(){
    obtenerComentarios();
    obtenerPosts();
    obtenerUsers();
    obtenerCategorias();

})
//obtener el total de comentarios
function obtenerComentarios(){ 
    $.ajax({
        url:"/comment/",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
        var contador=0;
            for (var i = 0; i < res.length; i++) {
               if (res[i]) {
                   contador=contador+1;
               }
               
           }
           document.getElementById('comentarios').innerHTML+=
               `<div class="huge">${contador}</div>
               <div>Comentario</div>`;
               
           console.log(contador);
           
        },
        error:function(error){
            console.log(error);
        }
    });
    
}
//obtener total de post
function obtenerPosts(){ 
    $.ajax({
        url:"/post/",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
        var contador=0;
            for (var i = 0; i < res.length; i++) {
               if (res[i]) {
                   contador=contador+1;
               }
               document.getElementById('tabla-posts').innerHTML += 
               ` <tr>
                   <td>${res[i].titulo}</td>
                   <td>${res[i].autor}</td>
                   <td>${res[i].fecha}</td>
                   
               </tr>`;
               
           }
           document.getElementById('post').innerHTML+=
               `<div class="huge">${contador}</div>
               <div>Post</div>`;
               
           console.log(contador);
           
        },
        error:function(error){
            console.log(error);
        }
    });
    
}
//obtener total de usuarios
function obtenerUsers(){ 
    $.ajax({
        url:"/user/",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
        var contador=0;
            for (var i = 0; i < res.length; i++) {
               if (res[i]) {
                   contador=contador+1;
               }
               
           }
           document.getElementById('users').innerHTML+=
               `<div class="huge">${contador}</div>
               <div>Usuarios</div>`;
               
           console.log(contador);
           
        },
        error:function(error){
            console.log(error);
        }
    });
    
}

//obtener total de Categorias
function obtenerCategorias(){ 
    $.ajax({
        url:"/cate/",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
        var contador=0;
            for (var i = 0; i < res.length; i++) {
               if (res[i]) {
                   contador=contador+1;
               }
               document.getElementById('tabla-categorias').innerHTML += 
               `<tr>
               <td>${res[i].nombre}</td>
               </tr>`;
               
           }
           document.getElementById('categorias').innerHTML+=
               `<div class="huge">${contador}</div>
               <div>Categorias</div>`;
               
           console.log(contador);
           
        },
        error:function(error){
            console.log(error);
        }
    });
    
}
