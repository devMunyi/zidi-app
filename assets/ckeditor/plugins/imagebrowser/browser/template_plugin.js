// show images upload demo
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#flFileUpload").change(function(){
    readURL(this);
});
// check images demo
var _validFileExtensions = [".jpg", ".jpeg",".gif", ".png", ".svg"];
function Validate(oForm) {
    var arrInputs = oForm.getElementsByTagName("input");
    if(arrInputs === ''){
      alert('File upload: *jpg *jpeg *gif *png *svg');
      return false;
    }
    for (var i = 0; i < arrInputs.length; i++) {
        var oInput = arrInputs[i];
        if (oInput.type == "file") {
            var sFileName = oInput.value;
            if (sFileName.length > 0) {
                var blnValid = false;
                for (var j = 0; j < _validFileExtensions.length; j++) {
                    var sCurExtension = _validFileExtensions[j];
                    if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                        blnValid = true;
                        break;
                    }
                }

                if (!blnValid) {
                    alert('File upload: *jpg *jpeg *gif *png *svg');
                    return false;
                }
            }
        }
    }
    return true;
}

//delete file
$(document).on('click', '.show_image_list span', function () {
  var url_del = $(this).attr('data-image')
  if(url_del.split('/').pop() !== 'no-image.png'){
      $.ajax({
        url: '/delete_file',
        type: 'POST',
        dataType: 'text',
        data: {
            url_del: url_del          
        },
        success: function(result){
          location.reload();
        }
      });
  }else{
      alert('Cannot delete "no-image.png" ')
  }
});
