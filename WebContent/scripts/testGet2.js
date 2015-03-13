$(document).ready(function() {
    "use strict";

    function processResponse(response){
       console.log(JSON.stringify(response))
        //$.each(response,function(){
        if(response.city.indexOf($("#inputpictureid").val()) >- 1) {
           console.log("entered a city")
            addPictureInfo(response)
        }
       // });
    }

    function addPictureInfo(response){
        var ImageElement = $("<img src="+ JSON.stringify(response.imgsource) +">")
        $("#imageHolder").append(ImageElement);
        var placeElement = $("<p>"+ JSON.stringify(response.city) +"</p>"
        $("#imageHolder").append(placeElement);
        var seasonElement = $("<p>"+ JSON.stringify(response.season) +"</p>")
        $("#imageHolder").append(seasonElement);
        var objectNameElement = $("<p>"+ JSON.stringify(response.objectname) +"</p>")
        $("#imageHolder").append(objectNameElement);
    }

    $("#getBtn  ").click(function(){
        console.log("button clicked")
        $.ajax("http://private-6ba54-worldview.apiary-mock.com/photos/"+$("#inputpictureid").val(), {
            method: "GET"
        }).then(processResponse);
    })

});