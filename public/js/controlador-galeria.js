$("#btn-subir-img").submit(function(){
    var campos2= $("#uploadform").serialize();
    console.log("Información a guardar: " + campos2);
    $.ajax({
        url:"/subir-img/",
        method:"POST",
        data:campos2,
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se registro la categoria");
        if (res[0].tipo == "image/png" ||"image/jpg" || "image/jpeg") {
            document.getElementById('tabla-imagenes').innerHTML += 
                `<tr>
                <td></td>
                <td><img src="../${res.nombre}" style="width: 120px; height: 120px;"></td>
                <td>${res.nombre}</td>
                <td>                                   
                <a href="" onclick="editar(event, '${res._id}');"class="btn btn-xs btn-warning" id="editar"><i class="fa fa-pencil"></i></a>
                <a href="" onclick="eliminar(event, '${res._id}');"class="btn btn-xs btn-danger" id="eliminar"><i class="fa fa-remove"></i></a>
                </td>
                </tr>`;
            }else{ 
                if(res[0].tipo == "application/pdf") {
                document.getElementById('tabla-imagenes').innerHTML += 
                `<tr>
                <td></td>
                <td><img src="../img/icono-pdf.png" style="width: 80px; height: 80px;"></td>
                <td>${res.nombre}</td>
                <td>                                   
                <a href="" onclick="editar(event, '${res._id}');"class="btn btn-xs btn-warning" id="editar"><i class="fa fa-pencil"></i></a>
                <a href="" onclick="eliminar(event, '${res._id}');"class="btn btn-xs btn-danger" id="eliminar"><i class="fa fa-remove"></i></a>
                </td>
                </tr>`;
                }
            }
        
         
        },
        error:function(error){
            console.log(error);
        }
    });
})

/*function actualizarCategoria(id){
    document.getElementById('tabla-categorias').innerHTML ='';
    var campos2= $("#modificarCategorias").serialize();
    console.log("Información a modificar: " + campos2);
    $.ajax({
        url:"/cate/"+id,
        method:"put",
        data:campos2,
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se modifico la categoria");
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Categoria modificada con exito..',
                showConfirmButton: false,
                timer: 1300
              })
              limpiarModalCategorias();
              obenterCategorias();
            
        },
        error:function(error){
            console.log(error);
        }
    });
}*/
//funcion para generar las categorias//
function generarImagenes(información){
    for (var i=0; i<información.length; i++){
        if (información[i].tipo == "image/png" ||"image/jpg" || "image/jpeg") {
        document.getElementById('tabla-imagenes').innerHTML += 
        `<tr>
        <td></td>
        <td><img src="../${información[i].nombre}" style="width: 120px; height: 120px;"/></td>
        <td>${información[i].nombre}</td>
        <td>                                   
        <a href="" onclick="editar(event, '${información[i]._id}');"class="btn btn-xs btn-warning" id="editar"><i class="fa fa-pencil"></i></a>
        <a href="" onclick="eliminar(event, '${información[i]._id}');"class="btn btn-xs btn-danger" id="eliminar"><i class="fa fa-remove"></i></a>
        </td>
        </tr>`;
        }else{ 
            if(información[i].tipo == "application/pdf") {
            document.getElementById('tabla-imagenes').innerHTML += 
            `<tr>
            <td></td>
            <td><img src="../img/icono-pdf.png" style="width: 80px; height: 80px;"></td>
            <td>${información[i].nombre}</td>
            <td>                                   
            <a href="" onclick="editar(event, '${información[i]._id}');"class="btn btn-xs btn-warning" id="editar"><i class="fa fa-pencil"></i></a>
            <a href="" onclick="eliminar(event, '${información[i]._id}');"class="btn btn-xs btn-danger" id="eliminar"><i class="fa fa-remove"></i></a>
            </td>
            </tr>`;
            }
        }
    }
}
//funcion para obtener la categorias//
function obenterImagenes(){
   
    $.ajax({
        url:"/listar-img",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
            generarImagenes(res);
        },
        error:function(error){
            console.log(error);
        }
    });
    
}
//cargar las categorias//
$(document).ready(function(){
    console.log("El DOM ha sido cargado");
    obenterImagenes();
    
   
});


function validarCampoVacio(campo){
    if (document.getElementById(campo).value ==''){   
        document.getElementById('nombre-categoria').classList.add('is-invalid');
    }else{
        document.getElementById('nombre-categoria').classList.remove('is-invalid');
    }
}

function limpiarModalCategorias(){
    document.getElementById('nombre-categoria').value='';

}
//funcion para eliminar categoria/
function eliminar(e,id){
    document.getElementById('tabla-imagenes').innerHTML ='';
    e.preventDefault(); //Evitar comportamiento por defecto de un anchor
    console.log('Eliminar el objeto: ' + id);

    $.ajax({
        url:"/delete"+id,
        method:"DELETE",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            //if (res.n==1 && res.ok == 1)
                $("#"+id).remove();
               
             obenterImagenes();
        },
        
        error:function(error){
            console.log(error);
        }
    });
    
}
//funcion editar categoriaa//
function editar(e,id){
    
    e.preventDefault();//Evitar comportamiento por defecto de un anchor
    $("#modificar-categoria").modal("show");
    console.log('Ver detalle de: ' + id);
    
    $.ajax({
        url:"/cate/"+id,
        method:"get",
        dataType:"json",
        success:function(res){
            console.log(res);
            document.getElementById('categoria').value = res[0].nombre;

        },
        error:function(error){
            console.log(error);
        }
    });
}