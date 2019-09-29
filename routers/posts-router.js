var express = require("express");
var router = express.Router();
var posts = require("../models/posts");

//Obtener el listado de todas las postss
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

//Peticion para guardar una posts
router.post("/add-posts", function(req, res){
    var p = new posts({
            titulo: req.body.titulo,
            autor: req.body.autor,
            fecha:req.body.fecha,
            contenido: req.body.contenido,
            imagen: req.body.nombreImagen,
            categoria: {
                _id: req.body.categoria,
                nombre: req.body.nombreCategoria
        }
    });

    p.save()
    .then(obj=>{
        res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });

});

//Peticion para actualizar un registro
router.put("/:id",function(req,res){
    posts.update(
        {_id:req.params.id},
        {
            nombre : req.body.nombre,
            descripcion : req.body.descripcion,
            caratula:req.body.caratula,
            categoria : {
                    nombre : req.body.nombreCategoria,
                    orden : req.body.ordenCategoria
            },
            calificacion : req.body.calificacion,
            imagenes : []
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