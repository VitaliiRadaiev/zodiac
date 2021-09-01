{
    let diagramInfoBlocks = document.querySelectorAll('.diagram-info');
    if (diagramInfoBlocks.length) {
        diagramInfoBlocks.forEach(diagramInfoBlock => {
       

            let slider = diagramInfoBlock.querySelector('.diagram-info-slider');
            let diagram = diagramInfoBlock.querySelector('.diagram');
            let diagramSliderTitleValue = diagramInfoBlock.querySelector('.diagram-value');
            let diagramSliderTitleText = diagramInfoBlock.querySelector('.diagram-text');

            const setSliderTitleValue = (el, index) => {
                el.innerText = diagramData.getItemValue(index);
            }
            const setSliderTitleText = (el, index) => {
                el.innerText = diagramData.getItemText(index);
            }

            let diagramData = initDiagram(diagram);

            if(diagramSliderTitleValue) {
                setSliderTitleValue(diagramSliderTitleValue, 0);
            }
            if(diagramSliderTitleText) {
                setSliderTitleText(diagramSliderTitleText, 0);
            }

            if (slider) {
                let colors = diagramData.getColors();

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

                            if(diagramSliderTitleValue) {
                                setSliderTitleValue(diagramSliderTitleValue, swiper.activeIndex);
                            }

                            if(diagramSliderTitleText) {
                                setSliderTitleText(diagramSliderTitleText, swiper.activeIndex);
                            }
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