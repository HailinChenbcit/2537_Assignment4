let firstCard, secondCard;
let cardHasBeenFlipped = false;
let lockBoard = false;
let matchPair = 0;
let gridSize = 6;

// async function getCards() {
//   var poke_ids = [];
//   var result = "";
//   for (i = 0; i < 2; i++) {
//     result += "<div class='card'>";
//     var poke_id = Math.floor(Math.random() * 600 + 1);
//     await $.ajax({
//       url: `https://pokeapi.co/api/v2/pokemon/${poke_id}`,
//       type: "GET",
//       success: function process(data) {
//         result += `<div class="image_container">
//                           <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke_id}.png">
//                           </img>
//                           `;
//       },
//     });
//     result += "</div>";
//   }
//   $("main").html(result);
// }

// Randomize cards positions
function shuffle(gridSize) {
  matchPair = 0;
  var classList = $("#game_grid .card");
  $.each(classList, function (index, item) {
    $(item).parent().removeClass("flip");
    let randomNum = Math.floor(Math.random() * gridSize);
    item.style.order = randomNum;
  });
}

function flipCard() {
  if (lockBoard) return;
  // prevent same card click twic
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
  if (matchPair == gridSize) {
    console.log("Win!");
  }
}

function reset() {
  lockBoard = false;
  cardHasBeenFlipped = false;
  firstCard = null;
  secondCard = null;
}

$(document).ready(function () {
  shuffle(gridSize);

  // Change grid size
  //   $("#level").change("#level", function () {
  //     gridSize = $(this).val();
  //     console.log(gridSize)
  //     shuffle(gridSize);
  //   });

  $(".card").not(".matched").on("click", flipCard);
});
