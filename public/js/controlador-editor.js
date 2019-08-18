var codProyecto = window.location.search.substring(1);
var aHtml;
var aCss;
var aJs;


var contenido;



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

 