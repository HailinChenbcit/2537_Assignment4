let firstCard, secondCard;
let cardHasBeenFlipped = false;
let lockBoard = false;
let matchPair = 0;
let gridSize = 6;

// Randomize cards positions
function shuffle(gridSize) {
  matchPair = 0;
  if (gridSize == 6) {
    $("#game_grid6").css("display", "");
    $("#game_grid12").css("display", "none");
    var classList = $("#game_grid6 .card");
    $.each(classList, function (index, item) {
      $(item).parent().removeClass("flip");
      let randomNum = Math.floor(Math.random() * gridSize);
      item.style.order = randomNum;
    });
  } else {
    $("#game_grid6").css("display", "none");
    $("#game_grid12").css("display", "");
    var classList = $("#game_grid12 .card");
    $.each(classList, function (index, item) {
      $(item).parent().removeClass("flip");
      let randomNum = Math.floor(Math.random() * gridSize);
      item.style.order = randomNum;
    });
  }
}

function flipCard() {
  if (lockBoard) return;
  // prevent same card click twice
  if ($(this).find(".front_face")[0] === firstCard) return;

  $(this).toggleClass("flip");
  if (!cardHasBeenFlipped) {
    firstCard = $(this).find(".front_face")[0];
    cardHasBeenFlipped = true;
  } else {
    secondCard = $(this).find(".front_face")[0];
    cardHasBeenFlipped = false;
    checkMatch(firstCard, secondCard);
  }
}

function checkMatch(firstCard, secondCard) {
  // check if you have match
  if ($(`#${firstCard.id}`).attr("src") == $(`#${secondCard.id}`).attr("src")) {
    // add matched to the card div, disable cards
    $(`#${firstCard.id}`).parent().addClass("matched");
    $(`#${secondCard.id}`).parent().addClass("matched");
    $(`#${firstCard.id}`).parent().off("click");
    $(`#${secondCard.id}`).parent().off("click");
    matchPair++;
    if (matchPair == gridSize / 2) {
      window.alert("You win!");
    }
    reset();
  } else {
    lockBoard = true;
    // unflip cards
    setTimeout(() => {
      $(`#${firstCard.id}`).parent().removeClass("flip");
      $(`#${secondCard.id}`).parent().removeClass("flip");
      lockBoard = false;
    }, 1000);
  }
}

// reset the board info
function reset() {
  lockBoard = false;
  cardHasBeenFlipped = false;
  firstCard = null;
  secondCard = null;
}

$(document).ready(function () {
  shuffle(gridSize);

  // Change grid size
  $("#level").change("#level", function () {
    gridSize = $(this).val();
    console.log(gridSize)
    shuffle(gridSize);
  });

  $(".card").on("click", flipCard);
});
