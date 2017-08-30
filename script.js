var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var disable_click = false;

var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;


$('document').ready(initializeGame);

function initializeGame() {
    random_maker();
    $('.card').click(card_clicked);
    $(".reset_button").click( function () {
        games_played++;
        $(".back").show();
        $(".card").show();
        $(".you_win").hide();
        $(".you_win_video").remove();
        random_maker();
        reset_stats();
        $(".card").css("visibility", "visible");
    })
}

function random_maker() {
    for(var random_pictures = []; random_pictures.length <= 18; ) {
        var i = Math.floor(Math.random() * $('.card').length);
        random_pictures.push($('.card').splice(i, 1)[0]);
    }
    $('#game_area').append(random_pictures);
}

function card_clicked() {
    if(disable_click == false) {
        if($(this).find('.back').css("display") == "none") {
            return;
        }
        $(this).find('.back').hide();
        if (first_card_clicked == null) {
            first_card_clicked = $(this);
        }
        else if (first_card_clicked != null) {
            second_card_clicked = $(this);
            attempts++;
            display_stats();
            disable_click = true;
            if (first_card_clicked.find('.front').find('img').attr('src') == second_card_clicked.find('.front').find('img').attr('src')) {
                setTimeout(function () {
                    first_card_clicked.css("visibility", "hidden");
                    second_card_clicked.css("visibility", "hidden");
                    first_card_clicked = null;
                    second_card_clicked = null;
                    disable_click = false;
                }, 500);
                matches++;
                display_stats();
                if (matches == total_possible_matches) {
                    setTimeout(function () {
                    var win_text = $("<h1>", {
                        text: "You're something extraordinary!",
                        class: "you_win"
                    });
                    var win_video = $("<iframe>", {
                        width: "485",
                        height: "273",
                        src: "https://www.youtube.com/embed/Ip1eVBs7hC4",
                        class: "you_win_video"
                    });
                    $("#game_area").prepend(win_text, win_video);
                    $(".card").css("display", "none");
                    }, 1000)
                }
            }
            else {
                setTimeout(function () {
                    first_card_clicked.find('.back').fadeTo("fast", 1);
                    second_card_clicked.find('.back').fadeTo("fast", 1);
                    first_card_clicked = null;
                    second_card_clicked = null;
                    disable_click = false;
                }, 2000);
            }
        }
    }
}

function display_stats() {
    $(".games_played .value").text(games_played);
    $(".attempts .value").text(attempts);
    if(attempts > 0) {
        accuracy = matches / attempts;
    }
    else if (attempts === 0){
        accuracy = 0;
    }
    $(".accuracy .value").text(Math.round(accuracy * 100) + "%");
}

function reset_stats() {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}