var express = require("express");
var router = express.Router();
var mongoose= require("mongoose");
var bodyParser = require("body-parser");

var mensajes= require("../models/mensaje");

//peticion para guardar una categoria//
router.post("/guardar-mensaje", function(req, res){
    const {nombre,correo,respuesta,titulo} = req.body;
    var p = new mensajes({
        nombre,
        correo,
        respuesta,
        titulo
        
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


router.get("/", function(req,res){
    mensajes.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});



//Obtener una comentario en particular
router.get("/:id",function(req,res){
    mensajes.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


//Peticion para actualizar contenido de una categoria
router.put("/:id",function(req,res){
    mensajes.update(
        {_id:req.params.id},
        {
            $set:{
            nombre:req.body.nombre,
            correo:req.body.correo,
            mensaje:req.body.mensaje,
            titulo:req.body.titulo
              
         }
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});


//Peticion para eliminar una categoria
router.delete("/:id",function(req, res){
    comment.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});



module.exports = router;