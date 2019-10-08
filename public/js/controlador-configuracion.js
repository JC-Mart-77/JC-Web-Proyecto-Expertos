//funcion registrar un nuevo usuario//
    $("#btn-registrar").click(function(){
    var campos = [
        {campo:'encabezado',valido:false},
        {campo:'descripcion',valido:false},
        {campo:'imagenes',valido:false},
        {campo:'piePagina',valido:false}
    ];
    
    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampoVacio(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }
    var campos2= $("#configuracion").serialize() +"&nombreImagen="+$("#imagenes option:selected").text();
    
    
    console.log("Información a guardar: " + campos2);
    $.ajax({
        url:"/config/add-configuracion",
        method:"POST",
        data:campos2,
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se registro la configuracion")
            
            },
        error:function(error){
            console.log(error);
        }
    });
})

$(document).ready(function(){
    console.log("El DOM ha sido cargado");

    $.ajax({
        url:"/listar-img",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log("Respuesta");
            console.log(res);
            for (var i=0; i<res.length; i++){
                document.getElementById('imagenes').innerHTML+=
                    `<option value="${res[i]._id}">${res[i].nombre}</option>`;
                
            
                
            }
            obtnerDatos();
        },
        error:function(error){
            console.log(error);
        }
    });
       
   
});

function obtnerDatos(){
    $.ajax({
        
        url:"/config/",
        method:"get",
        dataType:"json",
        success:function(res){
            console.log("Respuesta");
            console.log(res);
            document.getElementById('_id').value = res[0]._id;
            document.getElementById('encabezado').value = res[0].encabezado;
            document.getElementById('descripcion').value = res[0].descripcion;
            //document.getElementById('imagenes').innerHTML = `<option >${res[0].imagen}</option>`;
            document.getElementById('piePagina').value = res[0].piePagina;

        },
        error:function(error){
            console.log(error);
        }
    });
}
function actualizarDatos(){
    var campos2= $("#configuracion").serialize() +"&nombreImagen="+$("#imagenes option:selected").text();
    console.log("Información a modificar: " + campos2);
    $.ajax({
        url:`/config/${document.getElementById('_id').value}`,
        method:"PUT",
        data:campos2,
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se modifico la categoria");
            
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Configuracion actualizada con exito..',
                showConfirmButton: false,
                timer: 1300
              })
              
             
            
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