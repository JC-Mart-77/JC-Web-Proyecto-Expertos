

var campos = [
    {id:'firstName', valido:false},
    {id:'lastName', valido:false},
    {id:'inputEmail', valido:false},
    {id:'inputPassword', valido:false},
    {id:'confirmPassword', valido:false}
  ];
  
  function validarCampos(){
    for (let i = 0; i<campos.length; i++)
        campos[i].valido = validarCampoVacio(campos[i].id);
    
  
    for (let i = 0; i<campos.length; i++)
        if (!campos[i].valido)
            return;
    
    let json = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        correo: document.getElementById('inputEmail').value,
        password: document.getElementById('inputPassword').value,
        confirmpassword: document.getElementById('confirmPassword').value,
        
    }
  
    return json;
  }
  function validarCampoVacio(id){
    let resultado = (document.getElementById(id).value=="")?false:true;
    marcarInput(id,resultado);
    return resultado; 
    
  }
  function registro(){
    let json = validarCampos();
    if (json==null || json == undefined)
        return;
        console.log('json');
    
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