var secondCard = undefined;
var firstCard = undefined;
var cardHasBeenFlipped = false;

function setup() {
  $(".card").on("click", function () {
    $(this).toggleClass("flip");

    if (!cardHasBeenFlipped) {
      //captured first card
      firstCard = $(this).find(".front_face")[0];
      cardHasBeenFlipped = true;
    } else {
      secondCard = $(this).find(".front_face")[0];
      cardHasBeenFlipped = false;

      // check if you have match
      if (
        $(`#${firstCard.id}`).attr("src") == $(`#${secondCard.id}`).attr("src")
      ) {
        $(`#${firstCard.id}`).parent().off("click");
        $(`#${secondCard.id}`).parent().off("click");
      } else {
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().removeClass("flip");
          $(`#${secondCard.id}`).parent().removeClass("flip");
        }, 1000);
      }
    }
  });
}

$(document).ready(setup);
