var express = require("express");
var router = express.Router();
var posts = require("../models/posts");
var mongoose = require("mongoose");

//Obtener el listado de todas las postss
router.get("/:id/comentarios",function(req,res){
    posts.aggregate([
        {
            $lookup:{
                from:"comentarios",
                localField:"titulo", 
                foreignField:"titulo",
                as:"comentarios"
            }
        },
        { 
            $project:{comentarios:{nombre:1, comentario:1}}
        }
    ])
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

router.get("/",function(req,res){
    posts.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Obtener una posts en particular
router.get("/:id",function(req,res){
    posts.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

router.put("/modificar/:id",function(req,res){
    posts.update(
        {_id:req.params.id},
        {
            $set:{
                titulo: req.body.titulo,
                autor: req.body.autor,
                fecha:req.body.fecha,
                contenido: req.body.contenido,
                imagen: req.body.imagenes,
                categoria: req.body.categorias,
                comentario: []
              
         }
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para guardar una posts
router.post("/add-posts", function(req, res){
    var p = new posts({
            titulo: req.body.titulo,
            autor: req.body.autor,
            fecha:req.body.fecha,
            contenido: req.body.contenido,
            imagen: req.body.imagenes,
            categoria: req.body.categorias,
            comentario: []
    });

    p.save()
    .then(obj=>{
        res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });

});


router.put("/:id",function(req,res){
    posts.update(
        {_id:req.params.id},
        {
            $push:{
                comentario: [{
                    nombre:req.body.nombre,
                    correo:req.body.correo,
                    comentario:req.body.comentario
                }]
            }
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });//El primero son los filtros, el segundo son los campos
});




//Peticion para eliminar un registro
router.delete("/:id",function(req, res){
    posts.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


module.exports = router;