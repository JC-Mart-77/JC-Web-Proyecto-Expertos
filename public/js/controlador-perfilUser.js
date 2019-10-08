
    var tipoUsuarios = ['Administrador', 'Autor', 'Lector'];
    for (let i=0;i<tipoUsuarios.length; i++)
    document.getElementById('tipoUsuario-modificar').innerHTML += `<option value="${i}">${tipoUsuarios[i]}</option>`;


    //funcion registrar un nuevo usuario//
    $("#btn-registrar-users").click(function(){
    var campos = [
        {campo:'nombre',valido:false},
        {campo:'apellido',valido:false},
        {campo:'usuario',valido:false},
        {campo:'email',valido:false},
        {campo:'password',valido:false}
    ];
    
    for (var i=0;i<campos.length;i++){
        campos[i].valido = validarCampoVacio(campos[i].campo);
    }

    for(var i=0;i<campos.length;i++){
        if (!campos[i].valido)
            return;
    }
    var campos2= $("#registroUsers").serialize() + "&tipoUsuario="+$("#tipoUsuario option:selected").text();
    console.log("Información a guardar: " + campos2);
    $.ajax({
        url:"/user/reg-users",
        method:"POST",
        data:campos2,
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se registro el nuevo usuario")
            document.getElementById('tabla-usuarios').innerHTML += 
                `<tr>
                    <td></td>
                    <td>${res.nombre}</td>
                    <td>${res.apellido}</td>
                    <td>${res.email}</td>
                    <td><span class="label label-primary">${res.tipoUsuario}</span></td>
                    <td style="width:70px;">
                    <a href="" onclick="editar(event, '${res._id}');" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i></a>
                    <a href="" onclick="eliminar(event, '${res._id}');" class="btn btn-xs btn-danger"><i class="fa fa-remove"></i></a>
                    </td>
                </tr>`;
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Usuario Registrado con Exito..',
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

function actualizarUsuarios(id){
    document.getElementById('tabla-usuarios').innerHTML ='';
    var campos2= $("#modificarUsers").serialize()+ "&tipoUsuario="+$("#tipoUsuario option:selected").text();
    console.log("Información a modificar: " + campos2);
    $.ajax({
        url:`/user/${document.getElementById('_id').value}`,
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
              limpiarModal();
            
        },
        error:function(error){
            console.log(error);
        }
    });
}
//funcion para generar las categorias//
function generarUsuarios(info){
    for (var i=0; i<info.length; i++){
        document.getElementById('tabla-usuarios').innerHTML += 
        `<tr>
            <td></td>
            <td>${info[i].nombre}</td>
            <td>${info[i].apellido}</td>
            <td>${info[i].email}</td>
            <td><span class="label label-primary">${info[i].tipoUsuario}</span></td>
            <td style="width:70px;">
            <a href="" onclick="editar(event, '${info[i]._id}');" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i></a>
            <a href="" onclick="eliminar(event, '${info[i]._id}');" class="btn btn-xs btn-danger"><i class="fa fa-remove"></i></a>
            </td>
        </tr>`;
    }
}
//funcion para obtener la categorias//
function datosUsuario(){
	$.ajax({
		url:"/nombre",
		method:"get",
		dataType:"json",
		success:function(res){
			document.getElementById('nombre-modificar').value = res[0].nombre;
            document.getElementById('apellido-modificar').value = res[0].apellido;
            document.getElementById('email-modificar').value = res[0].email;
            document.getElementById('password-modificar').value = res[0].password;

		},
	}); 
}

$(document).ready(function(){ 
    datosUsuario(); 
        
    });

//funcion editar categoriaa//
function editar(e,id){
    
    e.preventDefault();//Evitar comportamiento por defecto de un anchor
    $("#update-user").modal("show");
    console.log('Ver detalle de: ' + id);
    document.getElementById('_id').value=id;
    
    $.ajax({
        url:`/user/${id}`,
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