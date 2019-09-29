var express = require("express");
var router = express.Router();
var mongoose= require("mongoose");
var bodyParser = require("body-parser");

var usuario= require("../models/usuario");

/*router.get("/",function(req, res){
    usuario.find({_id:req.session.codigoUsuario})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
   
});*/

//Obtener un usuario en particular

/*-----------------Peticion de registro de usuarios-------------------------
---------------------------------------------------------------------------*/
router.post("/signUp", function(req, res){
    const { nombre, apellido, usuarioName, email, password, tipoUsuario} = req.body;
    var p = new usuario({
            nombre,
            apellido,
            usuarioName,
            email,
            password,
            tipoUsuario
    });

    // res.redirect()
    p.save()
    .then(obj=>{
        res.send(obj);
    })
    .catch(error=>{
        res.send(error);
    });

});
router.post("/reg-users", function(req, res){
    const { nombre, apellido, usuarioName, email, password, tipoUsuario} = req.body;
    var u = new usuario({
            nombre,
            apellido,
            usuarioName,
            email,
            password,
            tipoUsuario
    });

    // res.redirect()
    u.save()
    .then(obj=>{
        res.send(obj);
    })
    .catch(error=>{
        res.send(error);
    });

});

// getusuarios
router.get("/", function(req,res){
    usuario.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});



//Obtener un usuario en particular
router.get("/:id",function(req,res){
    usuario.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//------------------Peticion para actualizar un usuario-------------------
//------------------------------------------------------------------------
router.put("/:id",function(req,res){
    usuario.update(
        {_id:req.params.id},
        {$set:{
            nombre : req.body.nombre,
            apellido: req.body.apellido,
            email :req.body.email,
            password : req.body.password

            }
        })
        .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para eliminar un usuario
router.delete("/:id",function(req, res){
    usuario.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});



module.exports = router;