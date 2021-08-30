
        function initDiagram(diagram) {
            svgDiagrams = {
                "1": '<svg class="level-1" width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27 12.1802C27 4.90097 20.9766 -1.18524 14.0074 0.916454C12.5764 1.34799 11.1652 1.85135 9.77924 2.42542C8.3933 2.9995 7.03951 3.64144 5.7225 4.34816C-0.691594 7.79002 -0.647187 16.3528 4.5 21.5V21.5C12.8031 29.8031 27 23.9225 27 12.1802V12.1802Z"fill="#2F80ED" /></svg>',
                "2": '<svg class="level-2" width="56" height="61" viewBox="0 0 56 61" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M56 19C56 7.9543 46.9382 -1.22134 36.1641 1.21312C31.1843 2.33832 26.2976 3.88785 21.5585 5.85084C16.8194 7.81383 12.2683 10.1736 7.9514 12.8992C-1.38844 18.7962 -1.30796 31.692 6.50252 39.5025L21.8579 54.8579C34.4572 67.4572 56 58.5338 56 40.7157L56 19Z"fill="#2F80ED" /></svg>',
                "3": '<svg class="level-3" width="88" height="106" viewBox="0 0 88 106" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M88 19C88 7.9543 78.9976 -1.15165 68.0729 0.47879C57.1998 2.10154 46.5406 5.0501 36.3377 9.27626C26.1349 13.5024 16.5128 18.9547 7.6768 25.4957C-1.20103 32.0677 -1.12777 44.8722 6.68271 52.6827L53.8579 99.8579C66.4572 112.457 88 103.534 88 85.7157L88 19Z" fill="#2F80ED"/></svg>',
                "4": '<svg class="level-4" width="119" height="152" viewBox="0 0 119 152" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M119 20C119 8.9543 110.019 -0.114818 99.041 1.10997C82.2551 2.98281 65.7826 7.21276 50.117 13.7017C34.4513 20.1906 19.8125 28.8474 6.6188 39.3925C-2.00958 46.2888 -1.94758 59.0524 5.86291 66.8629L84.8579 145.858C97.4572 158.457 119 149.534 119 131.716L119 20Z"fill="#ED9CEF" /></svg>',
                "5": '<svg class="level-5" width="151" height="197" viewBox="0 0 151 197" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M151 20C151 8.9543 142.028 -0.092252 131.026 0.888307C108.325 2.91152 86.0237 8.37581 64.8962 17.1271C43.7687 25.8784 24.1354 37.7841 6.65276 52.4054C-1.82025 59.4917 -1.76739 72.2326 6.0431 80.0431L116.858 190.858C129.457 203.457 151 194.534 151 176.716L151 20Z" fill="#B592FF"/></svg>',
                "6": '<svg class="level-6" width="183" height="242" viewBox="0 0 183 242" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M183 20C183 8.95431 174.034 -0.0770592 163.018 0.740395C134.402 2.86397 106.264 9.53909 79.6755 20.5525C53.0867 31.566 28.4699 46.7427 6.734 65.4754C-1.63309 72.6865 -1.58719 85.4128 6.22329 93.2233L148.858 235.858C161.457 248.457 183 239.534 183 221.716L183 20Z" fill="#6FCF97"/></svg>',
                "7": '<svg class="level-7" width="216" height="287" viewBox="0 0 216 287" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M215 20C215 8.9543 206.037 -0.066141 195.013 0.634703C160.484 2.83001 126.504 10.7025 94.4547 23.978C62.4051 37.2534 32.8114 55.7136 6.84295 78.5774C-1.44737 85.8766 -1.407 98.593 6.40349 106.404L180.858 280.858C193.457 293.457 215 284.534 215 266.716L215 20Z" fill="#7297FF" /></svg>',
                "8": '<svg class="level-8" width="248" height="332" viewBox="0 0 248 332" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M247 20C247 8.95431 238.039 -0.0579224 227.01 0.555413C186.567 2.80455 146.744 11.8661 109.234 27.4034C71.7237 42.9406 37.1571 64.6922 6.9694 91.6992C-1.26273 99.0639 -1.22681 111.773 6.58368 119.584L212.858 325.858C225.457 338.457 247 329.534 247 311.716L247 20Z"fill="#FF856A" /></svg>',
                "9": '<svg class="level-9" width="280" height="377" viewBox="0 0 280 377" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M279 20C279 8.95429 270.04 -0.0515232 259.008 0.493714C212.653 2.7847 166.984 13.0297 124.013 30.8288C81.0425 48.6279 41.5056 73.6761 7.10733 104.834C-1.07917 112.25 -1.04662 124.953 6.76387 132.764L244.858 370.858C257.457 383.457 279 374.534 279 356.716L279 20Z" fill="#60C6FF" /></svg>',
                "10": '<svg class="level-10" width="310" height="422" viewBox="0 0 310 422" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M309.996 20C309.996 8.9543 301.037 -0.0463853 290.002 0.444371C237.735 2.76889 186.219 14.1935 137.789 34.2542C89.3576 54.315 44.8524 82.6634 6.25003 117.978C-1.89976 125.434 -1.87033 138.134 5.94016 145.944L275.854 415.858C288.453 428.457 309.996 419.534 309.996 401.716L309.996 20Z" fill="#FFCF65" /></svg>',
            }

            const setHeight = (diagram) => {
                diagram.style.height = diagram.clientWidth + 'px';
            }
            const getArrayFromValues = (string) => {
                return string.split(',');
            }
            const setItems = (values, wrapper, svgDiagrams) => {
                values.forEach(value => {
                    wrapper.insertAdjacentHTML('beforeend', svgDiagrams[value])
                })
            }
            const createTooltip = (wrapper) => {
                let tooltip = document.createElement('div');
                let colorbox = document.createElement('div');
                let text = document.createElement('div');
    
                tooltip.className = 'diagram__tooltip';
                colorbox.className = 'diagram__tooltip-color';
                text.className = 'diagram__tooltip-text';
    
                tooltip.append(colorbox);
                tooltip.append(text);
    
                return tooltip;
            }
            const setPositionTooltip = (tooltip, x, y) => {
                tooltip.style.opacity = 1;
                tooltip.style.left = x + '%';
                tooltip.style.top = y + '%';
            }
            const createTooltipPositionValues = (items, wrapper) => {
                let values = {};
                const setValues = () => {
                    items.forEach((item, index) => {
                        if (item.tagName === 'svg') {
                            let path = item.children[0];
                            let x;
                            let y;
                            switch (index) {
                                case 0:
    
                                    x = (path.getBoundingClientRect().left - wrapper.getBoundingClientRect().left) + (path.getBoundingClientRect().width / 1.75);
                                    y = (path.getBoundingClientRect().top - wrapper.getBoundingClientRect().top) + (path.getBoundingClientRect().height / 3);
    
                                    values[index] = { x, y };
                                    break;
                                case 1:
    
                                    x = (path.getBoundingClientRect().left - wrapper.getBoundingClientRect().left) + (path.getBoundingClientRect().width / 1.65);
                                    y = (path.getBoundingClientRect().top - wrapper.getBoundingClientRect().top) + (path.getBoundingClientRect().height / 2.5);
    
                                    values[index] = { x, y };
                                    break;
                                case 2:
    
                                    x = (path.getBoundingClientRect().left - wrapper.getBoundingClientRect().left) + (path.getBoundingClientRect().width / 1.5);
                                    y = (path.getBoundingClientRect().top - wrapper.getBoundingClientRect().top) + (path.getBoundingClientRect().height / 2);
    
                                    values[index] = { x, y };
                                    break;
                                case 3:
    
                                    x = (path.getBoundingClientRect().left - wrapper.getBoundingClientRect().left) + (path.getBoundingClientRect().width / 1.75);
                                    y = (path.getBoundingClientRect().top - wrapper.getBoundingClientRect().top) + (path.getBoundingClientRect().height / 1.65);
    
                                    values[index] = { x, y };
                                    break;
                                case 4:
    
                                    x = (path.getBoundingClientRect().left - wrapper.getBoundingClientRect().left) + (path.getBoundingClientRect().width / 2.75);
                                    y = (path.getBoundingClientRect().top - wrapper.getBoundingClientRect().top) + (path.getBoundingClientRect().height / 1.75);
    
                                    values[index] = { x, y };
                                    break;
                                case 5:
    
                                    x = (path.getBoundingClientRect().left - wrapper.getBoundingClientRect().left) + (path.getBoundingClientRect().width / 2.75);
                                    y = (path.getBoundingClientRect().top - wrapper.getBoundingClientRect().top) + (path.getBoundingClientRect().height / 2);
    
                                    values[index] = { x, y };
                                    break;
                                case 6:
    
                                    x = (path.getBoundingClientRect().left - wrapper.getBoundingClientRect().left) + (path.getBoundingClientRect().width / 2.5);
                                    y = (path.getBoundingClientRect().top - wrapper.getBoundingClientRect().top) + (path.getBoundingClientRect().height / 2.75);
    
                                    values[index] = { x, y };
                                    break;
                                case 7:
    
                                    x = (path.getBoundingClientRect().left - wrapper.getBoundingClientRect().left) + (path.getBoundingClientRect().width / 2);
                                    y = (path.getBoundingClientRect().top - wrapper.getBoundingClientRect().top) + (path.getBoundingClientRect().height / 2.5);
    
                                    values[index] = { x, y };
                                    break;
                            }
                        }
    
                    })
                }
    
                setValues();
                return {
                    values,
                    update: setValues,
                }
            }
            const setColors = (colors, items) => {
                items.forEach((item, index) => {
                    if (item.tagName === 'svg') {
                        let path = item.children[0];
                        path.setAttribute('fill', colors[index]);
                    }
                })
            }
            const sevValueTooltip = (tooltip, color, text, value) => {
                let colorBox = tooltip.children[0];
                let textBox = tooltip.children[1];
                colorBox.style.background = color;
                textBox.innerText = `${text} - ${value}`;
            }
            

            let values = getArrayFromValues(diagram.dataset.diagramValues);
            let tooltip = createTooltip();
            let colors = diagram.dataset.diagramColors.split(',');
            let tooltipText = diagram.dataset.diagramText.split(',');

            setHeight(diagram);

            setItems(values, diagram, svgDiagrams);

            diagram.append(tooltip);


            let children = Array.from(diagram.children);
            setColors(colors, children);

            let tooltipPositionValues = createTooltipPositionValues(children, diagram);

            children.forEach((item, index) => {
                if (item.tagName === 'svg') {
                    item.addEventListener('mouseenter', () => {
                        let x = (tooltipPositionValues.values[index].x / diagram.clientWidth) * 100;
                        let y = tooltipPositionValues.values[index].y / diagram.clientWidth * 100;
                        setPositionTooltip(tooltip, x, y);
                        sevValueTooltip(tooltip, colors[index], tooltipText[index], values[index]);
                    })
                }
            })

            window.addEventListener('resize', () => setHeight(diagram));
            window.addEventListener('resize', tooltipPositionValues.update);


            return {
                showItemInfo: (index) => {
                    let x = (tooltipPositionValues.values[index].x / diagram.clientWidth) * 100;
                    let y = tooltipPositionValues.values[index].y / diagram.clientWidth * 100;
                    setPositionTooltip(tooltip, x, y);
                    sevValueTooltip(tooltip, colors[index], tooltipText[index], values[index]);
                }
            }
        }
