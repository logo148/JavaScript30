$(document).ready(function() {

    var tmdbHref = "https://www.themoviedb.org/movie/"
    var apiKey = "59e14d867ef664881ccfdb7da24f6502";

    $("#searchbtn").on("click", getSearchResult);
    $("#searchtext").keypress(function(event) {
        if (event.keyCode == 13) {
            $("#searchbtn").trigger("click");
        }
    });
    $("form").submit(function() { return false; }); //取消enter送出

    $(".allresultmovies").on("click", ".addmovie", addToMyList);
    $(".allmymovies").on("click", ".deletemovie", deleteMyMovie);

    $(".allresultmovies").empty();
    loadLocalStorage();

    //離線儲存
    function loadLocalStorage() {
        var movieListId = getMovieListId();
        for (var i = 0; i < movieListId.length; i++) {
            var key = movieListId[i];
            var value = localStorage[key];
            loadMovie(key, value);
        }
    }

    function getMovieListId() {
        var movieListId = localStorage.getItem("movieList");
        if (!movieListId) {
            movieListId = [];
            localStorage.setItem("movieList", JSON.stringify(movieListId));
        } else {
            movieListId = JSON.parse(movieListId);
        }
        return movieListId;
    }

    function loadMovie(key, value) {
        var href = tmdbHref + key.slice(10);
        var title = value;

        var $titleLink = $("<a target='_blank'></a>");
        $titleLink.attr("href", href).html(title);

        var $deleteBtn = $("<button type='button'></button>");
        $deleteBtn.addClass("deletemovie");

        var $li = $("<li></li>");
        $li.addClass("mymovie").append($titleLink).append($deleteBtn);

        $(".allmymovies").append($li);
    }

    function deleteMyMovie() {
        var href = $(this).parent("li").find("a").attr("href");
        var key = "movieList_" + href.split("/")[href.split("/").length - 1];
        var movieListId = getMovieListId();

        if (movieListId.indexOf(key) != -1) {
            movieListId.splice(movieListId.indexOf(key), 1); //要避免沒有找到相符的會=-1溢出從後面算很麻煩
        }
        localStorage.setItem("movieList", JSON.stringify(movieListId));
        localStorage.removeItem(key);
        $(this).parent().remove();
    }

    function getSearchResult() {
        var searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=zh-TW&query=" + $("#searchtext").val();
        $.ajax({
            url: searchUrl,
            type: 'GET',
            success: data => printResult(data),
            error: err => $(".allresultmovies").html(err.statusText)
        });

        $("#searchtext").val("");
    };

    function printResult(data) {
        $(".allresultmovies").empty();
        if (data.total_results == 0) {
            $(".allresultmovies").text("無搜尋結果");
            return;
        }
        data.results.map(movie => resultHandle(movie));
    }

    function resultHandle(movie) {
        var key = "movieList_" + movie.id.toString();
        var href = tmdbHref + movie.id.toString();
        var posterImg = (movie.poster_path == null ? "/images/noposteravailable.jpg" : "https://image.tmdb.org/t/p/w200" + movie.poster_path);
        var title = movie.title;
        var overview = movie.overview;

        var $posterLink = $("<a target='_blank'></a>");
        $posterLink.attr("href", href).html("<img src='" + posterImg + "'>");

        var $movieInfo = $("<div></div");
        $movieInfo.addClass("movieinfo");
        var $titleLink = $("<a target='_blank'></a>");
        $titleLink.attr("href", href).html(title);
        $movieInfo.append($titleLink).append("<p>" + overview + "</p>");

        var $addBtn = $("<button type='button'></button>");

        var movieListId = getMovieListId();
        if (movieListId.indexOf(key) == -1) {
            $addBtn.addClass("addmovie");
        } else {
            $addBtn.css("background-image", "url('./images/icon/added.png')");
        }

        var $li = $("<li></li>");
        $li.addClass("resultmovie").append($posterLink).append($movieInfo).append($addBtn);

        $(".allresultmovies").append($li);
    }

    function addToMyList() {
        var href = $(this).parent("li").find("a").attr("href");
        var movieId = href.split("/")[href.split("/").length - 1];

        var title = $(this).parent("li").find(".movieinfo > a").text();

        var $titleLink = $("<a target='_blank'></a>");
        $titleLink.attr("href", href).html(title);

        var $deleteBtn = $("<button type='button'></button>");
        $deleteBtn.addClass("deletemovie");

        var $li = $("<li></li>");
        $li.addClass("mymovie").append($titleLink).append($deleteBtn);

        $(".allmymovies").append($li);

        $(this).removeClass("addmovie");
        $(this).css("background-image", "url('./images/icon/added.png')");

        saveMovie(movieId, title);
    }

    function saveMovie(movieId, title) {
        var key = "movieList_" + movieId;
        var value = title;

        var movieListId = getMovieListId();
        localStorage.setItem(key, value);
        movieListId.push(key);
        localStorage.setItem("movieList", JSON.stringify(movieListId));
    }

});