function setStickyMenu(el, parent){
    let aside = document.querySelector(el);
    if(aside) {
        let asideWrap = document.querySelector(parent);

        window.addEventListener('scroll', () => {
            if(document.documentElement.clientWidth > 991.98) {
                if(aside.getBoundingClientRect().top < 121) {
                    aside.classList.add('_fixed');
                    aside.style.top = '122px';
                    aside.style.maxWidth = (asideWrap.clientWidth) + 'px';
                }else if(asideWrap.getBoundingClientRect().top >= 121) {
                    aside.classList.remove('_fixed');
                }

                if(asideWrap.getBoundingClientRect().bottom <= aside.clientHeight + 121) {
                    aside.classList.add('_static');
                    asideWrap.classList.add('_flex-end');
                } else {
                    aside.classList.remove('_static');
                    asideWrap.classList.remove('_flex-end');
                }
            }
        })


    }
}

let wrapper = document.querySelector('.single-zodiac-info-v2__col-2');
let sidebar = document.querySelector('.sidebar-list');
if(wrapper && sidebar) {
    setStickyMenu('.sidebar-list', '.single-zodiac-info-v2__col-2');
}
