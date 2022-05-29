$(document).ready(function () {
  $("body").on("click", "#submit", function () {
    var email = $("#email").val();
    var name = $("#name").val();

    $.ajax({
      url: `https://obscure-tor-64520.herokuapp.com/edit/${name}/${email}`,
      method: "POST",
      success: () => {
        window.location.href = "/timeline";
      },
    });
  });
});
