$('#prev').click(function () {
  event.preventDefault();
  var slide = $('.slider__item');
  var currentSlide = $('.current');
  var currentSlideIndex = currentSlide.index();
  var nextSlideIndex = currentSlideIndex + 1;
  var nextSlide = slide.eq(nextSlideIndex);

  currentSlide.removeClass('current');

  if (nextSlideIndex === (slide.last().index() + 1)) {
    slide.eq(0).addClass('current');
  } else {
    nextSlide.addClass('current');
  }
});

$('#next').click(function () {
  event.preventDefault();
  var slide = $('.slider__item');
  var currentSlide = $('.current');
  var currentSlideIndex = currentSlide.index();
  var prevSlideIndex = currentSlideIndex - 1;
  var prevSlide = slide.eq(prevSlideIndex);

  currentSlide.removeClass('current');
  prevSlide.addClass('current');

});