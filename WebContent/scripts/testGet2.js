$(document).ready(function() {
    "use strict";

    function processResponse(response){
        console.log("working")
        console.log(JSON.stringify(response))
        var i=0;
        $.each(response,function(){
            if(response[i].city.indexOf($("#inputpictureid").val()) >- 1
                && response[i].season.indexOf($("#seasoninput").val()) >- 1 ) {
                console.log("entered a city")
                addPictureInfo(response[i])
                i++;
            }
        });
    }

    function addPictureInfo(response){
        var ImageElement = $("<img src="+ JSON.stringify(response.imgsource) +">");
        $("#content").append(ImageElement);
        var placeElement = $("<p>"+ JSON.stringify(response.city) +"</p>");
        $("#content").append(placeElement);
        var seasonElement = $("<p>"+ JSON.stringify(response.season) +"</p>");
        $("#content").append(seasonElement);
        var objectNameElement = $("<p>"+ JSON.stringify(response.objectname) +"</p>");
        $("#content").append(objectNameElement);
    }

    $("#getBtn").click(function(){
        $("#content").empty();
        $.ajax("http://private-6ba54-worldview.apiary-mock.com/photos/"+$("#inputpictureid").val(), {
            method: "GET"
        }).then(processResponse);
    })

});