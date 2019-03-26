function addDataFilmsHB (title,originalTitle,lenguage,vote) {
  var data = {
    title : title,
    originalTitle : originalTitle,
    lenguage : lenguage,
    vote: vote,
    stars: addStars(vote),
  };

  var template = $("#film-template").html();
  var compiled = Handlebars.compile(template);
  var finalMessageFormHtml = compiled(data);

  var filmsCont = $(".film-container")
  filmsCont.append(finalMessageFormHtml);
}

function addStars (vote) {
  var starVote = Math.round(vote)/2;
  var emptyStar = "<i class='far fa-star'></i>"
  var spottyStar = "<i class='fas fa-star'></i>"
  for (var i = 0; i < 5; i++) {
    if (starVote <= i) {
      var newStar = spottyStar;
    } else {
      var newStar = emptyStar;
    }
  }
  return newStar;
}

function ajaxSearch (data) {
  var res = data.results;
  for (var i = 0; i < res.length; i++) {
    var title = res[i].title;
    var originalTitle = res[i].original_title;
    var lenguage = res[i].original_language;
    var vote = res[i].vote_average;
    // addStars (vote);
    addDataFilmsHB (title,originalTitle,lenguage,vote);
  }
}

function ajaxCall (title) {
  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: {
      api_key: "904095b7e749c808eeb90f272724f68e",
      language: "it-IT",
      query: title,
    },
    success: function (inData){
      var pages = inData.total_pages;
      console.log("total pages: " + pages);
      for (var k = 1; k <= pages; k++) {
        var page = k;
        console.log("page nr: " + page);
        ajaxSearch(inData);
      }
    },
    error: function (request, state, error){
      console.log("request",request);
      console.log("state",state);
      console.log("error", error);
    }

  });
}















function init() {
  var searchButton = $("#my-btn");
  searchButton.click(function(){
    var search = $("#searchBar").val();
    ajaxCall(search);
  });
  // var search = $("#searchBar").val();
}

$(document).ready(init);
