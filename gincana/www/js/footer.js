$( document ).ready(function() {
    
    $("#footer").load("footer.html", function(){
        $("#footer").click(function() {
            if ($(this).css('height') == '70px'){
                $(this).css('height', '294px');
                $(".patrocinadores").show();
            } else {
                $(this).css('height', '70px');
                $(".patrocinadores").hide();
            }

            if($("#img_arrow").hasClass("arrow_up")){
                $("#img_arrow").attr("src","../img/arrow_down.png");
                $("#img_arrow").removeClass("arrow_up");
                $("#img_arrow").addClass("arrow_down");
            } else {
                $("#img_arrow").attr("src","../img/arrow_up.png");
                $("#img_arrow").addClass("arrow_up");
                $("#img_arrow").removeClass("arrow_down");
            }
        });
    }); 

});