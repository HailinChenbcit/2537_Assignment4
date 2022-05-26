
$(document).ready(function() {
    $(".promote").change(function(){
        var email = $(this).attr("id").slice(7)
        $.ajax({
            url: `/dashboard/${email}`,
            method: "get", 
            success: () => {
                window.location.href = "/dashboard"
            }
         })
    })
})
