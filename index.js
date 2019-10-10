var express = require("express");
var session = require("express-session");
var coo
var database = require("./modules/database");
var usuario = require("./models/usuario");
var categoria = require("./models/categoria");
var imagen = require("./models/imagen");
var post = require("./models/posts");
var pagina = require("./models/paginas");
var comentario = require("./models/comentario");
var mensaje = require("./models/mensaje");
var configuracion = require("./models/configuracion");
var usuariosRouter = require('./routers/usuarios-router');
var categoriasRouter = require('./routers/categorias-router');
var imagenRouter = require('./routers/imagen-router');
var comentariosRouter = require('./routers/comentarios-router');
var mensajesRouter = require('./routers/mensajes-router');
var postsRouter = require('./routers/posts-router');
var paginasRouter = require('./routers/paginas-router');
var configuracionRouter = require('./routers/configuracion-router');
var bodyParser = require("body-parser");

const path = require('path');
const fs = require('fs');
//var formidable = require("express-formidable");
var app = express();
var mongoose = require('mongoose');
var multer= require("multer");
var loginVerificado = express.static("public");

app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static("public"));
var loginVerificado = express.static("public");

app.set('port', (process.env.PORT || 3000));
app.use(session({
    secret:"jcweb_db",
    resave:true, 
    saveUninitialized:true
}));
//app.use(formidable({keepExtensions:true}));
//Verificar si existe una variable de sesion para poner publica la carpeta public admin o cajero
//Implementar midleware que verifica si tiene acceso a las carpetas correspondientes utilizando las variables de sesion
app.use(
    function(req,res,next){
        if (req.session.codigoUsuario){
            loginVerificado(req, res, next);
        }
        else{
            return next();
        }
    }
);

app.use("/usuarios",usuario);
app.use("/user",usuariosRouter);
app.use("/categorias",categoria);
app.use("/cate",categoriasRouter);
app.use("/imagenes",imagen);
app.use("/img",imagenRouter);
app.use("/posts",post);
app.use("/post",postsRouter);
app.use("/comentarios",comentario);
app.use("/comment",comentariosRouter);
app.use("/mensajes",mensaje);
app.use("/msj", mensajesRouter);
app.use("/paginas",pagina);
app.use("/pages",paginasRouter);
app.use("/configuraciones",configuracion);
app.use("/config",configuracionRouter);



var storage	=	multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
  });
  var upload = multer({ storage : storage});
  
  app.get('/',function(req,res){
        res.sendFile(__dirname + "/index.html");
  });
  
  app.post('/subir-img', verificarAutenticacion, upload.single('img'),function(req,res){
    //var extension = req.file.originalname.split('.').pop();
    var ruta = 'uploads/'+req.file.originalname;
    var tipo = req.file.mimetype;
    fs.rename(req.file.path,'public/'+ruta,function (err) {
        if (err) throw err;
        
      });
      //const {nombre} = req.file.originalname;
    console.log(tipo);
    var p = new imagen({
        nombre:ruta,
        tipo:tipo
        
    });
    p.save()
    .then(obj=>{
        res.redirect('../pages/gallery.html');
    })
    .catch(error=>{
        res.send(error);
    });

     /* upload(req,res,function(err) {
          if(err) {
              return res.end("Error uploading file.");
          }
          res.end("File is uploaded successfully!");
      });*/
  });
  
app.get("/listar-img/",function(req,res){
    imagen.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});
app.delete("/delete:id",function(req, res){
    imagen.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});
app.post("/login",function(req, res){
    usuario.find({email:req.body.email, password:req.body.password})
    .then(data=>{
        if (data.length==1){
            req.session.codigoUsuario = data[0]._id;

            res.cookie("codigoUsuario", req.session.codigoUsuario);

            res.send({status:1,mensaje:"Usuario loggeado con éxito" + req.session.codigoUsuario});
        }else{
            res.send({status:0,mensaje:"Correo o contraseña incorrecta."});
        }
        
    })
    .catch(error=>{
        res.send(error);
    });
});
//para obtener la sesion del usuario
app.get("/nombre",function(req, res){
    usuario.find({_id:req.session.codigoUsuario})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
  
});
app.get("/",function(req, res){
    usuario.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
  
});
//para cerrar la session
app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect('../pages/login.html');
});

//La siguiente es una peticion restringida, se envia una funcion midleware que verifica si esta autenticadoo no.
app.get("/peticion-registringido",verificarAutenticacion,function(req, res){
    res.send("Este es un contenido restringido");
    res.end();
});
app.get('/index.html', verificarAutenticacion, function (res, req, next) {  
    res.redirect('/');
});

///Para agregar seguridad a una ruta especifica, esta función sería llamada desde alguna peticion.
function verificarAutenticacion(req, res, next) {
    if ( req.session.codigoUsuario){
        return next();
    }
    else{
        res.redirect('../pages/index.html');

    }
}

app.post("/login_facebook",function(req, res){
    usuario.find({idFacebook:req.body.idFacebook})
    .then(data=>{
        if (data.length==1){
            req.session.codigoUsuario = data[0]._id;
            //Actualizar los datos
                usuario.update(
                    {_id:data[0]._id},
                    {
                        nombre : req.body.nombre,
                        apellido : req.body.apellido,
                        //usuario: nombre_usuario,
                        email : req.body.email,
                       // foto: req.body.foto+"&height="+req.body.height+"&width="+req.body.width+"&ext="+req.body.ext+"&hash="+req.body.hash,
                        
                    }
                ).then(result=>{
                
                })
                .catch(error=>{
                    res.send(error);
                });
            
            res.send({status:1,mensaje:"Usuario autenticado con éxito"});

        }else{
          var sufix=Math.round(Math.random() * 101);
           var nombre_usuario= req.body.apellido+ sufix.toString();
            var u = new usuario({
                idFacebook :req.body.idFacebook,
                nombre : req.body.nombre,
                apellido : req.body.apellido,
                password: req.body.password,
                email : req.body.email,
                //foto: req.body.foto+"&height="+req.body.height+"&width="+req.body.width+"&ext="+req.body.ext+"&hash="+req.body.hash,
        });
    
        u.save()
        .then(obj=>{
            req.session.codigoUsuario = obj._id;
            res.send({status:1,mensaje:"Usuario autenticado con éxito"});
        })
        .catch(e=>{
            res.send(e);
        });
      }//fin insertar
    })
    .catch(error=>{
        res.send(error);
    });
});


app.listen(app.get('port'), function() {
  console.log('servidos levantado en 3333');
});




