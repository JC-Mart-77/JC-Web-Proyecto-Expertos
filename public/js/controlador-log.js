$("#btn-login").click(function(){
    var campos= $("#formLog").serialize();
    console.log("Información a usar o guardar: " + campos);
    $.ajax({
        url:"/login",
        method:"POST",
        data:campos,
        dataType:"json",
        success: function(res){
            // aqui voy
            console.log('que paso');
            console.log(res);
            if(res.status==1){
                window.location.href="../pages/index.html" 
                //console.log("manda a otra padina");
               
            }else{
               console.log("no hizo lo correcto")
               Swal.fire({
                type: 'error',
                title: 'Usuario no Valido',
                text: 'Ingrese usuario y/o contraseña correctas',
                width: "25rem",
                padding:"1rem"
              })
           }     
        },
        error:function(error){
            
            console.log(error);
        }
    });
})