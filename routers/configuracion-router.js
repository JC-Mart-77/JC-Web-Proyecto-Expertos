var express = require("express");
var router = express.Router();
var configuracion = require("../models/configuracion");

//Obtener el listado de todas las configuracions
router.get("/",function(req,res){
    configuracion.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Obtener una configuracion en particular
router.get("/:id",function(req,res){
    configuracion.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para guardar una configuracion
router.post("/add-configuracion", function(req, res){
    var p = new configuracion({
            encabezado: req.body.encabezado,
            descripcion: req.body.descripcion,
            imagen: req.body.nombreImagen,
            piePagina: req.body.piePagina
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
    configuracion.update(
        {_id:req.params.id},
        {
            $set:{
                encabezado: req.body.encabezado,
                descripcion: req.body.descripcion,
                imagen: req.body.nombreImagen,
                piePagina: req.body.piePagina

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
    configuracion.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


module.exports = router;