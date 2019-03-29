//FUNZIONE PER LA CREAZIONE DEL TEMPLATE RICEVENDO TUTTI I PARAMETRI ESTERNI DALLA CHIAMATA AJAX
function addDataFilmsHB (title,originalTitle,lenguage,vote,copertina) {
  var data = {
    title : title.toUpperCase(),
    originalTitle : originalTitle,
    lenguage : lenguage,
    flag : addFlags (lenguage),
    vote : vote,
    stars : addStars(vote),
    copertina : copertina,
  };

  var template = $("#film-template").html();
  var compiled = Handlebars.compile(template);
  var finalMessageFormHtml = compiled(data);

  var filmsCont = $(".film-container")
  filmsCont.append(finalMessageFormHtml);
}
//FUNZIONE PER LA CREAZIONE DEL TEMPLATE RICEVENDO TUTTI I PARAMETRI ESTERNI DALLA CHIAMATA AJAX
function addDataSeriesHB (name,lenguage,vote,copertina) {
  var data = {
    title : name.toUpperCase(),
    // originalTitle : originalTitle,
    lenguage : lenguage,
    flag : addFlags (lenguage),
    vote : vote,
    stars : addStars(vote),
    copertina : copertina,
  };

  var template = $("#film-template").html();
  var compiled = Handlebars.compile(template);
  var finalMessageFormHtml = compiled(data);

  var seriesCont = $(".series-container")
  seriesCont.append(finalMessageFormHtml);
}
//FUNZIONE PER CONVERTIRE IL VOTO (ARROTONDATO all'intero più vicino) IN STELLE
function addStars (vote) {
  var starVote = Math.round(vote)/2;
  var emptyStar = "<i class='fas fa-star'></i>"
  var spottyStar = "<i class='far fa-star'></i>"
  var starsList = $(".starsList");
  var newStar ="";
  for (var i = 0; i < 5; i++) {
    if (starVote <= i) {
      newStar += spottyStar;
    } else {
      newStar += emptyStar;
    }
  }
  return newStar;
}
//FUNZIONE PER L'AGGIUNTA DELLE BANDIERE
function addFlags (lenguage) {
  var flag = document.createElement("img");
  switch (lenguage) {
    case "fr":
      flag.src = "flags_img/Flag_of_France.svg";
      break;
    case "it":
      flag.src = "flags_img/Flag_of_Italy.svg";
      break;
    case "en":
      flag.src = "flags_img/Flag_of_the_United_Kingdom.svg";
      break;
    case "de":
      flag.src = "flags_img/Flag_of_Germany.svg";
      break;
    case "es":
      flag.src = "flags_img/Flag_of_Spain.svg";
      break;

    // default: flag.src = "flags_img/boh.png";
  }

  //Stessa cosa utilizzando una serie di if else concatenati
  // if (lenguage == "fr") {
  //   flag.src = "flags_img/Flag_of_France.svg";
  // } else if (lenguage == "it") {
  //   flag.src = "flags_img/Flag_of_Italy.svg";
  // } else if (lenguage == "en") {
  //   flag.src = "flags_img/Flag_of_the_United_Kingdom.svg";
  // } else if (lenguage == "de") {
  //   flag.src = "flags_img/Flag_of_Germany.svg";
  // } else {
  //   flag.src = "flags_img/boh.png";
  // }
  flag.className = "flagSize";
  return flag.outerHTML;
}
//FUNZIONE PER RIPULIRE I VECCHI RISULTATI
function clearOldData () {
  var film = $(".film");
  film.remove();
}
//FUNZIONE PER RICERCARE I VALORI INTERESSATI ALL'INTERNO DELL'ARRAY CHE VIENE RESTITUITO DALLA CHIAMATA AJAX
function ajaxSearch (data) {
  var res = data.results;
  for (var i = 0; i < res.length; i++) {
    var title = res[i].title;
    var name = res[i].name;
    var originalTitle = res[i].original_title;
    var lenguage = res[i].original_language;
    var vote = res[i].vote_average;
    var copertina = "https://image.tmdb.org/t/p/w185"+res[i].poster_path;
    addDataFilmsHB (title,originalTitle,lenguage,vote,copertina);
    console.log(name);
    addDataSeriesHB (name,lenguage,vote,copertina);
  }
}
//FUNZIONE PER RICHIAMARE I DATI DI TUTTI I FILM CON UN DATO TITOLO, TRAMITE UN API
function filmAjaxCall () {
  var search = $("#searchBar").val();
  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: {
      api_key: "904095b7e749c808eeb90f272724f68e",
      language: "it-IT",
      query: search,
      // page :
    },
    success: function (inData){
      // var pages = inData.total_pages;
      // console.log("total pages: " + pages);
      clearOldData();
      ajaxSearch(inData);
    },
    error: function (request, state, error){
      console.log("request",request);
      console.log("state",state);
      console.log("error", error);
    }

  });
}
//FUNZIONE PER RICHIAMARE I DATI DI TUTTI I FILM CON UN DATO TITOLO, TRAMITE UN API
function seriesAjaxCall () {
  var search = $("#searchBar").val();
  $.ajax({
    url: "https://api.themoviedb.org/3/search/tv",
    method: "GET",
    data: {
      api_key: "904095b7e749c808eeb90f272724f68e",
      language: "it-IT",
      query: search,
      // page :
    },
    success: function (inData){
      clearOldData();
      ajaxSearch(inData);
    },
    error: function (request, state, error){
      console.log("request",request);
      console.log("state",state);
      console.log("error", error);
    }

  });
}
//FUNZIONE PER MOSTRARE I DATI DEL FILM ON HOVER
function filmDataOnHover () {
  var selectedFilm = $(this);
  var infoCont = selectedFilm.find(".info-container");

  infoCont.toggle();
}














function init() {
  var searchButton = $("#my-btn");
  searchButton.click(filmAjaxCall);
  searchButton.click(seriesAjaxCall);
  var search = $("#searchBar");
  search.on("keyup",function(){
    if (event.which==13) {
      filmAjaxCall();
      seriesAjaxCall();
    }
  });

  $(document).on("mouseenter", ".film", filmDataOnHover)
  $(document).on("mouseleave", ".film", filmDataOnHover)
}

$(document).ready(init);
