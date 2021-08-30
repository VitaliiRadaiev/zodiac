{
    let diagramInfoBlocks = document.querySelectorAll('.diagram-info');
    if (diagramInfoBlocks.length) {
        diagramInfoBlocks.forEach(diagramInfoBlock => {
            let slider = diagramInfoBlock.querySelector('.diagram-info-slider');
            let diagram = diagramInfoBlock.querySelector('.diagram');

            let diagramData = initDiagram(diagram);
            if (slider) {
                let colors = slider.querySelector('.swiper-pagination').dataset.dotsColors.split(',');

                let sliderData = new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    autoHeight: true,
                    speed: 800,
                    pagination: {
                        el: slider.querySelector('.swiper-pagination'),
                        clickable: true,
                        renderBullet: function(index, className) {
                            
                            return `<span class="${className}"style="background-color: ${colors[index]};"></span>`
                        }
                    },
                    on: {
                        activeIndexChange: (swiper) => {
                            diagramData.showItemInfo(swiper.activeIndex);
                        }
                    }
                });

                
                let diagramItems = diagramInfoBlock.querySelectorAll('.diagram > svg');
                if(diagramItems.length) {
                    diagramItems.forEach((item, index) => {
                        item.addEventListener('click', () => {
                            sliderData.slideTo(index);
                        })
                    })
                }
            }
        })
    }
}