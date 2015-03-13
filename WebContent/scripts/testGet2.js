$(document).ready(function() {
    "use strict";

    function processResponse(response){
      // console.log(JSON.stringify(response.city))
        //$.each(response,function(){
        if(response.city.indexOf($("#inputpictureid").val()) >- 1) {
            console.log(JSON.stringify(response.season));
            console.log(JSON.stringify(response.objectname));
            console.log(JSON.stringify(response.imgsource));
            addPictureInfo(JSON.stringify(response.imgsource))
        }
       // });
    }

    function addPictureInfo(pictureURL){
        var newImageElement = $("<img src="+ pictureURL +">")
        $("#imageHolder").append(newImageElement);
    }

    $("#getBtnId").click(function(){
        $.ajax("http://private-6ba54-worldview.apiary-mock.com/photos/"+$("#inputpictureid").val(), {
            method: "GET"
        }).then(processResponse);
    })

});