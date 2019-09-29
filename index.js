var express = require("express");
var session = require("express-session");
var database = require("./modules/database");
var usuario = require("./models/usuario");
var categoria = require("./models/categoria");
var imagen = require("./models/imagen");
var post = require("./models/posts");
var comentario = require("./models/comentario");
//var uuid = require('uuid/v4');
var usuariosRouter = require('./routers/usuarios-router');
var categoriasRouter = require('./routers/categorias-router');
var imagenRouter = require('./routers/imagen-router');
var comentariosRouter = require('./routers/comentarios-router');
var postsRouter = require('./routers/posts-router');
var bodyParser = require("body-parser");

const path = require('path');
const fs = require('fs');
//var formidable = require("express-formidable");
var app = express();
var mongoose = require('mongoose');
var multer= require("multer");

app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static("public"));

app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));
//app.use(formidable({keepExtensions:true}));
//Verificar si existe una variable de sesion para poner publica la carpeta public admin o cajero
//Implementar midleware que verifica si tiene acceso a las carpetas correspondientes utilizando las variables de sesion
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


app.get('/', (req, res) => {
	res.redirect('./pages/login.html');
});

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
  
  app.post('/subir-img', upload.single('img'),function(req,res){
    var extension = req.file.originalname.split('.').pop();
    var ruta = 'uploads/'+Date.now()+"."+extension;
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
        if (data.length==1){//Significa que si encontro un usuario con las credenciales indicadas
            //Establecer las variables de sesion
            req.session.correoUsuario = data[0].email;
            req.session.codigoUsuario = data[0]._id;
            res.send({status:1,mensaje:"Usuario autenticado con éxito"});
        }else{
            res.send({status:0,mensaje:"Credenciales inválidas"});
        }
        
    })
    .catch(error=>{
        res.send(error);
    }); 

});





app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect("/login.html");
});

//La siguiente es una peticion restringida, se envia una funcion midleware que verifica si esta autenticadoo no.
app.get("/peticion-registringido",verificarAutenticacion,function(req, res){
    res.send("Este es un contenido restringido");
    res.end();
});

///Para agregar seguridad a una ruta especifica, esta función sería llamada desde alguna peticion.
function verificarAutenticacion(req, res, next){
	if(req.session.correoUsuario)
		return next();
	else
		res.send("ERROR, ACCESO NO AUTORIZADO");
}

app.listen(3333, function(){
  console.log('servidos levantado en 3333');
});




