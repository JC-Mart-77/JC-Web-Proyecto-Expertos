var codProyecto = window.location.search.substring(1);
var aHtml;
var aCss;
var aJs;


var contenido;

$(document).ready(function(){
    cargarProyecto();
});

function update(){
                var res=document.getElementById('resultado').contentWindow.document;
                
                res.open();
                res.writeln(edHtml.getValue() +
                            '<style>' + edCss.getValue() + '</style>'+
                             '<script>'+ edJs.getValue()+'<\/script>');

                res.close();
            }
  function setEditor(){
                window.edHtml= ace.edit('htmle');
                edHtml.setTheme("ace/theme/cobalt");
                edHtml.session.setMode("ace/mode/html");
                // edHtml.setValue();

               window.edCss= ace.edit("ecss");
                edCss.setTheme("ace/theme/cobalt");
                edCss.session.setMode("ace/mode/css");
                console.log(edCss)
               
               window.edJs= ace.edit("ejs");
                edJs.setTheme("ace/theme/cobalt");
                edJs.session.setMode("ace/mode/javascript");
               
                edHtml.getSession().on('change', function(){
                    update();
                    contenido=edHtml.getValue();
                    // console.log(contenido)
                })

                edCss.getSession().on('change', function(){
                    update();
                })

                edJs.getSession().on('change', function(){
                    update();
                    
                })

            }

  console.log(codProyecto);
 setEditor();
 update();

 $("#guardarproj").click(function(){
     
    $.ajax({  
        url:"http://localhost:3333/proyectos/"+ codProyecto,
        method:"get",
        dataType:"json",
         success: function(res){
                    console.log(res);
            if(res.length!=0){
                    console.log();
                    aHtml=edHtml.getValue();
                    aCss=edCss.getValue();
                    aJs=edJs.getValue();

                    campos={aHtml, aCss, aJs};
                    $.ajax({  
                        url:"http://localhost:3333/proyectos/"+ codProyecto,
                        method:"put",
                        data:campos,
                        dataType:"json",
                        success: function(res){
                            console.log(res);
                            Swal.fire({
                                position: 'center',
                                type: 'success',
                                title: 'Tu trabajo ha sido guardado',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            console.log("se va actualiza el usuario");
                        },
                    
                        error:function(error){
                            console.log(error);
                        }
                        })
                    }
            if(res.length==0){

                    $.ajax({  
                        url:"http://localhost:3333/archivos/"+ codProyecto,
                        method:"get",
                        dataType:"json",
                        success: function(res2){
                            // console.log(res[0].aHtml);
                            if(res2[0].extencion==1)
                            contenidoArchivo=edHtml.getValue();
                           
                            if (res2[0].extencion==2)
                            contenidoArchivo=edJs.getValue();
                            if(res2[0].extencion==3)
                            contenidoArchivo=edCss.getValue();
        
                            campos2={contenidoArchivo};
                            $.ajax({  
                                url:"http://localhost:3333/archivos/"+ codProyecto,
                                method:"put",
                                data:campos2,
                                dataType:"json",
                                success: function(res3){
                                    console.log(res3);
                                    Swal.fire({
                                        position: 'center',
                                        type: 'success',
                                        title: 'Tu trabajo ha sido guardado',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    console.log("se va actualiza el usuario");
                                },
                            
                                error:function(error){
                                    console.log(error);
                                }
                                })
                        },
                        error:function(error){  
                            console.log(error);
                        }
                })
                }
                },
         error:function(error){
          console.log(error);
                }
});
 });

function cargarProyecto(){
    // campos={aHtml, aCss, aJs};

    $.ajax({  
        url:"http://localhost:3333/proyectos/"+ codProyecto,
        method:"get",
        dataType:"json",
         success: function(res){
            console.log(res);
            if(res.length!=0){
            edHtml.setValue(res[0].aHtml);
            edCss.setValue(res[0].aCss);
            edJs.setValue(res[0].aJs)
            $("#nombreProyecto").html(`  `+res[0].nombre);
            }
            if(res.length==0){
                var contenidoa;
               var elemento;
                $("#descargar").css("display","block");
                $.ajax({  
                        url:"http://localhost:3333/archivos/"+ codProyecto,
                        method:"get",
                        dataType:"json",
                         success: function(res2){
                            // console.log(res[0].aHtml);
                            if(res2[0].extencion==1){
                                $("#ecss").fadeOut();
                                $("#ejs").fadeOut();
                                $("#tcss").css("display","none");
                                $("#tjs").css("display","none");
                             edHtml.setValue(res2[0].contenidoArchivo);
                              contenidoa=edHtml.getValue();
                              elemento= document.getElementById('descargar');

                              elemento.download= res2[0].nombre+".html"
                              elemento.href="data:application/octet-stream,"+encodeURIComponent(contenidoa)
                              console.log("elemento");
                            ext=".html";
                            
                            }
                            if (res2[0].extencion==2){
                                $("#ecss").fadeOut();
                                $("#htmle").fadeOut();
                                $("#thtml").css("display","none");
                                $("#tcss").css("display","none");
                                $(".format").css("left","-650");
                                $(".format").css("right","240");
                               
                             ext=".js"
                             edJs.setValue(res2[0].contenidoArchivo)
                             contenidoa=edJs.getValue();
                             elemento= document.getElementById('descargar');

                             elemento.download= res2[0].nombre+".js"
                             elemento.href="data:application/octet-stream,"+encodeURIComponent(contenidoa)
                             console.log("elemento");
                            }
                             if(res2[0].extencion==3){
                                $("#ejs").fadeOut();
                                $("#htmle").fadeOut();
                                $("#thtml").css("display","none");
                                $("#tjs").css("display","none");
                                $(".format").css("left","-50");
                                $(".format").css("right","140");
                               
                               
                             ext=".css"
                             edCss.setValue(res2[0].contenidoArchivo);
                             contenidoa=edCss.getValue();
                             elemento= document.getElementById('descargar');

                             elemento.download= res2[0].nombre+".css"
                             elemento.href="data:application/octet-stream,"+encodeURIComponent(contenidoa)
                             console.log("elemento");
                             }
                            $("#nombreProyecto").html(`  `+res2[0].nombre+ext);
                         },
                         error:function(error){
                             
                            console.log(error);
                         }
               })
            }
            
         },
         error:function(error){
            console.log(error);
        }  
        })
}