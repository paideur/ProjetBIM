(function ($) {
  $(function () {

    // Get active menu link when scrolling
    var sections = $('section'),
      nav = $('nav'),
      nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
      var cur_pos = $(this).scrollTop();

      sections.each(function () {
        var top = $(this).offset().top - nav_height,
          bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
          nav.find('a').removeClass('active');
          sections.removeClass('active');

          $(this).addClass('active');
          nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
        }
      });
    });

    // Smooth scroll when click on menu nav bar
    $('.js-scrollTo').on('click', function () { // Au clic sur un élément
      var page = $(this).attr('href'); // Page cible
      var speed = 750; // Durée de l'animation (en ms)
      $('html, body').animate({
        scrollTop: $(page).offset().top
      }, speed); // Go
      return false;
    });


    $('a').on('click', function () { // Au clic sur un élément
      var itemLink = $(this).attr('href');
      if (itemLink && itemLink !== '#Lang') {
        $('.nav-wrapper ul a').siblings('a').removeClass('active');
        $('.nav-wrapper ul a[href="' + itemLink + '"] ').addClass('active');
      }

    });

    // Add active class when click on desktop menu
    $('.nav-wrapper ul a').click(function () {
      var itemLink = $(this).attr('href');
      if (itemLink !== '#Lang') {
        $(this).siblings('a').removeClass('active');
        $(this).addClass('active');
      }

    });

    // Add active class when click on mobile menu
    $('#bim-mobile-view li a').click(function () {
      var itemLink = $(this).attr('href');
      if (itemLink !== '#Lang') {
        var test = $('#bim-mobile-view li').siblings('a');
        $('#bim-mobile-view li a').removeClass('active');
        $(this).addClass('active');
      }

    });

    // Manage service events on click
    $('#bim-service-content ul a').click(function () {
      $(this).siblings('a').removeClass('active');
      var itemId = $(this).attr('id');
      $(this).addClass('active');

      $('.bim-tab-pane').siblings('div').removeClass('active');
      $('div [for="' + itemId + '"] ').addClass('active');
    });

    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('.carousel').carousel({
      duration: 2,
      numVisible: 7,
      indicators: true,
      dist: 0,
      padding: 5
    });
    autoplay();

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