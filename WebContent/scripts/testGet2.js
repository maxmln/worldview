$(document).ready(function() {
    "use strict";

    function processResponse(response){
       console.log(JSON.stringify(response))
        $.each(response,function(){
            if(response.id==1){
                console.log(JSON.stringify(response.city));
            }
            //i++;
        });
    }

    $("#getBtnId").click(function(){
        $.ajax("http://private-6ba54-worldview.apiary-mock.com/photos/"+$("#inputpictureid").val(), {
            method: "GET"
        }).then(processResponse);
    })

});