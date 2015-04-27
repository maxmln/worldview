$(document).ready(function() {
    "use strict";
    var clickedSeason;
    var displayedPhotos =[];
    $("#searchInput").geocomplete();
    $("#location").geocomplete();

    $("#nearestBtn").click(function(){
        $("#row").empty();
        displayedPhotos.length=0;
        $.ajax("http://private-6ba54-worldview.apiary-mock.com/nearest",{
            method:"GET"
        }).then(processNearest)
    });

    function processNearest(response){
        var i=0;
        console.log(response);
        $.each(response,function(){
            addPhotoToList(response[i]);
            displayedPhotos.push(response[i]);
            i++;
        });
        //console.log(displayedPhotos)

    }

    function addPhotoToList(response){
        var img = $("<img>");
        img.attr("class","img-responsive");
        img.attr("src",response.imgurl);
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
            $.ajax("http://private-6ba54-worldview.apiary-mock.com/photos/"+this.id,{
                method:"GET"
            }).then(viewChosenPhoto)
        });
    }

    function viewChosenPhoto(response1){
        var delBtn = $("<button>X</button>");
        delBtn.attr("class","delete");
        delBtn.attr("id",JSON.stringify(response1[0].id));
        console.log(response1[0]);

        var img = $("<img>");
        img.attr("class","img-responsive");
        img.attr("src",response1[0].imgurl);
        img.attr("alt","");
        var a = $("<a></a>");
        a.attr("id",response1[0].id);
        a.attr("class","thumbnail");
        a.attr("href","#");
        var divImage = $("<div></div>");
        divImage.attr("class","col-lg-10 col-md-4 col-xs-6 thumb");
        a.append(img);
        divImage.append(a);
        divImage.append(delBtn);
        $("#row").append(divImage);
        var divInfo = $("<div></div>");
        divInfo.append($("<p>"+"Location : "+response1[0].location+"</p>"));
        divInfo.append($("<p>"+"Season : "+response1[0].season+"</p>"));
        divInfo.append($("<p>"+"Description : "+response1[0].description+"</p>"));
        divInfo.append($("<p>"+"Author : "+response1[0].author+"</p>"));
        $("#row").append(divInfo);

        delBtn.click(function(){
            console.log(this.id);
            $.ajax("http://private-6ba54-worldview.apiary-mock.com/photos/"+this.id,{
                method:"DELETE"
            }).then(successfullyDeleted)
        });

        function successfullyDeleted(){
            $("#row").empty();
        }
    }

    $("#searchBtn").click(function(){
        displayedPhotos.length=0;
        $("#row").empty();
        $.ajax("http://private-6ba54-worldview.apiary-mock.com/search",{
            method:"GET"
        }).then(searchFunc)
    });

    $("#summer, #winter, #autumn, #spring").click(function(){
        $("#row").empty();
        clickedSeason=this.id;
        $.ajax("http://private-6ba54-worldview.apiary-mock.com/search",{
            method:"GET"
        }).then(processSeasons);
    });

    function processSeasons(){
        var i=0;
        $.each(displayedPhotos,function(){
            console.log(displayedPhotos[i].season);
            if(clickedSeason==displayedPhotos[i].season){
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
            if(response2[i].location == $("#searchInput").val()){
                addPhotoToList(response2[i]);
                displayedPhotos.push(response2[i]);
            }
            i++;
        });
    }

    $("#submitUploadBtn").click(function(){
        $.ajax("http://private-6ba54-worldview.apiary-mock.com/photos/1",{
            method: "POST",
            contentType : "application/json",
            data: {
                season : $("#season").val(),
                imgUrl: $("#url").val(),
                description: $("#description").val(),
                author : {
                    "username" : "hello",
                    "password" : "secret"
                }
            }
        }).then(processPostResponse)
    });

    function processPostResponse(response4){
        console.log(response4);
    };
    



});
