var slideWidth = 750;
var sliderTimer;
var num = $('.slide').length;


function sliderInit() {
  $(function () {
    var sliderWidth = num * slideWidth;
    sliderTimer = setInterval(nextSlide, 1000);
    $('.slideer-box').hover(function () {
      clearInterval(sliderTimer);
    }, function () {
      sliderTimer = setInterval(nextSlide, 1000);
    });
    $('#next').click(function () {
      clearInterval(sliderTimer);
      nextSlide();
      sliderTimer = setInterval(nextSlide, 1000);
    });
    $('#prev').click(function () {
      clearInterval(sliderTimer);
      prevSlide();
      sliderTimer = setInterval(nextSlide, 1000);
    });
  });
}

function nextSlide() {
  var num = $('.slide').length;
  var currentSlide = parseInt($('#slides').data('current'));
  currentSlide++;
  if (currentSlide >= num) {
    currentSlide = 0;
  }
  $('#slides').animate({ left: -currentSlide * slideWidth }, 300).data('current', currentSlide);
}

function prevSlide() {
  var num = $('.slide').length;
  var currentSlide = parseInt($('#slides').data('current'));
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = num - 1;
  }
  $('#slides').animate({ left: -currentSlide * slideWidth }, 300).data('current', currentSlide);
}
sliderInit();