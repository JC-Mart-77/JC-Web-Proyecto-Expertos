
  // This is called with the results from from FB.getLoginStatus().
  
  function statusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      FB.api('/me?fields=id,name,first_name,last_name,email,picture.type(large)', function(datosUsuario) {
        $("#texto-facebook").text('Continuar como '+datosUsuario.name);            
     });
      
    } else {
      // The person is not logged into your app or we are unable to tell.
     
  }
}

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '774632162971092',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v3.2' // The Graph API version to use for the call
    });
  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/es_LA/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function loginFacebook() {
    FB.login(function(response) {
      if (response.status=="connected"){
         FB.api('/me?fields=id,name,first_name,last_name,email,picture.type(large)', function(datosUsuario) {
          var parametros="idFacebook="+datosUsuario.id+"&nombre="+datosUsuario.first_name+"&apellido="+datosUsuario.last_name+"&correo="+datosUsuario.email+"&foto="+datosUsuario.picture.data.url;
          $.ajax({
                    url:"/login_facebook",
                    method:"POST",
                    data:parametros,
                    dataType:"json",
                    success:function(respuesta){
                        console.log(respuesta);
                        if(respuesta.status==1){
                         location.href ="../pages/index.html";
                        }else{
                            //document.getElementById('mensajes-login').innerHTML=respuesta.mensaje;
                           
                        }
                    },
                    error: function (e) {
                        console.log(e);
                    },
            });
                     
       });
      }

    }, {scope: 'public_profile,email'});
  }
