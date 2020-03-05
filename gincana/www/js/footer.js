$( document ).ready(function() {
    
    $("#footer").load("footer.html", function(){
        $("#footer").click(function() {
            if ($(this).css('height')=='91px'){
                $(this).css('height', '400px');
            } else {
                $(this).css('height', '91px');
            }
        });
    }); 

});