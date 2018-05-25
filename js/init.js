(function ($) {
  $(function () {
    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('.carousel').carousel({
      duration: 2,
      numVisible: 7,
      indicators: true,
      dist: 0,
      padding: 5
    });

    autoplay()

    function autoplay() {
      $('.carousel').carousel('next');
      setTimeout(autoplay, 4500);
    }


    $('.smoothscroll').init();
    $('.slider').slider({
      height: 500,
    });

    $(".switch").find("input[type=checkbox]").on("change", function () {
      var status = $(this).prop('checked');
      if (status) {
        window.lang.change('en');
        return false;
      } else {
        window.lang.change('fr');
        return false;
      }
    });

    $("#contactbutton").on("click", function () {
      Email.send("toussaintpahima@gmail.com",
        "testweb@fasobim.com",
        "This is a subject",
        "this is the body", {
          token: "083c3b59-11b8-4f62-8a60-dc3dabebc7f3"
        });
    });




  }); // end of document ready
})(jQuery); // end of jQuery name space