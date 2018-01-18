(function ($) {
  $(document).ready(function (e) {
    /*  Настройки Слайдера: */
    var mainConfig = new Array();

    /* Для каждого слайдера (div-а с классом slider-wrap) необходимо создать новый элемент
       массива mainConfig[X], где X - порядковый номер слайдера на странице (по коду,
       начиная с нуля).
       Если элементов массива больше чем слайдеров, скрипт работает исправно, ошибок не возникает.
       По умолчанию уже создано 5 элементов (для 5 слайдеров).
    */

    mainConfig[0] = {
      hwSlideSpeed: 400, // Скорость анимации смены слайда.
      hwTimeOut: 10000, // Задержка автоматической прокрутки.
      hwNeedLinks: true, // true - если нужны ссылки вперёд-назад, false - если не нужны.
      hwNeedBullets: true, // true - если нужны кнопки перехода на каждый слайд, иначе - false
      hwAutoRotate: true // true - автоматическая прокрутка включена, false - выключена.
    }
    mainConfig[1] = {
      hwSlideSpeed: 400,
      hwTimeOut: 10000,
      hwNeedLinks: true,
      hwNeedBullets: false,
      hwAutoRotate: false
    }
    mainConfig[2] = {
      hwSlideSpeed: 400,
      hwTimeOut: 10000,
      hwNeedLinks: true,
      hwNeedBullets: true,
      hwAutoRotate: false
    }
    mainConfig[3] = {
      hwSlideSpeed: 400,
      hwTimeOut: 10000,
      hwNeedLinks: true,
      hwNeedBullets: true,
      hwAutoRotate: false
    }
    mainConfig[4] = {
      hwSlideSpeed: 400,
      hwTimeOut: 10000,
      hwNeedLinks: true,
      hwNeedBullets: true,
      hwAutoRotate: false
    }
    var activeSlide = new Array();
    var slideCount = new Array();
    var timerid = new Array();
    var neddRotatr = new Array();

    /* Для каждого .slider-wrap  */
    $('.slider-box').each(function (index) {
      var mainThis = $(this)
      slideCount[index] = $(".slide", mainThis).index();
      activeSlide[index] = 0;
      $('.slide', mainThis).css({ "position": "absolute", "top": '0', "left": '0' }).hide().eq(0).show();

      /* Добавляем ссылки Назад - Вперёд, если они нужны */
      if (mainConfig[index].hwNeedLinks) {
        var $linkArrow = '<a class="prewbutton" href="#"><</a><a class="nextbutton" href="#">></a>';
        $(".slider", mainThis).prepend($linkArrow);
      }

      /* Добавляем ссылки на слайды (буллеты), если они нужны */
      if (mainConfig[index].hwNeedBullets) {
        var $adderSpan = '';
        $('.slide', mainThis).each(function (num) {
          $adderSpan += '<span class = "control-slide">' + num + '</span>';
        });
        $(mainThis).append('<div class = "sli-links">' + $adderSpan + '</div>');
        $(".control-slide:first", mainThis).addClass("active");
      }

      /* Обработчики ссылок */
      $('.nextbutton', mainThis).click(function () {
        animSlide(index, "next");
        return false;
      })

      $('.prewbutton', mainThis).click(function () {
        animSlide(index, "prew");
        return false;
      })

      $('.control-slide', mainThis).click(function () {
        var goToNum = parseFloat($(this).text());
        animSlide(index, goToNum);
      });

      /* Включаем автоматическую прокрутку, если она нужна, с паузой при наведении курсора на слайдер.
         Используем jQuery плагин timers.
       */
      if (mainConfig[index].hwAutoRotate) {
        mainThis.everyTime(mainConfig[index].hwTimeOut, timerid[index], function () { animSlide(index, 'next'); });
        mainThis.hover(
          function () { mainThis.stopTime(timerid[index]); },
          function () { mainThis.everyTime(mainConfig[index].hwTimeOut, timerid[index], function () { animSlide(index, 'next'); }); }
        );
      }
    });
    /* Для каждого .slider-wrap - конец */

    /* Функция прокрутки */
    function animSlide(id, arrow) {
      var $containerNum = $('.slider-wrap').eq(id).find(".slide");
      var activeVar = activeSlide[id];
      var countVar = slideCount[id];
      /* Запускаем анимацию только если выбран другой слайд (не показывающийся в данный момент). */
      if (activeVar != arrow) {
        $containerNum.eq(activeVar).fadeOut(mainConfig[id].hwSlideSpeed);
        $('.slider-wrap').eq(id).find(".control-slide").eq(activeVar).removeClass("active");
        if (arrow == "next") {
          if (activeVar == (countVar - 1)) { activeVar = 0; }
          else { activeVar++ }
        }
        else if (arrow == "prew") {
          if (activeVar == 0) { activeVar = countVar - 1; }
          else { activeVar -= 1 }
        }
        else {
          activeVar = arrow;
        }
        $containerNum.eq(activeVar).fadeIn(mainConfig[id].hwSlideSpeed);
        activeSlide[id] = activeVar;
        $('.slider-wrap').eq(id).find(".control-slide").eq(activeVar).addClass("active");
      }
    }
    /* Функция прокрутки - Конец */
  });
})(jQuery);