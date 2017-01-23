var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var disable_click = false;

var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;


$('document').ready(initializeGame);

function initializeGame() {
    console.log("Are we starting?");
    random_maker();
    console.log("Did it randomize?");
    $('.card').click(card_clicked);
    console.log("Are you ready to play?");
    $(".reset_button").click( function () {
        games_played++;
        console.log("Was reset button clicked?");
        $(".back").show();
        $(".card").show();
        $(".you_win").hide();
        $(".you_win_video").remove();
        random_maker();
        console.log("Did it randomize again?");
        reset_stats();
        $(".card").css("visibility", "visible");
    })
}

function random_maker() {
    for(var random_pictures = []; random_pictures.length <= 18; ) {
        var i = Math.floor(Math.random() * $('.card').length);
        random_pictures.push($('.card').splice(i, 1)[0]);
    }
    console.log("Is array working?", random_pictures);
    $('#game-area').append(random_pictures);
}

function card_clicked() {
    if(disable_click == false) {
        if($(this).find('.back').css("display") == "none") {
            return;
        }
        console.log("Is display showing?", $(this).find('.back').css("display"));
        $(this).find('.back').hide();
        if (first_card_clicked == null) {
            first_card_clicked = $(this);
            console.log("Did first card get clicked?", first_card_clicked);
        }
        else if (first_card_clicked != null) {
            second_card_clicked = $(this);
            attempts++;
            display_stats();
            console.log("Did second card get clicked?", second_card_clicked);
            disable_click = true;
            if (first_card_clicked.find('.front').find('img').attr('src') == second_card_clicked.find('.front').find('img').attr('src')) {
                console.log(first_card_clicked.find('.front').find('img').attr('src'), second_card_clicked.find('.front').find('img').attr('src'));
                //++match_counter;
                setTimeout(function () {
                    first_card_clicked.css("visibility", "hidden");
                    second_card_clicked.css("visibility", "hidden");
                    first_card_clicked = null;
                    second_card_clicked = null;
                    disable_click = false;
                }, 500);
                matches++;
                display_stats();
                console.log("Match Counter:", matches);
                //first_card_clicked = null;
                //second_card_clicked = null;
                //disable_click = false;
                if (matches == total_possible_matches) {
                    var win_text = $("<h1>", {
                        text: "You Won and Saved the Day, just like Garnet, Amethyst, and Pearl...AND STEVEN!",
                        class: "you_win"
                    });
                    var win_video = $("<iframe>", {
                        width: "373",
                        height: "210",
                        src: "https://www.youtube.com/embed/Ip1eVBs7hC4",
                        class: "you_win_video"
                    });
                    $("#game-area").prepend(win_text, win_video);
                    $(".card").css("display", "none");
                }
            }
            else {
                console.log("Does the not matching work?");
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
    $(".games-played .value").text(games_played);
    console.log("Games played:", games_played);
    $(".attempts .value").text(attempts);
    console.log("Attempts:", attempts);
    if(attempts > 0) {
        accuracy = matches / attempts;
    }
    else if (attempts === 0){
        accuracy = 0;
    }
    $(".accuracy .value").text(Math.round(accuracy * 100) + "%");
    console.log("Accuracy:", accuracy);
}

function reset_stats() {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}