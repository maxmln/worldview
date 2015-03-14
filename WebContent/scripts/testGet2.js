$(document).ready(function() {
    "use strict";

    function processResponse(response){
        console.log("working")
        console.log(JSON.stringify(response))
        console.log()
        var i=0;
        $.each(response,function(){
            if(response[i].city.indexOf($("#inputpictureid").val().replace(", ","-")) > -1
                && response[i].season.indexOf($("#seasoninput").val()) > -1
                && $("#seasoninput").val()!= "") {
                console.log("entered a city");
                addPictureInfo(response[i]);
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

    function processPost(response){
        console.log(JSON.stringify(response))
    }

    function clearFieldsAndContent(){
        $("#content").empty();
        $("#inputpictureid").val('');
        $("#seasoninput").val('');
        $("#objectnameinput").val('');
        $("#uploadimageurl").val('');
    }

    $("#getBtn").click(function(){
        $("#content").empty();
        $.ajax("http://private-6ba54-worldview.apiary-mock.com/photos", {
            method: "GET"
        }).then(processResponse);
    });

    $("#clearBtn").click(function(){
        clearFieldsAndContent();
    });

    $("#uploadBtn").click(function(){
        console.log("trying to upload");
        $.ajax("http://private-6ba54-worldview.apiary-mock.com/photos",{
            method: "POST",
            data:{
                id:3,
                city:$("#inputpictureid").val(),
                season:$("#seasoninput").val(),
                objectname:$("#objectnameinput").val()
            }
        }).then(processPost);
    });

    $("#inputpictureid").geocomplete();
    
});