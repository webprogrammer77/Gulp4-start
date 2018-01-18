module.exports = asideNav;
function asideNav(){ 
    let menu = document.querySelector('.aside-blog');

   menu.addEventListener('click', function() {
        menu.classList.toggle('active');
        setTimeout(function() {
            document.querySelector('articles').addEventListener('click', function(e) {
                if(e.target == document.querySelector('.aside.active')) {
                    menu.classList.remove('active');
                }
            });
        }, 500);


    });

    
    // menu stiky on scroll 
        window.addEventListener('scroll', function() {
            let navMenu = document.querySelector('.aside-blog');
            let windowScrolTop = window.pageYOffset;
            let windowHeight = window.innerHeight;
            let windowWidth = window.innerWidth;
            let blogWrapTop = document.querySelector('.articles').getBoundingClientRect().top;

            if(windowWidth > 768) {
                if(blogWrapTop < 0) {
                    navMenu.classList.add('active');
                    navMenu.style.top = windowScrolTop - windowHeight - 50;

                }
                else {
                    navMenu.classList.remove('active');
                    navMenu.style.top = 0;
                }
            }
            else {
               navMenu.style.top = 0; 
            }
        });

        // menu tabs change on scroll 
        window.addEventListener('scroll', function() {
            let tabs = document.getElementsByTagName('');

            for (let i = 0; i < tabs.length; i++) {
                let tab = tabs[i];

                scrollToElementPos(tab);
            }
        });

        function scrollToElementPos(elem) {
            let windowHeight = window.innerHeight;
            let elemTop = elem.getBoundingClientRect().top;
            let elemId = elem.getAttribute('id');
            let navElems = document.querySelectorAll('blog-nav__item a');
            
            if (elemTop <= windowHeight) {
                for(let i = 0; i < navElems.length; i++) {
                    if(navElems[i].getAttribute('data-scroll') === elemId) {
                        navElems[i].classList.add('active');
                    } else {
                        navElems[i].classList.remove('active');
                    }
                }
            }
        }
}
