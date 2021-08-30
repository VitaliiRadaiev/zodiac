{
    let header = document.querySelector('.header');
    if (header) {
        let menu = document.querySelector('.header__menu');
        window.addEventListener('scroll', () => {
            header.classList.toggle('is-scroll', window.pageYOffset > 50);
        })

        function burgerBtnAnimation(e) {
            $('.burger span:nth-child(1)').toggleClass('first');
            $('.burger span:nth-child(2)').toggleClass('second');
            $('.burger span:nth-child(3)').toggleClass('third');
            $('.burger span:nth-child(4)').toggleClass('fourth');
            menu.classList.toggle('open');
            header.classList.toggle('menu-open');
            document.body.classList.toggle('lock');
        }
        $('.burger').click((e) => burgerBtnAnimation(e));

        const setMenuHeight = () => {
            if (document.documentElement.clientWidth < 1140) {
                menu.style.height = document.documentElement.clientHeight - header.clientHeight + 'px';
            }
        }

        setMenuHeight();
        let id = setInterval(setMenuHeight, 200);
        setTimeout(() => {
            clearInterval(id);
        }, 1000)
        window.addEventListener('resize', setMenuHeight);
        window.addEventListener('scroll', setMenuHeight);
    }


    let searchTrigger = document.querySelector('.header__search-mobile-trigger');
    let searchWrap = document.querySelector('.header__search');
    if (searchTrigger && searchWrap) {
        searchTrigger.addEventListener('click', () => {
            searchTrigger.classList.toggle('active');
            _slideToggle(searchWrap, 300)
        })
    }

    let menuItems = document.querySelectorAll('.menu-item-has-children');
    if (menuItems.length) {
        menuItems.forEach(menuItem => {
            let link = menuItem.querySelector('.children-item');
            let subMenu = menuItem.querySelector('.sub-menu-wrap');
            if (link) {
                link.addEventListener('click', (e) => {
                    console.log('test');
                    if (document.documentElement.clientWidth < 992) {
                        console.log('test 3');
                        e.preventDefault();
                        link.classList.toggle('is-open');
                        _slideToggle(subMenu);


                        menuItems.forEach(i => {
                            if (i === menuItem) return;

                            let link = i.querySelector('.children-item');
                            let subMenu = i.querySelector('.sub-menu-wrap');
                            if(link) {
                                link.classList.remove('is-open');
                                _slideUp(subMenu);
                            }
                        })
                    }
                })
            }
        })
    }

}