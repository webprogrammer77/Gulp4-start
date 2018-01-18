  function parallaxScroll(){
var parallax = (function(){
  var bg = document.querySelector('.hero')
var user = document.querySelector('.user')
var titleImg  = document.querySelector('.hero__title')

return {
  move: function (block, windowScroll, strafeAmount){
    var strafe = windowScroll/ -strafeAmount +'%';
    var transformString = 'translate3d(0,' + strafe +', 0)';
    var style = block.style;

    style.transform = transformString;
    style.webkitTransform = transformString;

    style.top = strafe;
  },
  init: function (wScroll){
    this.move(bg, wScroll, 45);
    this.move(user, wScroll, 20);
    this.move(titleImg, wScroll, 7);
  }
}



}());

window.onscroll = function(){
  var wScroll = window.pageYOffset;

  parallax.init(wScroll);
// console.log(wScroll);

}
}
parallaxScroll();
module.exports = parallaxScroll;
