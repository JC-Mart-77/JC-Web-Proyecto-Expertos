var express = require("express");
var router = express.Router();
var pagina = require("../models/paginas");

//Obtener el listado de todas las paginas
router.get("/listar",function(req,res){
    pagina.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Obtener una pagina en particular
router.get("/:id",function(req,res){
    pagina.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para guardar una pagina
router.post("/add-pagina", function(req, res){
    var p = new pagina({
            titulo: req.body.titulo,
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

//Peticion para actualizar un registro
router.put("/:id",function(req,res){
    pagina.update(
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

router.put("/modificar/:id",function(req,res){
    pagina.update(
        {_id:req.params.id},
        {
            $set:{
                titulo: req.body.titulo,
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


//Peticion para eliminar un registro
router.delete("/:id",function(req, res){
    pagina.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


module.exports = router;