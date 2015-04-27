$(document).ready(function() {
    "use strict";
    var clickedSeason;
    var displayedPhotos =[];
    $("#searchInput").geocomplete();
    $("#location").geocomplete();

    $("#nearestBtn").click(function(){
        $("#row").empty();
        displayedPhotos.length=0;
        $.ajax("http://localhost:8080/WView/api/photos/",{
            method:"GET"
        }).then(processNearest)
    });

    function processNearest(response){
        var i=0;
        console.log(response);
        $.each(response,function(){
            addPhotoToList(response[i]);
            displayedPhotos.push(response[i]);
            //console.log(response[i])
            i++;
        });
    }

    function addPhotoToList(response){
        //console.log(response);
        var img = $("<img>");
        img.attr("class","img-responsive");
        img.attr("src",response.imgUrl);
        img.attr("alt","");
        var a = $("<a></a>");
        a.attr("id",response.id);
        a.attr("class","thumbnail");
        a.attr("href","#");
        var divImage = $("<div></div>");
        divImage.attr("class","col-lg-3 col-md-4 col-xs-6 thumb");
        a.append(img);
        divImage.append(a);
        $("#row").append(divImage);

        a.click(function(){
            $("#row").empty();
            displayedPhotos.length=0;
            $.ajax("http://localhost:8080/WView/api/photos/"+this.id,{
                method:"GET"
            }).then(viewChosenPhoto)
        });
    }

    function viewChosenPhoto(response1){
        console.log(response1);
        var delBtn = $("<button>X</button>");
        delBtn.attr("class","delete");
        delBtn.attr("id",response1.id);

        var img = $("<img>");
        img.attr("class","img-responsive");
        img.attr("src",response1.imgUrl);
        img.attr("alt","");
        var a = $("<a></a>");
        a.attr("id",response1.id);
        a.attr("class","thumbnail");
        a.attr("href","#");
        var divImage = $("<div></div>");
        divImage.attr("class","col-lg-10 col-md-4 col-xs-6 thumb");
        a.append(img);
        divImage.append(a);
        divImage.append(delBtn);
        $("#row").append(divImage);
        var divInfo = $("<div></div>");
        divInfo.append($("<p>"+"Location : "+response1.description+"</p>"));
        divInfo.append($("<p>"+"Season : "+response1.season+"</p>"));
        divInfo.append($("<p>"+"Author : "+response1.author.username+"</p>"));
        var editButton = $("<button> Edit Info </button>");
        divInfo.append(editButton);
        $("#row").append(divInfo);

        delBtn.click(function(){
            console.log(this.id);
            $.ajax("http://localhost:8080/WView/api/photos/"+this.id,{
                method:"DELETE"
            }).then(successfullyDeleted)
        });

        editButton.click(function(){
           alert("Enter new values in the text fields below the picture");
            $.ajax("http://localhost:8080/WView/api/photos/",{
                method: "PUT",
                contentType : "application/json",
                data: JSON.stringify({
                    season : $("#season").val(),
                    imgUrl: $("#url").val(),
                    description: $("#location").val(),
                    author : {
                        "username" : $("#author").val(),
                        "password" : "secret"
                    }
                })
            }).then(replaceFunc)
        });

        function replaceFunc(response5){
            console.log(response5);
            viewChosenPhoto(response5);
            $("#season").val('');
            $("#url").val('');
            $("#location").val('');
            $("#author").val('');
        }

        function successfullyDeleted(){
            $("#row").empty();
        }
    }

    $("#searchBtn").click(function(){
        displayedPhotos.length=0;
        $("#row").empty();
        $.ajax("http://localhost:8080/WView/api/photos/",{
            method:"GET"
        }).then(searchFunc)
    });

    $("#summer, #winter, #autumn, #spring").click(function(){
        $("#row").empty();
        clickedSeason=this.id;
        $.ajax("http://localhost:8080/WView/api/photos/",{
            method:"GET"
        }).then(processSeasons);
    });

    function processSeasons(){
        var i=0;
        $.each(displayedPhotos,function(){
            console.log(displayedPhotos[i].season);
            if(clickedSeason==displayedPhotos[i].season.toLowerCase()){
                console.log(displayedPhotos[i]);
                addPhotoToList(displayedPhotos[i]);
            }
            i++;
        });
    }

    function searchFunc(response2){
        console.log(response2);
        var i=0;
        $.each(response2,function(){
            if(response2[i].description == $("#searchInput").val()){
                addPhotoToList(response2[i]);
                displayedPhotos.push(response2[i]);
            }
            i++;
        });
    }

    $("#submitUploadBtn").click(function(){
        $("#row").empty();
        $.ajax("http://localhost:8080/WView/api/photos/",{
            method: "POST",
            contentType : "application/json",
            data: JSON.stringify({
                season : $("#season").val(),
                imgUrl: $("#url").val(),
                description: $("#location").val(),
                author : {
                    "username" : $("#author").val(),
                    "password" : "secret"
                }
            })
        }).then(processPostResponse)
    });

    function processPostResponse(response4){
        console.log(response4);
        viewChosenPhoto(response4);
        $("#season").val('');
        $("#url").val('');
        $("#location").val('');
        $("#author").val('');
    };
    



});
