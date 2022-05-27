let secondCard = undefined;
let firstCard = undefined;
let cardHasBeenFlipped = false;
let lockboard = false;

function setTime() {
  setTimeout(() => {
    // if all cards flipped win
    // else lose
  }, 20000);
}

function shuffle(gridSize) {
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

function setup() {
  gridSize = 4;
  $("#level").change("#level", function () {
    var gridSize = $(this).val();
    console.log(gridSize)
    shuffle(gridSize);
  });

  $(".card").on("click", function () {
    $(this).toggleClass("flip");
    if (!cardHasBeenFlipped) {
      firstCard = $(this).find(".front_face")[0];
      cardHasBeenFlipped = true;
    } else {
      secondCard = $(this).find(".front_face")[0];
      cardHasBeenFlipped = false;

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
