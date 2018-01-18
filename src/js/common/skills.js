'use strict'
showSkills();

function showSkills() {
  $(window).scroll(function () {
    var height = $(window).scrollTop();
    /*Если сделали скролл на 100px задаём новый класс для header*/
    if (height > 100) {
      $('.circles').addClass('active');
    }
    else {
      /*Если меньше 100px удаляем класс для header*/
      $('.circles').removeClass('active');
    }
  });
}

module.exports = showSkills;