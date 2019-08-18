
$(window).load(function(){

    $(function() {
     $('#file-input').change(function(e) {
         addImage(e); 
        });
   
        function addImage(e){
         var file = e.target.files[0],
         imageType = /image.*/;
       
         if (!file.type.match(imageType))
          return;
     
         var reader = new FileReader();
         reader.onload = fileOnload;
         reader.readAsDataURL(file);
        }
     
        function fileOnload(e) {
         var result=e.target.result;
         $('#imgSalida').attr("src",result);
        }
       });
     });
function fileValidation() {
   
    var fileInput = document.getElementById('customFile');
    var filePath = fileInput.value;
    var allowedExtensions = /(.pdf|.mp4|.jpg|.jpeg|.png|.gif)$/i;
    console.log(filePath);
    console.log(allowedExtensions);
    if (!allowedExtensions.exec(filePath)) {
        alert('Please upload file having extensions .mp4/.jpeg/.jpg/.png/.gif only.');
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        if (fileInput.files && fileInput.files[0]) {
            console.log(fileInput.files);
            console.log(fileInput.files[0]);
            console.log(fileInput.files[0].type);
            var reader = new FileReader();
            if (fileInput.files[0].type == "application/mp4") {
                reader.onload = function(e) {
                    document.getElementById('imagePreview').innerHTML +=  
                    `<tr>
                    <td></td>
                    <td><img src="../img/icono-pdf.png" style="width: 80px; height: 80px;"></td>
                    <td>` + fileInput.files[0].name + `/td>
                    <td>
                    <a href="#" class="btn btn-xs btn-warning" id="editar-img"><i class="fa fa-pencil"></i></a>
                    <a href="#" class="btn btn-xs btn-danger" id="eliminar-img"><i class="fa fa-remove"></i></a>
                    </td>
                </tr>`;
                };
            } else {
                if (fileInput.files[0].type == "application/pdf") {
                    reader.onload = function(e) {
                        document.getElementById('imagePreview').innerHTML +=  
                        `<tr>
                        <td></td>
                        <td><img src="../img/icono-pdf.png" style="width: 80px; height: 80px;"></td>
                        <td>`+ fileInput.files[0].name + `/td>
                        <td>
                        <a href="#" class="btn btn-xs btn-warning" id="editar-img"><i class="fa fa-pencil"></i></a>
                        <a href="#" class="btn btn-xs btn-danger" id="eliminar-img"><i class="fa fa-remove"></i></a>
                        </td>
                    </tr>`;
                    };
                } else {
                reader.onload = function(e) {
                    document.getElementById('imagePreview').innerHTML += `<tr>
                    <td></td>
                    <td><img src="` + e.target.result + `" style="width: 120px; height: 120px;"/></td>
                    <td>` + fileInput.files[0].name + `/td>
                    <td>
                    <a href="#" class="btn btn-xs btn-warning" id="editar-img"><i class="fa fa-pencil"></i></a>
                    <a href="#" class="btn btn-xs btn-danger" id="eliminar-img"><i class="fa fa-remove"></i></a>
                    </td>
                </tr>`;
                };
            }
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
    }
}
$(window).load(function(){

    $(function() {
     $('#file-input-icon').change(function(e) {
         addImage(e); 
        });
   
        function addImage(e){
         var file = e.target.files[0],
         imageType = /image.*/;
       
         if (!file.type.match(imageType))
          return;
     
         var reader = new FileReader();
         reader.onload = fileOnload;
         reader.readAsDataURL(file);
        }
     
        function fileOnload(e) {
         var result=e.target.result;
         $('#imgFavicon').attr("src",result);
        }
       });
     });

    $(window).load(function(){

    $(function() {
    $('#file-input-user').change(function(e) {
        addImage(e); 
    });

    function addImage(e){
        var file = e.target.files[0],
        imageType = /image.*/;

        if (!file.type.match(imageType))
        return;

        var reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(file);
    }

    function fileOnload(e) {
        var result=e.target.result;
        $('#img-usuario').attr("src",result);
    }
    });
});