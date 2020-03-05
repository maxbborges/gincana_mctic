$( document ).ready(function() {
    
    $("#footer").load("footer.html", function(){
        $("#footer").click(function() {
            if ($(this).css('height')=='70px'){
                $(this).css('height', '294px');
                $(".patrocinadores").css('display','block');
            } else {
                $(this).css('height', '70px');
                $(".patrocinadores").css('display','none');
            }
        });
    }); 

});