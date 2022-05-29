let firstCard, secondCard;
let cardHasBeenFlipped = false;
let outOfTime = false;
let matched = false;
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
  cardOne = cardTwo = "";
  //   $(`#${cardOne.id}`).parent().removeClass("flip");
  //   $(`#${cardTwo.id}`).parent().removeClass("flip");
  var classList = $("#game_grid .card");
  $.each(classList, function (index, item) {
    $(item).parent().removeClass("flip");
    let randomNum = Math.floor(Math.random() * gridSize);
    item.style.order = randomNum;
  });
}

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

function flipCard() {
  // 0/1 card were opened and the card didn't open, will reveal the card-front
  if ($("#game_grid").find(".flip").length < 2 && !matched) {
    if (!cardHasBeenFlipped) {
      $(this).toggleClass("flip");
      firstCard = $(this).find(".front_face")[0];
      cardHasBeenFlipped = true;
    } else {
      $(this).toggleClass("flip");
      secondCard = $(this).find(".front_face")[0];
      cardHasBeenFlipped = false;

      //   check if you have match
      if (
        $(`#${firstCard.id}`).attr("src") == $(`#${secondCard.id}`).attr("src")
      ) {
        console.log("A Match!");
        $(`#${firstCard.id}`).parent().off("click");
        $(`#${secondCard.id}`).parent().off("click");
        matchPair++;
        matched = false;
      } else {
        console.log("not a Match!");
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().removeClass("flip");
          $(`#${secondCard.id}`).parent().removeClass("flip");
        }, 1000);
        matched = false;
      }
    }
  }
}

$(document).ready(function () {
  shuffle(gridSize);

  // Change grid size
  //   $("#level").change("#level", function () {
  //     gridSize = $(this).val();
  //     console.log(gridSize)
  //     shuffle(gridSize);
  //   });

  $(".card").on("click", flipCard);
});
