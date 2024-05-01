// variables

const toggleBtn = document.querySelector('.header__mobile-toggle-btn')
const menu = document.querySelector('.menu')
const menuItems = document.querySelectorAll('.menu__item')
const sections = document.querySelectorAll('main > section')
const observer = new IntersectionObserver(observerHandler, { threshold: 0.6 })
const feedbacksPhotos = document.querySelectorAll('.feedbacks__photo')
const PhotoObserver = new IntersectionObserver(photoObserverHandler, { threshold: 0.6 })
const feedbackPhotoLeft = document.querySelector('.feedbacks__photo-left')
const feedbackPhotoRight = document.querySelector('.feedbacks__photo-right')
const homeTitleElem = document.querySelector('.home__title')
const cover = document.querySelector('.cover')


// funcsions

const removeClass = (className) => {
    if (document.querySelector('.'+ className))
     {
        document.querySelector('.'+ className).classList.remove(className)
    }
}

const toggleClass = (className, element) => {
    element.classList.toggle(className)
}

const addClass = (className, element) => {
    element.classList.add(className)
}

function observerHandler(section) {
    if (section[0].isIntersecting) {
        let sectionName = section[0].target.className
        let mainMenuElem
        menuItems.forEach(menu => {
            if(menu.dataset.section == sectionName){
                mainMenuElem = menu
            }
        })
        if(mainMenuElem){
            removeClass('menu__item--active')
            addClass('menu__item--active',mainMenuElem)
        }
    }
}

function photoObserverHandler (photo) {
    if (window.innerWidth > 576) {
        console.log(photo);
        if(photo[0].isIntersecting){
            setTimeout(function(){
                addClass('feedbacks__photo-left--open', feedbackPhotoLeft)
                addClass('feedbacks__photo-right--open', feedbackPhotoRight)
            },200)
        }else{
            removeClass('feedbacks__photo-left--open', feedbackPhotoLeft)
            removeClass('feedbacks__photo-right--open', feedbackPhotoRight)
        }
    }
}

const titleWriter = () => {
    let text = 'WE ARE CREATIVE DESIGN AGENCY.'
    let currentIndex = 0
    let stop = 0
    
    let interval = setInterval(() => {
        if (homeTitleElem.innerHTML.includes('CREATIVE') && stop !== 1) {
            stop = 1
            homeTitleElem.innerHTML = 'WE ARE <span>CREATIVE</span>'
        }

        console.log(currentIndex);
        console.log(text[currentIndex]);

        homeTitleElem.innerHTML += text[currentIndex]

        currentIndex += 1;
        if (currentIndex == text.length) {
            clearInterval(interval)
        }

    },100)
}

const toggleMenu = () => {
    toggleClass('mobile-menu--show', menu)
    toggleClass('header__mobile-toggle-btn--open', toggleBtn)
    toggleClass('cover--show',cover)
}


// handle swiper //

const swiper = new Swiper('.portfolio__swiper', {
    loop: true,

    pagination: {
        el: '.swiper-pagination',
    },

    spaceBetween: 0,
    slidesPerView: 1,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        stretch: 0,
        depth: 0,
        rotate: 0,
        modifier: 1,
        scale: 0.8,
        slideShadows: true,
    },

});


// event listeners //

toggleBtn.addEventListener('click', () => {
    toggleMenu()
})

menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', () => {
        removeClass('menu__item--active')
        toggleClass('menu__item--active', menuItem)
        toggleMenu()

        let sectionClass = menuItem.dataset.section

        let sectionElem = document.querySelector('.' + sectionClass)

        scrollTo(0, sectionElem.offsetTop - 150)
    })
})

sections.forEach(section => {
    observer.observe(section)
})

feedbacksPhotos.forEach(photo => {
    PhotoObserver.observe(sections[6])
})

window.addEventListener('load', () => {
    titleWriter()
})

cover.addEventListener('click', () => {
    toggleMenu()
})