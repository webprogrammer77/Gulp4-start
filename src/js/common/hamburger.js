
hamburger();

function hamburger() {
  $(function () {
    var hamburgerLink = $('.hamburger-link');
    var menu = $('.main-nav');
    hamburgerLink.click(function (e) {
      e.preventDefault();
      $(this).toggleClass('active');
      menu.slideToggle(500);
    });
  });
}
module.exports = hamburger;
  // "use strict";

  // var toggles = document.querySelectorAll('.hamburger');

  // for (var i = toggles.length - 1; i >= 0; i--) {
  //   var toggle = toggles;
  //   toggleHandler(toggle);
  // };

  // function toggleHandler(toggle) {
  //   toggle.addEventListener("click", function (e) {
  //     e.preventDefault();
  //     (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");
  //   });
  // }

