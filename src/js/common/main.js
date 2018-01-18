$(function() {

  // yandex map-------------

  ymaps.ready(init);
  var myMap;
  var markerSize; 
  function init(){     
    myMap = new ymaps.Map("map", {
      center: [55.76, 37.64],
      center: [67.45492043, 153.71053497],
      center: [59.91817154482064,30.30557799999997],
      zoom: 11,
      controls: [],
    });

    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('drag');


    var coords = [
    [59.97414671499305,30.312444455078083],
    [59.890752210348296,30.314847714355434], 
    [59.94677378775738,30.38213897412105], 
    [59.91662011350749,30.494062191894486]
    ],
    myCollection = new ymaps.GeoObjectCollection({}, {
      iconLayout: 'default#image',
      iconImageHref: './img/icons/map-marker.svg',
      iconImageSize: [46, 57],
      iconImageOffset: [-26, -52],
      draggable: false 
    });

    for (var i = 0; i < coords.length; i++) {
      myCollection.add(new ymaps.Placemark(coords[i]));
    }



    myMap.geoObjects.add(myCollection);
  }       
  // finish yandex map-----------

  //===composition===
  var compositon = $(".compositon");
  compositon.click(function(e) {
   e.preventDefault();
   compositon.toggleClass("active");    
 });

  var compositionCloseLink = $(".composition-desc__close-link");
  compositionCloseLink.click(function(e) {
   e.preventDefault(e);
   compositon.removeClass("active");    
 });
  //===composition finish===

  //===accordeon-menu===


  var menuAcco = $(".menu-acco__item");

  menuAcco.click(function(e) {
    e.preventDefault();

    var $this = $(e.currentTarget),
        container = $this.closest('.menu-acco'),
        item = $this,
        items = $('.menu-acco__item', container),
        content = $('.menu-acco__content', item),
        activeContent = $('.menu-acco__content', '.active'),
        textBlock = $('.menu-acco__content-text', item),
        closeLink = '<a href="" class="menu-acco__close-link "><img src="img/icons/close.svg" alt="logo"></a> ',
        accoClose = $(".menu-acco__close-link");
    
    if(!$this.hasClass('active')){
      items.removeClass('active');
      $this.addClass('active');
      activeContent.animate({width: '0', opacity: '0'},100);
      if($(window).width() < 479){
      // for phones screens  
      content.delay(100).animate({width: '75%', opacity: '1'},200);

      container.prepend(closeLink);     

    }else  if($(window).width() < 767) {
      //  for tablets screens
      content.delay(100).animate({width:'75%', opacity: '1'},300);  

    } else  {
      // for desktop screens
      content.delay(100).animate({width:'53vw', opacity: '1'},400);  

    }
  }else{

    $this.removeClass('active').find(content).animate({width:'0', opacity: '0'},300);
    container.find(accoClose).remove();  

  }
  e.stopPropagation();
});

  var menuSection = $("#menu");
  
  menuSection.click(function(e) {

    e.preventDefault();
    var $this = $(e.currentTarget),
        menuList = menuSection.find('.menu-acco')
        accoClose = menuList.find('.menu-acco__close-link')
        menuAcco = menuList.find('.menu-acco__item'),
        menuAccoActive = menuAcco.filter('.active'),
        activeContent = menuAccoActive.find('.menu-acco__content');

    if( $(e.target).closest(menuAcco).length ) 
      return;
    if(menuAcco.hasClass('active')){
      activeContent.animate({width:'0', opacity: '0'},100);
      menuAccoActive.removeClass('active')
       menuList.find(accoClose).remove();
   
    e.stopPropagation();
  }
  });

        // var accoClose = $(".menu-acco__close-link");

   $(".menu-acco__close-link").on('click', function(e) {
        e.preventDefault();
    var $this = $(e.currentTarget);
    $this.remove();
      });
    
   
    //===accordeon-menu finish===

    //===accordeon-team===

  var teamAcco = $(".team-acco__item");

  teamAcco.click(function(e) {
   e.preventDefault();
   teamAcco.not(this).removeClass("active");
   $(this).toggleClass("active");
 });
  //===accordeon-team finish===

  //===pageScroll=== 

  var pageScroll = $(".fixed-menu");
  pageScroll.changeActiveNav();

  //===menuMobil===

  let hamburgerMenu = $(".hamburger-menu");
  let body = $('body');
  var hamburgerMenuLink = $(".hamburger-menu-link");
  hamburgerMenuLink.click(function(e) {
    var hamburgerLogo = $(".hamburger-menu__logo");
    e.preventDefault();     
    hamburgerMenu.slideToggle(300); 
    hamburgerLogo.show(500);
    body.toggleClass('no-scroll');
  });

  var hamburgerMenuClose = $(".hamburger-menu__close-link");
  hamburgerMenuClose.click(function(e) {      
   e.preventDefault();
   hamburgerMenu.slideToggle(300);       
   hamburgerMenu.hide(300);
   body.toggleClass('no-scroll');
 });

  var hamburgerMenuItem = $(".hamburger-menu__item");
  hamburgerMenuItem.click(function(e) {      
   e.preventDefault();
   hamburgerMenu.slideToggle(300);       
   hamburgerMenu.hide(300);
   body.toggleClass('no-scroll');
 });
  //===menuMobil finish===

  // ===reviews====
  var reviewButton = $('.review__button-wrap')// блок-обертка кнопки review__view
  reviewButton.click(function(e) {      
   e.preventDefault();
   var textReview = $(this).prev('.review__shorttext').text();
   var titleReview = $(this).siblings('.review__title').text();
   var textFullReview = $('.full-review__content');// текст всплывашки
   var titleFullReview = $('.full-review__title');// текст отзыва который надо поместить в $('.full-review__content');
   textFullReview.text(textReview);
   titleFullReview.text(titleReview);
   $('.full-review').fadeIn(300);
   // body.toggleClass('no-scroll');
   OffScroll ();
 });
  $('.full-review__close').click(function() {
   event.preventDefault();
   $('.full-review').fadeOut(300);
   // body.toggleClass('no-scroll');
   $(window).unbind('scroll');	  
 });
  

  // ===popup===
  var popupClose = $('.status-popup__close');
  popupClose.click(function(e) {
   e.preventDefault();	   
   $('.popup').fadeOut(300);	
 });
  // ===reviews finish====

//////////////// SLIDER //////////////

  $('.backward').click(function(){
    event.preventDefault();
    var slide = $('.slider__item');
    var currentSlide = $('.current');
    var currentSlideIndex = currentSlide.index();
    var nextSlideIndex = currentSlideIndex + 1;
    var nextSlide = slide.eq(nextSlideIndex);

    currentSlide.removeClass('current');

    if(nextSlideIndex === (slide.last().index() + 1)){
       slide.eq(0).addClass('current');
    }else{
      nextSlide.addClass('current');
    }
  });

  $('.forward').click(function(){
    event.preventDefault();
    var slide = $('.slider__item');
    var currentSlide = $('.current');
    var currentSlideIndex = currentSlide.index();
    var prevSlideIndex = currentSlideIndex -1;
    var prevSlide = slide.eq(prevSlideIndex);
    
    currentSlide.removeClass('current');   
    prevSlide.addClass('current');
    
  });

/////////FINISH SLIDER/////////////

//  Функция отмены прокрутки
function OffScroll () {
var winScrollTop = $(window).scrollTop();
$(window).bind('scroll',function () {
  $(window).scrollTop(winScrollTop);
});}
 
//OffScroll ();  Запустили отмену прокрутки
 
//$(window).unbind('scroll'); //Выключить отмену прокрутки


// ============finish scripts================
});

