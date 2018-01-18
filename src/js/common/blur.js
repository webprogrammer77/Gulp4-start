

function blur() {
  var blur = (function () {
    var wrapper = document.querySelector('.window-feedback');
    var form = document.querySelector('.blur-bg');
    return {
      set: function () {
        var imgWidth = document.querySelector('.blur-img__pic').offsetWidth, 
        posLeft = -wrapper.offsetLeft, 
        posTop = -wrapper.offsetTop, 
        blurCSS = form.style;
        blurCSS.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
        blurCSS.backgroundPosition = posLeft + 'px' + ' ' + posTop + 'px';
      }
    };
  } ());
  blur.set();
  window.onresize = function () {
    blur.set();
  };
}
blur();
module.exports = blur;