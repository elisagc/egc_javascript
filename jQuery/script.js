$(document).ready(function(){

    //LOCALSTORAGE

    var $local=JSON.parse(localStorage.getItem("movies")) ; 

    if ($local===null){
        $local=[];
    }

    $($local).each(function(i,element){
        
        var $newTr=$("<tr>");

        var $newMovie=$("<td>", {text:element.movie});

       $newMovie.addClass("tdSize");

        var $newRating=$("<td>", {text:element.rating});
        
        var $button= $("<button>",
            {text:"Delete"});
        
       $button.addClass("btn btn-danger");
        
        $($newTr).append($newMovie);
        $($newTr).append($newRating);
        $($newTr).append($button);
        $("#tbody").append($newTr);
    });

    //ADD ROW

    $("form").on("click","button", function(e){
        e.preventDefault();

        console.log($("#movie").val());

        if($("#movie").val() !== "" && $("#rating").val() !== ""){
            var $newTr=$("<tr>");

            var $newMovie=$("<td>",
                {text:$("#movie").val()});
            
            $newMovie.addClass("tdSize");

            var $newRating=$("<td>",
                {text:$("#rating").val()});
            
            var $button= $("<button>",
                {text:"Delete"});
            
            $button.addClass("btn btn-danger");
            
            $($newTr).append($newMovie);
            $($newTr).append($newRating);
            $($newTr).append($button);
            $("#tbody").append($newTr);

            $("#movie").val("");
            $("#rating").val("");

        // ADD TO LOCALSTORAGE
        
            $local.push({movie: $newMovie.text(), rating: $newRating.text()});
            localStorage.setItem("movies", JSON.stringify($local));
        }
    });

    // DELETE ROW
   
    $("table").on("click","tr", function(e){

        var removeMovie=e.currentTarget.children[0].innerText;
        var local=JSON.parse(localStorage.getItem("movies"));

            if(e.target.nodeName.toLowerCase() == 'button'){
                e.currentTarget.remove();

    // DELETE FROM LOCALSTORAGE

                var filterMovie = local.filter(function(value, index, arr){
                    return value.movie != removeMovie;
                });
        
            localStorage.setItem("movies", JSON.stringify(filterMovie));
        }
    });

    //ORDER BY MOVIE OR RANKING

    $("img").on("click",function(e){

        var order=e.currentTarget.id;
        
        $("#tbody").find("tr").sort(function(a,b){
            if (order==="upMovie"){
                return $('td:first', a).text().localeCompare($('td:first', b).text());
            }else if(order==="downMovie"){
                return $('td:first', b).text().localeCompare($('td:first', a).text());
            } else if (order==="upRanking"){
                return $('td:last', a).text().localeCompare($('td:last', b).text());
            }else if (order==="downRanking"){
                return $('td:last', b).text().localeCompare($('td:last', a).text());
            }     
        }).appendTo($("#tbody")); 
    });

});

