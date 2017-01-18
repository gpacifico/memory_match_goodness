var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
var disable_click = false;


$('document').ready(initializeGame);

function initializeGame() {
    console.log("Are we starting?");
    $('.card').click(card_clicked);
    console.log("Are you ready to play?");
}

function card_clicked() {
    if(disable_click == false) {

        $(this).find('.back').hide();
        if (first_card_clicked == null) {
            first_card_clicked = $(this);
            console.log("Did first card get clicked?", first_card_clicked);
        }
        else if (first_card_clicked != null) {
            second_card_clicked = $(this);
            console.log("Did second card get clicked?", second_card_clicked);
            disable_click = true;
            if (first_card_clicked.find('.front').find('img').attr('src') == second_card_clicked.find('.front').find('img').attr('src')) {
                console.log(first_card_clicked.find('.front').find('img').attr('src'), second_card_clicked.find('.front').find('img').attr('src'));
                ++match_counter;
                console.log("Match Counter:", match_counter);
                first_card_clicked = null;
                second_card_clicked = null;
                disable_click = false;
                if (match_counter == total_possible_matches) {
                    var win_text = $("<h1>", {
                        text: "You Won and Saved the Day, just like Garnet, Amethyst, and Pearl...AND STEVEN!",
                        class: "you_win"
                    });
                    $("#game-area").prepend(win_text);
                    $(".card").css("display", "none");
                }
            }
            else {
                console.log("Does the not matching work?");
                setTimeout(function () {
                    $('.back').fadeTo("fast", 1);
                    first_card_clicked = null;
                    second_card_clicked = null;
                    disable_click = false;
                }, 2000);
            }
        }
    }
}