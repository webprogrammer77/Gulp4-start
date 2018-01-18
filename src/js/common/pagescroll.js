// 'use strict'


  pagescroll();



function pagescroll() {
  $('.scroll').click(function () {
    
    var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
    var scroll_top = $(document).scrollTop();
    
    if ($(scroll_el).length != 0) {
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500); // анимируем скроолинг к элементу scroll_el
      
      var location = window.location.href;
      var cur_url = '/' + location.split('/').pop();

      $('.scroll').each(function () {
        var scroll_el = $(this).attr('href');

        if (cur_url == scroll_el) {
          $(this).addClass('active');
        }
      });
    }
    return false;
  });

}
// var menu_selector = ".nav"; // Переменная должна содержать название класса или идентификатора, обертки нашего меню. 
// function onScroll() {
//   var scroll_top = $(document).scrollTop();
//   $(menu_selector + " a").each(function () {
//     var hash = $(this).attr("href");
//     var target = $(this).attr("href");
//     if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
//       $(menu_selector + " a.active").removeClass("active");
//       $(this).addClass("active");
//     } else {
//       $(this).removeClass("active");
//     }
//   });
// }
// $(document).ready(function () {
//   $(document).on("scroll", onScroll);
//   $(".nav  a").click(function (e) {
//     e.preventDefault();
//     $(document).off("scroll");
//     $(menu_selector + " a.active").removeClass("active");
//     $(this).addClass("active");
//     var hash = $(this).attr("href");
//     var target = $(hash);
//     $("html, body").animate({
//       scrollTop: target.offset().top
//     }, 500, function () {
//       window.location.hash = hash;
//       $(document).on("scroll", onScroll);
//     });
//   });
// });




//   $(document).on("scroll", onScroll);
//     let link = $('a[attr~="scroll"]');
//     let $this = $(this);
//     link.on('click', function (e) {
//     e.preventDefault();
//     $(document).off("scroll");

//     link.each(function () {
//       $this.removeClass('active');
//     })
//       $this.addClass('active');

//     var target = this.hash;
//     $target = $(target);
//     $('html, body').stop().animate({
//       'scrollTop': $target.offset().top + 2
//     }, 500, 'swing', function () {
//       window.location.hash = target;
//       $(document).on("scroll", onScroll);
//     });
//   });


// function onScroll(event) {
//   var scrollPosition = $(document).scrollTop();
//   link.each(function () {
//     var currentLink = $(this);
//     var refElement = $(currentLink.attr("data-scroll"));
//     if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
//       link.removeClass("active");
//       currentLink.addClass("active");
//     }
//     else {
//       currentLink.removeClass("active");
//     }
//   });
// }




// pagescroll();

/*
// function pagescroll() {
//   var pageScroll = $('a');
//   pageScroll.changeActiveNav();
// }
*/
/*



module.exports = pagescroll;
*/
// module.exports = pagescroll;
