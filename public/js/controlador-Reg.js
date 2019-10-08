$("#btn-registrar").click(function(){
    var campos = [
        {campo:'nombre',valido:false},
        {campo:'apellido',valido:false},
        {campo:'nombreUsuario',valido:false},
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
    var campos2= $("#formRegistro").serialize();
    console.log("Información a guardar: " + campos2);
    $.ajax({
        url:"/user/signUp",
        method:"POST",
        data:campos2+"&tipoUsuario=Normal",
        dataType:"json",
        success: function(res){
            console.log(res);
            console.log("se registro el nuevo usuario")
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Usuario Registrado con Exito..',
                showConfirmButton: false,
                timer: 2000
              })
              limpiarCampos();
        },
        error:function(error){
            console.log(error);
        }
    });
})

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
    document.getElementById('nombre').value='';
    document.getElementById('apellido').value='';
    document.getElementById('nombreUsuario').value='';
    document.getElementById('email').value='';
    document.getElementById('password').value='';
 
}