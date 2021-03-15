$(document).ready(function() {

    $(".nextbtn").click(function() {
        var $next = $(this).parents(".mainzone").find(".selecteddpic").next();
        if ($next.length == 0) {
            $(this).parents(".mainzone").find(".portfoliopics").first().trigger('click');
        } else {
            $next.trigger('click');
        }
    });

    $(".prevbtn").click(function() {
        var $prev = $(this).parents(".mainzone").find(".selecteddpic").prev();
        if ($prev.length == 0) {
            $(this).parents(".mainzone").find(".portfoliopics").last().trigger('click');
        } else {
            $prev.trigger('click');
        }
    });

    $(".portfoliopics").click(function() {
        $(this).parent().children().removeClass("selecteddpic");
        $(this).addClass("selecteddpic");
        $(this).parents(".mainzone").find(".mainpic").attr("src", $(this).children().attr("src"));
    });

    $(".showpic>img").click(function() {
        $("#fullsizepic").attr("src", $(this).attr("src"));
        $(".largerpic").css({ "display": "block" });
    });
    
    $(".description>div>img").click(function() {
        $("#fullsizepic").attr("src", $(this).attr("src"));
        $(".largerpic").css({ "display": "block" });
    });


    $(".largerpic").click(function() {
        $(this).css({ "display": "none" });
    });

    $(".skill").hover(function() {
        var np;
        var src = $(this).children().first().attr("src");
        src[src.length - 5] == 0 ? np = 0 : src[src.length - 5] == 1 ? np = 2 : np = 1;
        $(this).children().first().attr("src", src.substring(0, src.length - 5) + np + ".jpg");
    });

});