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

    $('.collapsible').collapsible();

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
      duration: 1500
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
      var nom = $('input#nom').val();
      var telephone = $('input#phone').val();
      var email = $('input#email').val();
      var message = $('textarea#message').val();
      var validEmail = validateEmail(email);
      if (validateEmail && nom != '' && message != '') {
        Email.send("forward_mail@fasobim.com",
          "contact@fasobim.com",
          "Support message",
          "<b>Nouveau Email de : </b><p/>" + nom +
          "<p/><b>Email expediteur:</b><p/>" + email +
          "<p/><b>Numero de telephone : </b><p/>" + telephone +
          " <p/><b>Contenu du message:</b> <p/>" + message, {
            token: "53bb547a-7d90-4505-ac5e-2af1752339f6"
          });
        viderChamp();
        envoyerMessageReponse(email);
        alert('Message envoyé au support.')
      }

    });

    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    function envoyerMessageReponse(email) {
      Email.send("contact@fasobim.com",
        email,
        "Accusé de reception message",
        "Bonjour cher(e) client(e),<p/>" +
        "<p/>Nous accusons reception de votre message," +
        "<p/>notre service support vous repondra très rapidement." +
        " <p/>Bien cordialement." +
        " <br/><b>L'equipe FasoBIM.</b>", {
          token: "ae43ea7a-f37d-4323-bc9e-8202ea9d90c6"
        });
    }

    function viderChamp() {
      $('input#nom').val('');
      $('input#phone').val('');
      $('input#email').val('');
      $('textarea#message').val('');
    }

  }); // end of document ready
})(jQuery); // end of jQuery name space