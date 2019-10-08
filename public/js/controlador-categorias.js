$("#btn-categoria").click(function(){
    var campos2= $("#formCategorias").serialize();
    console.log("Información a guardar: " + campos2);
    $.ajax({
        url:"/cate/guardar-categoria",
        method:"POST",
        data:campos2,
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se registro la categoria");
            document.getElementById('tabla-categorias').innerHTML += 
                `<tr>
                <td width="10%"></td>
                <td>${res.nombre}</td>
                <td>                                   
                <a href="" onclick="editar(event, '${res._id}');"class="btn btn-xs btn-warning" id="editar"><i class="fa fa-pencil"></i></a>
                <a href="" onclick="eliminar(event, '${res._id}');"class="btn btn-xs btn-danger" id="eliminar"><i class="fa fa-remove"></i></a>
                </td>
                </tr>`;
            
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Categoria registrada con exito..',
                showConfirmButton: false,
                timer: 1300
              })
              limpiarModalCategorias();
            
        },
        error:function(error){
            console.log(error);
        }
    });
})
function actualizarCategoria(){
    document.getElementById('tabla-categorias').innerHTML ='';
    var campos2= $("#modificarCategorias").serialize();
    console.log("Información a modificar: " + campos2);
    $.ajax({
        url:`/cate/${document.getElementById('_id').value}`,
        method:"PUT",
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
}



//funcion para generar las categorias//
function generarCategorias(información){
    for (var i=0; i<información.length; i++){
        document.getElementById('tabla-categorias').innerHTML += 
        `<tr>
        <td width="10%"></td>
        <td>${información[i].nombre}</td>
        <td>                                   
        <a href="" onclick="editar(event, '${información[i]._id}');"class="btn btn-xs btn-warning" id="editar"><i class="fa fa-pencil"></i></a>
        <a href="" onclick="eliminar(event, '${información[i]._id}');"class="btn btn-xs btn-danger" id="eliminar"><i class="fa fa-remove"></i></a>
        </td>
        </tr>`;
    }
}
//funcion para obtener la categorias//
function obenterCategorias(){
   
    $.ajax({
        url:"/cate/",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
            generarCategorias(res);
        },
        error:function(error){
            console.log(error);
        }
    });
    
}
//cargar las categorias//
$(document).ready(function(){
    console.log("El DOM ha sido cargado");
    obenterCategorias();
    
   
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
    document.getElementById('categoria').value='';

}
//funcion para eliminar categoria/
function eliminar(e,id){
    document.getElementById('tabla-categorias').innerHTML ='';
    e.preventDefault(); //Evitar comportamiento por defecto de un anchor
    console.log('Eliminar el objeto: ' + id);

    $.ajax({
        url:"/cate/"+id,
        method:"DELETE",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            //if (res.n==1 && res.ok == 1)
                $("#"+id).remove();
               
             obenterCategorias();
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
    document.getElementById('_id').value=id;
    
    $.ajax({
        url:`/cate/${id}`,
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

