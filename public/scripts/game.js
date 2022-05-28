let cardOne, cardTwo;
let cardHasBeenFlipped = false;
let outOfTime = false;
let disableDeck = false;
let matchPair = 0;
let gridSize = 6;

function shuffle(gridSize) {
  matchPair = 0;
  cardOne = cardTwo = "";
  $(`#${cardOne.id}`).parent().removeClass("flip");
  $(`#${cardTwo.id}`).parent().removeClass("flip");
  var classList = $("#game_grid .card");
  $.each(classList, function (index, item) {
    let randomNum = Math.floor(Math.random() * gridSize);
    item.style.order = randomNum;
  });
}

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

function matchCards(cardOne, cardTwo) {
  if ($(`#${cardOne.id}`).attr("src") === $(`#${cardTwo.id}`).attr("src")) {
    matchPair++;
    if (matchPair == gridSize) {
      window.alert("You win!");
      setTimeout(() => {
        shuffle(gridSize);
      }, 1000);
    }
    $(`#${cardOne.id}`).parent().off("click");
    $(`#${cardTwo.id}`).parent().off("click");
    return (disableDeck = false);
  } else {
    setTimeout(() => {
      cardOne = cardTwo = "";
      disableDeck = false;
    }, 1000);
  }
}

function setup() {
  shuffle(gridSize);
  $("#level").change("#level", function () {
    gridSize = $(this).val();
    shuffle(gridSize);
  });

  $(".card").on("click", function () {
    let clickedCard = $(this);
    console.log(clickedCard);
    if (clickedCard !== cardOne && !disableDeck && !outOfTime) {
      clickedCard.toggleClass("flip");

      if (!cardOne) {
        return (cardOne = clickedCard);
      }
      cardTwo = clickedCard;

      disableDeck = true;

      matchCards(cardOne, cardTwo);
    } else {
      if (!outOfTime && !disableDeck) {
        if (!cardHasBeenFlipped) {
          firstCard = $(this).find(".front_face")[0];
          cardHasBeenFlipped = true;
        } else {
          secondCard = $(this).find(".front_face")[0];
          cardHasBeenFlipped = false;
        }
      }
    }
  });
}

$(document).ready(setup);
