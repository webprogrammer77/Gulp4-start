function asideAcco() {
  let aside = $('aside.aside-blog');
  let triger = $('.aside-blog:after');
  let link = $('.blog-nav__link')

  aside.click(function () {
    $(this).toggleClass('active')
        
    
  });
  if ($(window).width() < 767) {
    link.click(function (e) {
      e.preventDefault();
      aside.toggleClass('active');
    });
  }
}
asideAcco();
module.exports = asideAcco;