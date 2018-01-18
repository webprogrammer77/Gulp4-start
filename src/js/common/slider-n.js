module.exports = function() {
    
    var data1 = [
        {
            title: "Barbershop 'Borodinski'",
            image: "../assets/img/slider/work-1.png",
            link: "http://barbershop.zhukstudio.ru/",
            tags: ["js ", "html ", "css "],
            num: "1"
        },
        {
            title: "100 Days CSS Challenge\n(in progress)",
            image: "../assets/img/slider/work-2.png",
            link: "http://100css.zhukstudio.ru/",
            tags: ["css ", "html ", "animation ", "pug"],
            num: "2"
        },
        {
            title: "Дезинфектор N1",
            image: "../assets/img/slider/work-3.png",
            link: "http://desinfector.zhukstudio.ru",
            tags: "one scroll page",
            num: "3"
        },
        {
            title: "Дома и Бани из бревна",
            image: "../assets/img/slider/work-4.png",
            link: "http://stroim.zhukstudio.ru/",
            tags: "landing page",
            num: "4"
        },
        {
            title: "Профессиональные курсы по образованию",
            image: "../assets/img/slider/work-5.png",
            link: "http://procurs.zhukstudio.ru/",
            tags: "landing page",
            num: "5"
        },
        {
            title: "Компания по финансовым услугам 'Офшоры'",
            image: "../assets/img/slider/work-6.jpg",
            link: "http://offshor.zhukstudio.ru/",
            tags: "сайт",
            num: "6"
        }
    ];

    var data2 = [
        {
            iconDown: "../assets/img/sprite/sprite.svg#arrow_down",
            iconBtnPreview: "../assets/img/sprite/sprite.svg#link"
        }
    ];
    
    
    var slider1 = document.querySelector(".slider-1");
        slider(slider1, data1, data2);


    function slider(elem, data, data2) {
        var currentSlide = 0;
        var dataLength = data1.length;

        var slider = elem;
        var mainSlider = createSliderCurrentPreview();
        var navSlider = document.createElement("div");
        var downSlider = createSliderChangeNav('down', 'left', 'arrow--down');
        var upSlider = createSliderChangeNav('up', 'right', 'arrow--up');
        var descrSlider = createSliderMainPreview();

        slider.classList.add("slider");
        navSlider.classList.add("slider__preview-nav");
    
        slider.appendChild(descrSlider);
        slider.appendChild(mainSlider);
        slider.appendChild(navSlider);
        navSlider.appendChild(downSlider);
        navSlider.appendChild(upSlider);
        
        downSlider.addEventListener('click', function(e) {
            e.preventDefault();
            currentSlide = getSlide(currentSlide - 1);
            fillSlider();
        });

        upSlider.addEventListener('click', function(e) {
            e.preventDefault();
            currentSlide = getSlide(currentSlide + 1);
            fillSlider();
        });

        fillSlider();
    
        
    


    function fillSlider() {
        var down = getSlide(currentSlide - 1);
        var up = getSlide(currentSlide + 1);

        // descrSlider.querySelector('.heading__sub').innerText = data1[currentSlide].title;
        animate(descrSlider.querySelector('.heading__sub'), data1[currentSlide].title);
        animateFall(descrSlider.querySelector('.main-preview__desc'), data1[currentSlide].tags);
        descrSlider.querySelector('.btn--preview').setAttribute('href', data1[currentSlide].link);
        descrSlider.querySelector('.main-preview-btn').classList.add('btn-animate');
        mainSlider.querySelector('.slider__number').innerText = data1[currentSlide].num;
        upSlider.querySelector('.slider__number').innerText = data1[up].num;
        downSlider.querySelector('.slider__number').innerText = data1[down].num;
        mainSlider.querySelector('.slider__image-preview').style.backgroundImage = 'url(' + data1[currentSlide].image + ')';
        upSlider.querySelector('.slider__image-preview').style.backgroundImage = 'url(' + data1[up].image + ')';
        downSlider.querySelector('.slider__image-preview').style.backgroundImage = 'url(' + data1[down].image + ')';
    }

    function animate(elemForString, string) {
        timer = 50;
        strLength = string.length;
        elemForString.innerHTML = '';

        for (let i = 0; i < strLength; i++) {
            let span = document.createElement('span');
            span.innerText = string[i];
            
            setTimeout(function() {
                elemForString.appendChild(span);
            }, timer);
            console.log(timer);
            timer += 50;
        }
    }
    function animateFall(elemForString, string) {
        timer = 50;
        strLength = string.length;
        elemForString.innerHTML = '';

        for (let i = 0; i < strLength; i++) {
            let span = document.createElement('span');
            span.innerText = string[i];
            
            setTimeout(function() {
                span.classList.add('animate');
                
            }, timer);
            elemForString.appendChild(span);
            timer += 80;
        }
    }


    function getSlide(value) {
        if(value >= dataLength) {
            return 0;
        }
        else if(value < 0) {
            return dataLength - 1;
        }
        else {
            return value;
        }
    }
    }


    // Создает элементы навигации, блоки arrowUp, arrowDown
    function createSliderChangeNav(className, classOverlay, classDownOrUp) {
        var navContainer = document.createElement('div');
        var navImage = document.createElement('div');
        var overlay = document.createElement('div');
        var navLink = document.createElement('a');
        var span = document.createElement('span');

        navContainer.classList.add('slider__preview-' + className);
        navImage.classList.add('slider__image-preview');
        overlay.classList.add('overlay__preview');
        overlay.classList.add('overlay__preview--' + classOverlay);
        navLink.classList.add('arrow__link');
        navLink.classList.add(classDownOrUp);
        span.classList.add('slider__number');

        navLink.setAttribute('href', '#');
        navLink.innerHTML = '<svg viewbox="0 0 100 100"><use xlink:href="../assets/img/sprite/sprite.svg#arrow_down"></use></svg>';

        navContainer.appendChild(overlay);
        navContainer.appendChild(navImage);
        navLink.appendChild(span);
        overlay.appendChild(navLink);

        return navContainer;
       }
    


    // Создает элементы блока mainPreview
    function createSliderMainPreview() {
        var mainPreview = document.createElement('div');
        var previewContent = document.createElement('div');
        var previewHeadingWrap = document.createElement('div');
        var previewHeading = document.createElement('h2');
        var previevDesc = document.createElement('div');
        var previewBtn = document.createElement('div');
        var previewBtnLink = document.createElement('a');

        mainPreview.classList.add('slider__main-preview');
        previewContent.classList.add('main-preview__content');
        previewHeadingWrap.classList.add('heading__sub-wrap');
        previewHeading.classList.add('heading__sub');
        previevDesc.classList.add('main-preview__desc');
        previewBtn.classList.add('main-preview-btn');
        previewBtnLink.classList.add('btn', 'btn--preview');
        previewBtnLink.innerHTML = '<svg class="icon"><use xlink:href="../assets/img/sprite/sprite.svg#link"></use></svg><span>Посмотреть сайт</span>'

        previewBtnLink.setAttribute('href', '#');
        previewBtnLink.setAttribute('target', '_blank');

        mainPreview.appendChild(previewContent);
        previewContent.appendChild(previewHeadingWrap);
        previewContent.appendChild(previevDesc);
        previewContent.appendChild(previewBtn);
        previewHeadingWrap.appendChild(previewHeading);
        previewBtn.appendChild(previewBtnLink);
        
        return mainPreview;
       }


       function createSliderCurrentPreview() {
        var currentPreview = document.createElement('div');
        var imagePreview = document.createElement('div');
        var span = document.createElement('span');

        currentPreview.classList.add('slider__small-preview');
        imagePreview.classList.add('slider__image-preview');
        span.classList.add('slider__number', 'number--big');

        currentPreview.appendChild(span);
        currentPreview.appendChild(imagePreview);

        return currentPreview;
       }
}