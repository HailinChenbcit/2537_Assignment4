
$(document).ready(function() {
    $("#promote").change(function(){
        if($(this).checked) {
            $(this).attr("id")
            console.log($(this).attr("id"))
            console.log("Is admin")
        } else{
            console.log("Removed admin")
        }
    })
})