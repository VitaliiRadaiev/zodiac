let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));


window.addEventListener('load', function () {
	
	document.body.classList.add('is-load');

	// ==== ADD PADDING-TOP ================================
	{
		let wrapper = document.querySelector('._padding-top');
		if (wrapper) {
			let header = document.querySelector('.header');
			if(header) {
				const setPedding = () => wrapper.style.paddingTop = header.clientHeight + 'px';
				setPedding();
				window.addEventListener('resize', setPedding);
			}
			
		}
	}
	// ==== AND ADD PADDING-TOP ================================

	
	// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		//customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());;
	
const animItems = document.querySelectorAll('.diagram');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 2;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
};
	// //let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
// let forms = document.querySelectorAll('form');
// if (forms.length > 0) {
// 	for (let index = 0; index < forms.length; index++) {
// 		const el = forms[index];
// 		el.addEventListener('submit', form_submit);
// 	}
// }
// function form_submit(e) {
// 	let btn = event.target;
// 	let form = btn.closest('form');
// 	let message = form.getAttribute('data-message');
// 	let error = form_validate(form);
// 	if (error == 0) {
// 		//SendForm
// 		form_clean(form);
// 		if (message) {
// 			popup_open('message-' + message);
// 			e.preventDefault();
// 		}
// 	} else {
// 		let form_error = form.querySelectorAll('._error');
// 		if (form_error && form.classList.contains('_goto-error')) {
// 			_goto(form_error[0], 1000, 50);
// 		}
// 		event.preventDefault();
// 	}
// }
// function form_validate(form) {
// 	let error = 0;
// 	let form_req = form.querySelectorAll('._req');
// 	if (form_req.length > 0) {
// 		for (let index = 0; index < form_req.length; index++) {
// 			const el = form_req[index];
// 			if (!_is_hidden(el)) {
// 				error += form_validate_input(el);
// 			}
// 		}
// 	}
// 	return error;
// }
// function form_validate_input(input) {
// 	let error = 0;
// 	let input_g_value = input.getAttribute('data-value');

// 	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
// 		if (input.value != input_g_value) {
// 			let em = input.value.replace(" ", "");
// 			input.value = em;
// 		}
// 		if (email_test(input) || input.value == input_g_value) {
// 			form_add_error(input);
// 			error++;
// 		} else {
// 			form_remove_error(input);
// 		}
// 	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
// 		form_add_error(input);
// 		error++;
// 	} else {
// 		if (input.value == '' || input.value == input_g_value) {
// 			form_add_error(input);
// 			error++;
// 		} else {
// 			form_remove_error(input);
// 		}
// 	}
// 	return error;
// }
// function form_add_error(input) {
// 	input.classList.add('_error');
// 	input.parentElement.classList.add('_error');

// 	let input_error = input.parentElement.querySelector('.form__error');
// 	if (input_error) {
// 		input.parentElement.removeChild(input_error);
// 	}
// 	let input_error_text = input.getAttribute('data-error');
// 	if (input_error_text && input_error_text != '') {
// 		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
// 	}
// }
// function form_remove_error(input) {
// 	input.classList.remove('_error');
// 	input.parentElement.classList.remove('_error');

// 	let input_error = input.parentElement.querySelector('.form__error');
// 	if (input_error) {
// 		input.parentElement.removeChild(input_error);
// 	}
// }
// function form_clean(form) {
// 	let inputs = form.querySelectorAll('input,textarea');
// 	for (let index = 0; index < inputs.length; index++) {
// 		const el = inputs[index];
// 		el.parentElement.classList.remove('_focus');
// 		el.classList.remove('_focus');
// 		el.value = el.getAttribute('data-value');
// 	}
// 	let checkboxes = form.querySelectorAll('.checkbox__input');
// 	if (checkboxes.length > 0) {
// 		for (let index = 0; index < checkboxes.length; index++) {
// 			const checkbox = checkboxes[index];
// 			checkbox.checked = false;
// 		}
// 	}
// 	let selects = form.querySelectorAll('select');
// 	if (selects.length > 0) {
// 		for (let index = 0; index < selects.length; index++) {
// 			const select = selects[index];
// 			const select_default_value = select.getAttribute('data-default');
// 			select.value = select_default_value;
// 			select_item(select);
// 		}
// 	}
// }

// let viewPass = document.querySelectorAll('.form__viewpass');
// for (let index = 0; index < viewPass.length; index++) {
// 	const element = viewPass[index];
// 	element.addEventListener("click", function (e) {
// 		if (element.classList.contains('_active')) {
// 			element.parentElement.querySelector('input').setAttribute("type", "password");
// 		} else {
// 			element.parentElement.querySelector('input').setAttribute("type", "text");
// 		}
// 		element.classList.toggle('_active');
// 	});
// }


//Placeholers
let inputs = document.querySelectorAll('input');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];

			if (input.classList.contains('_mask')) {
				//'+7(999) 999 9999'
				//'+38(999) 999 9999'
				//'+375(99)999-99-99'
				let maskValue = input.dataset.mask;
				input.classList.add('_mask');
				Inputmask('+1(999) 999 9999', {
					//"placeholder": '',
					clearIncomplete: true,
					clearMaskOnLostFocus: true,
					onincomplete: function () {
						//input_clear_mask(input, input_g_value);
					}
				}).mask(input);
			}
			if (input.classList.contains('_date')) {
				datepicker(input, {
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
			}

			//const input_g_value = input.getAttribute('data-value');
			//input_placeholder_add(input);
			// if (input.value != '' && input.value != input_g_value) {
			// 	input_focus_add(input);
			// }
			// input.addEventListener('focus', function (e) {
			// 	if (input.value == input_g_value) {
			// 		input_focus_add(input);
			// 		input.value = '';
			// 	}
			// 	if (input.getAttribute('data-type') === "pass") {
			// 		input.setAttribute('type', 'password');
			// 	}
			// 	if (input.classList.contains('_date')) {
			// 		/*
			// 		input.classList.add('_mask');
			// 		Inputmask("99.99.9999", {
			// 			//"placeholder": '',
			// 			clearIncomplete: true,
			// 			clearMaskOnLostFocus: true,
			// 			onincomplete: function () {
			// 				input_clear_mask(input, input_g_value);
			// 			}
			// 		}).mask(input);
			// 		*/
			// 	}
			// 	if (input.classList.contains('_phone')) {
			// 		//'+7(999) 999 9999'
			// 		//'+38(999) 999 9999'
			// 		//'+375(99)999-99-99'
			// 		input.classList.add('_mask');
			// 		Inputmask("+375 (99) 9999999", {
			// 			//"placeholder": '',
			// 			clearIncomplete: true,
			// 			clearMaskOnLostFocus: true,
			// 			onincomplete: function () {
			// 				input_clear_mask(input, input_g_value);
			// 			}
			// 		}).mask(input);
			// 	}
			// 	if (input.classList.contains('_digital')) {
			// 		input.classList.add('_mask');
			// 		Inputmask("9{1,}", {
			// 			"placeholder": '',
			// 			clearIncomplete: true,
			// 			clearMaskOnLostFocus: true,
			// 			onincomplete: function () {
			// 				input_clear_mask(input, input_g_value);
			// 			}
			// 		}).mask(input);
			// 	}
			// 	form_remove_error(input);
			// });
			// input.addEventListener('blur', function (e) {
			// 	if (input.value == '') {
			// 		input.value = input_g_value;
			// 		input_focus_remove(input);
			// 		if (input.classList.contains('_mask')) {
			// 			input_clear_mask(input, input_g_value);
			// 		}
			// 		if (input.getAttribute('data-type') === "pass") {
			// 			input.setAttribute('type', 'text');
			// 		}
			// 	}
			// });
			// if (input.classList.contains('_date')) {
			// 	datepicker(input, {
			// 		customDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			// 		customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
			// 		formatter: (input, date, instance) => {
			// 			const value = date.toLocaleDateString()
			// 			input.value = value
			// 		},
			// 		onSelect: function (input, instance, date) {
			// 			input_focus_add(input.el);
			// 		}
			// 	});
			// }
		}
	}
}
// function input_placeholder_add(input) {
// 	const input_g_value = input.getAttribute('data-value');
// 	if (input.value == '' && input_g_value != '') {
// 		input.value = input_g_value;
// 	}
// }
// function input_focus_add(input) {
// 	input.classList.add('_focus');
// 	input.parentElement.classList.add('_focus');
// }
// function input_focus_remove(input) {
// 	input.classList.remove('_focus');
// 	input.parentElement.classList.remove('_focus');
// }
// function input_clear_mask(input, input_g_value) {
// 	input.inputmask.remove();
// 	input.value = input_g_value;
// 	input_focus_remove(input);
// }

// ==  QUANTITY =====================================================
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}
// == // QUANTITY =====================================================

// == PRICE SLIDER =====================================================
let priceSlider = document.querySelector('.price-filter');

if(priceSlider) {
	let inputNumFrom = document.getElementById('priceStart');
	let inputNumTo = document.getElementById('priceEnd');
	let value = document.querySelector('.values-price-filter');

	let min = value.dataset.min;
	let max = value.dataset.max;
	let numStart = value.dataset.start;
	let numEnd = value.dataset.end;
	noUiSlider.create(priceSlider, {
		start: [+numStart, +numEnd],  
		connect: true,
		tooltips:[wNumb({decimals: 0, thousand: ','}) , wNumb({decimals: 0, thousand: ','})], 
		range: {
			'min': [+min],
			'1%': [100,100],
			'max': [+max],
		}
	});

	priceSlider.noUiSlider.on('update', function (values, handle) {

	    var value = values[handle];

	    if (handle) {
	        inputNumTo.value = Math.round(value);
	    } else {
	        inputNumFrom.value = Math.round(value);
	    }
	});

	inputNumTo.onchange = function() {
		setPriceValues()
	}

	inputNumFrom.onchange = function() {
		setPriceValues()
	}

	function setPriceValues() {
		let priceStartValue;
		let priceEndValue;
		if(inputNumFrom.value != '') {
			priceStartValue = inputNumFrom.value;
		}

		if(inputNumTo.value != '') {
			priceEndValue = inputNumTo.value;
		}

		  priceSlider.noUiSlider.set([priceStartValue, priceEndValue])
	}
}

// == // PRICE SLIDER =====================================================;
	// === Burger Handler =====================================================================

// === Burger Handler =====================================================================	;
	
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

            if(diagram.classList.contains('reverse')) {
                values = values.reverse();
                colors = colors.reverse();
                tooltipText = tooltipText.reverse();
            }

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
                },

                getItemValue: (index) => {
                    return values[index];
                },
                getItemText: (index) => {
                    return tooltipText[index];
                },
                getColors: () => {
                    return colors;
                }
            }
        }
;
	;
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

};
	let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.which == 27) {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');
	const select_option_url = select_selected_option.dataset.imgUrl;

	

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow"><span><img src="' + select_option_url +'" alt=""></img>' + select_selected_text + '</span></div>';
	}
	
	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options" data-scroll>' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
				original.value = select_option_value;
				select_option.style.display = 'none';

                let event = new Event("change", {bubbles: true}); 
				original.dispatchEvent(event);
			}
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			const select_option_url = select_option.dataset.imgUrl;

			if (select_option_value != '') {
				const select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option"><img src="' + select_option_url +  '" alt="">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}
;
	//RATING
$('.rating.edit .star').hover(function () {
    var block = $(this).parents('.rating');
    block.find('.rating__activeline').css({ width: '0%' });
    var ind = $(this).index() + 1;
    var linew = ind / block.find('.star').length * 100;
    setrating(block, linew);
}, function () {
    var block = $(this).parents('.rating');
    block.find('.star').removeClass('active');
    var ind = block.find('input').val();
    var linew = ind / block.find('.star').length * 100;
    setrating(block, linew);
});
$('.rating.edit .star').click(function (event) {
    var block = $(this).parents('.rating');
    var re = $(this).index() + 1;
    block.find('input').val(re);
    var linew = re / block.find('.star').length * 100;
    setrating(block, linew);
});
$.each($('.rating'), function (index, val) {
    var ind = $(this).find('input').val();
    var linew = ind / $(this).parent().find('.star').length * 100;
    setrating($(this), linew);
});
function setrating(th, val) {
    th.find('.rating__activeline').css({ width: val + '%' });
};
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
};
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
;
	function Vector2(x, y) {

    this.x = x || 0;
    this.y = y || 0;

}

Object.defineProperties(Vector2.prototype, {

    "width": {

        get: function () {

            return this.x;

        },

        set: function (value) {

            this.x = value;

        }

    },

    "height": {

        get: function () {

            return this.y;

        },

        set: function (value) {

            this.y = value;

        }

    }

});

Object.assign(Vector2.prototype, {

    isVector2: true,

    set: function (x, y) {

        this.x = x;
        this.y = y;

        return this;

    },

    setScalar: function (scalar) {

        this.x = scalar;
        this.y = scalar;

        return this;

    },

    setX: function (x) {

        this.x = x;

        return this;

    },

    setY: function (y) {

        this.y = y;

        return this;

    },

    setComponent: function (index, value) {

        switch (index) {

            case 0: this.x = value; break;
            case 1: this.y = value; break;
            default: throw new Error('index is out of range: ' + index);

        }

        return this;

    },

    getComponent: function (index) {

        switch (index) {

            case 0: return this.x;
            case 1: return this.y;
            default: throw new Error('index is out of range: ' + index);

        }

    },

    clone: function () {

        return new this.constructor(this.x, this.y);

    },

    copy: function (v) {

        this.x = v.x;
        this.y = v.y;

        return this;

    },

    add: function (v, w) {

        if (w !== undefined) {

            console.warn('THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
            return this.addVectors(v, w);

        }

        this.x += v.x;
        this.y += v.y;

        return this;

    },

    addScalar: function (s) {

        this.x += s;
        this.y += s;

        return this;

    },

    addVectors: function (a, b) {

        this.x = a.x + b.x;
        this.y = a.y + b.y;

        return this;

    },

    addScaledVector: function (v, s) {

        this.x += v.x * s;
        this.y += v.y * s;

        return this;

    },

    sub: function (v, w) {

        if (w !== undefined) {

            console.warn('THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
            return this.subVectors(v, w);

        }

        this.x -= v.x;
        this.y -= v.y;

        return this;

    },

    subScalar: function (s) {

        this.x -= s;
        this.y -= s;

        return this;

    },

    subVectors: function (a, b) {

        this.x = a.x - b.x;
        this.y = a.y - b.y;

        return this;

    },

    multiply: function (v) {

        this.x *= v.x;
        this.y *= v.y;

        return this;

    },

    multiplyScalar: function (scalar) {

        this.x *= scalar;
        this.y *= scalar;

        return this;

    },

    divide: function (v) {

        this.x /= v.x;
        this.y /= v.y;

        return this;

    },

    divideScalar: function (scalar) {

        return this.multiplyScalar(1 / scalar);

    },

    min: function (v) {

        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);

        return this;

    },

    max: function (v) {

        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);

        return this;

    },

    clamp: function (min, max) {

        // assumes min < max, componentwise

        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));

        return this;

    },

    clampScalar: function () {

        var min = new Vector2();
        var max = new Vector2();

        return function clampScalar(minVal, maxVal) {

            min.set(minVal, minVal);
            max.set(maxVal, maxVal);

            return this.clamp(min, max);

        };

    }(),

    clampLength: function (min, max) {

        var length = this.length();

        return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));

    },

    floor: function () {

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

        return this;

    },

    ceil: function () {

        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);

        return this;

    },

    round: function () {

        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        return this;

    },

    roundToZero: function () {

        this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);

        return this;

    },

    negate: function () {

        this.x = - this.x;
        this.y = - this.y;

        return this;

    },

    dot: function (v) {

        return this.x * v.x + this.y * v.y;

    },

    lengthSq: function () {

        return this.x * this.x + this.y * this.y;

    },

    length: function () {

        return Math.sqrt(this.x * this.x + this.y * this.y);

    },

    lengthManhattan: function () {

        return Math.abs(this.x) + Math.abs(this.y);

    },

    normalize: function () {

        return this.divideScalar(this.length() || 1);

    },

    angle: function () {

        // computes the angle in radians with respect to the positive x-axis

        var angle = Math.atan2(this.y, this.x);

        if (angle < 0) angle += 2 * Math.PI;

        return angle;

    },

    distanceTo: function (v) {

        return Math.sqrt(this.distanceToSquared(v));

    },

    distanceToSquared: function (v) {

        var dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;

    },

    distanceToManhattan: function (v) {

        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);

    },

    setLength: function (length) {

        return this.normalize().multiplyScalar(length);

    },

    lerp: function (v, alpha) {

        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;

        return this;

    },

    lerpVectors: function (v1, v2, alpha) {

        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);

    },

    equals: function (v) {

        return ((v.x === this.x) && (v.y === this.y));

    },

    fromArray: function (array, offset) {

        if (offset === undefined) offset = 0;

        this.x = array[offset];
        this.y = array[offset + 1];

        return this;

    },

    toArray: function (array, offset) {

        if (array === undefined) array = [];
        if (offset === undefined) offset = 0;

        array[offset] = this.x;
        array[offset + 1] = this.y;

        return array;

    },

    fromBufferAttribute: function (attribute, index, offset) {

        if (offset !== undefined) {

            console.warn('THREE.Vector2: offset has been removed from .fromBufferAttribute().');

        }

        this.x = attribute.getX(index);
        this.y = attribute.getY(index);

        return this;

    },

    rotateAround: function (center, angle) {

        var c = Math.cos(angle), s = Math.sin(angle);

        var x = this.x - center.x;
        var y = this.y - center.y;

        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;

        return this;

    }

});


function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

class Pointer {
    constructor(domElement, { scaleMin = 0.01, scaleMax = 10.0, pressureMax = 1.0, pressureDuration = 1000 } = {}) {
        if (Pointer.instance) {
            return Pointer.instance;
        }

        this.dom = domElement;
        this.opt = { scaleMin, scaleMax, pressureMax, pressureDuration };
        this.pressCheckInterval = 20;
        this.deltaPressure = this.opt.pressureMax / this.opt.pressureDuration * this.pressCheckInterval;

        this.position = new Vector2();
        this.zoomSpeed = 1.0;
        this.scale = 1.0;
        this.dollyStart = new Vector2();
        this.dollyEnd = new Vector2();
        this.dollyDelta = new Vector2();

        this.addMoveListener(this.onMove.bind(this));
        this.addDownListener(this.onDown.bind(this));
        this.addUpListener(this.onUp.bind(this));

        this.dom.addEventListener('touchstart', this._onTouchZoomStart, false);
        this.addZoomListener(this.onZoom.bind(this));
        this.isPressing = false;
        this.pressure = 0.0;

        Pointer.instance = this;
    }

    get zoomScale() {
        return Math.pow(0.95, this.zoomSpeed);
    }
    setScale(val) {
        this.scale = clamp(val, this.opt.scaleMin, this.opt.scaleMax);
    }

    updatePosition(clientX, clientY) {
        let size = Math.min(this.dom.clientWidth, this.dom.clientHeight);
        this.position.x = (clientX * 2 - this.dom.clientWidth) / size;
        this.position.y = ((this.dom.clientHeight - clientY) * 2 - this.dom.clientHeight) / size;
    }

    onMove(e) {
        let x, y;
        if (e.touches) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else {
            x = e.clientX;
            y = e.clientY;
        }
        this.updatePosition(x, y);
        // e.preventDefault();
    }
    addMoveListener(cb) {
        ['mousemove', 'touchmove'].forEach(evtName => {
            this.dom.addEventListener(evtName, cb, false);
        });
    }

    setPressure(val) {
        let valid = val <= this.opt.pressureMax && val >= 0.0;
        this.pressure = clamp(val, 0.0, this.opt.pressureMax);
        //   console.log(this.pressure);
        return valid;
    }
    onDown(e) {
        if (e instanceof MouseEvent && e.button !== Pointer.BUTTON.MOUSE_LEFT) {
            return;
        }

        this.isPressing = true;
        if (e.touches) {
            let x = e.touches[0].clientX;
            let y = e.touches[0].clientY;
            this.updatePosition(x, y);
        }


        let intervalID = setInterval(() => {
            if (!this.isPressing || !this.setPressure(this.pressure + this.deltaPressure)) {
                clearInterval(intervalID);
            }
        }, this.pressCheckInterval);

        let pressingTest = setInterval(() => {
            if (this.isPressing) {
                var event = new CustomEvent('Pointer.pressing', { detail: this.pressure });
                this.dom.dispatchEvent(event);
            } else {
                clearInterval(pressingTest);
            }
        }, this.pressCheckInterval);
    }
    addDownListener(cb) {
        ['mousedown', 'touchstart'].forEach(evtName => {
            this.dom.addEventListener(evtName, cb, false);
        });
    }

    addPressingListener(cb) {
        ['Pointer.pressing', 'Pointer.postpressing'].forEach(evtName => {
            this.dom.addEventListener(evtName, cb, false);
        });
    }
    addPressingEndListener(cb) {
        this.dom.addEventListener('Pointer.pressingEnd', cb, false);
    }

    onUp(e) {
        if (e instanceof MouseEvent && e.button !== Pointer.BUTTON.MOUSE_LEFT) {
            return;
        }

        this.isPressing = false;
        let intervalID = setInterval(() => {
            if (this.isPressing || !this.setPressure(this.pressure - this.deltaPressure)) {
                var event = new CustomEvent('Pointer.pressingEnd', { detail: this.pressure });
                this.dom.dispatchEvent(event);
                clearInterval(intervalID);
            } else {
                var event = new CustomEvent('Pointer.postpressing', { detail: this.pressure });
                this.dom.dispatchEvent(event);
            }
        }, this.pressCheckInterval);
    }
    addUpListener(cb) {
        ['mouseup', 'touchend'].forEach(evtName => {
            this.dom.addEventListener(evtName, cb, false);
        });
    }

    _onTouchZoomStart(e) {
        if (e.touches.length !== 2) return;
        let dx = e.touches[0].pageX - e.touches[1].pageX;
        let dy = e.touches[0].pageY - e.touches[1].pageY;
        this.dollyStart.set(0, Math.sqrt(dx * dx + dy * dy));
    }
    _onTouchZoom(e) {
        var dx = e.touches[0].pageX - e.touches[1].pageX;
        var dy = e.touches[0].pageY - e.touches[1].pageY;
        this.dollyEnd.set(0, Math.sqrt(dx * dx + dy * dy));

        this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart);
        if (dollyDelta.y > 0) {
            this.zoomOut();
        } else if (dollyDelta.y < 0) {
            this.zoomIn();
        }

        this.dollyStart.copy(this.dollyEnd);
    }
    _onWheelZoom(e) {
        if (e.deltaY > 0) {
            this.zoomOut();
        } else if (e.deltaY < 0) {
            this.zoomIn();
        }
        e.preventDefault(); // prevent page scroll down
    }
    onZoom(e) {
        if (e.touches) {
            this._onTouchZoom(e);
        } else {
            this._onWheelZoom(e);
        }
    }
    addZoomListener(cb) {
        ['wheel', 'touchmove'].forEach(evtName => {
            if (evtName === 'touchmove') {
                cb = (e) => {
                    return e.touches.length === 2 ? cb(e) : undefined;
                }
            }
            this.dom.addEventListener(evtName, cb, false);
        });
    }

    zoomIn(scaleFactor = this.zoomScale) {
        this.setScale(this.scale * scaleFactor);
    }
    zoomOut(scaleFactor = this.zoomScale) {
        this.setScale(this.scale / scaleFactor);
    }
}
Pointer.instance = null;
Pointer.BUTTON = {
    MOUSE_LEFT: 0,
    MOUSE_MIDDLE: 1,
    MOUSE_RIGHT: 2
}


let animeBgBoxes = document.querySelectorAll('.anime-bg-box__bg');
if (animeBgBoxes.length) {
    animeBgBoxes.forEach(animeBgBox => {
        const regl = createREGL(animeBgBox);

        const DEV = false;
        const seed = DEV ? 38975.579831 : new Date().getTime() % 100000;
        
        const pointer = new Pointer(regl._gl.canvas);
        let lastPressingT, dtSec = 0, morphAmount = 0;
        pointer.addPressingListener(e => {
            lastPressingT = lastPressingT || Date.now();
            const nowInMs = Date.now();
            dtSec = (nowInMs - lastPressingT) / 1000;
            lastPressingT = nowInMs;

            morphAmount += dtSec * pointer.pressure * 0.1;
        });

        // Calling regl() creates a new partially evaluated draw command
        const draw = regl({
            // Shaders in regl are just strings.  You can use glslify or whatever you want
            // to define them.  No need to manually create shader objects.
            frag: `
    // Fork from http://glslsandbox.com/e#8143.0
    precision mediump float;
    #define SEED ${seed}.579831

    uniform vec2 uResolution;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uMorph;
    uniform vec2 uGrid;

    const int   complexity  = 10;   // complexity of curls/computation
    const float mouseSpeed  = 0.3;  // control the color changing
    const float fixedOffset = 0.7;  // Drives complexity in the amount of curls/cuves.  Zero is a single whirlpool.
    const float fluidSpeed  = 0.1; // Drives speed, smaller number will make it slower.
    const float baseColor   = 0.5;
    const float BLUR        = 0.47;

    #define PI 3.14159

    // more about noise: 
    // http://thebookofshaders.com/11/
    float random(float x) {
      return fract(sin(x) * SEED);
    }
    float noise(float x) {
      float i = floor(x);
      float f = fract(x);
      return mix(random(i), random(i + 1.0), smoothstep(0.0, 1.0, f));
    }
    float noiseS(float x) {
      return noise(x) * 2.0 - 1.0;
    }

    void main() {
      vec2 p = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y) * 0.7;
      float t = uTime * fluidSpeed + uMorph;
      float noiseTime = noise(t);
      float noiseSTime = noiseS(t);
      float noiseSTime1 = noiseS(t + 1.0);

      float blur = (BLUR + 0.14 * noiseSTime);
      for(int i=1; i <= complexity; i++) {
        p += blur / float(i) * sin(
            float(i) * p.yx + t + PI * vec2(noiseSTime, noiseSTime1))
          + fixedOffset;
      }
      for(int i=1; i <= complexity; i++) {
        p += blur / float(i) * cos(
            float(i) * p.yx + t + PI * vec2(noiseSTime, noiseSTime1))
          + fixedOffset;
      }
      p += uMouse * mouseSpeed;

      vec2 grid = uGrid * 2.0; // set complexity to 0 to debug the grid
      gl_FragColor = vec4(
        0.4 * vec3(
            sin(grid * p + vec2(5.0 * noiseSTime, 5.0 * noiseSTime1)),
            sin(p.x + p.y + noiseSTime)
          )
          + 0.7,
        1.0);
    }
  `,

            vert: `
    attribute vec2 position;
    void main () {
      gl_Position = vec4(position, 0, 1);
    }
  `,

            // Here we define the vertex attributes for the above shader
            attributes: {
                // regl.buffer creates a new array buffer object
                position: regl.buffer([
                    [-1, -1], [1, -1], [-1, 1],  // no need to flatten nested arrays, regl automatically
                    [-1, 1], [1, 1], [1, -1]     // unrolls them into a typedarray (default Float32)
                ])

                // regl automatically infers sane defaults for the vertex attribute pointers
            },

            uniforms: {
                uResolution: ({ viewportWidth, viewportHeight }) => [
                    viewportWidth, viewportHeight
                ],
                uTime: ({ tick }) => 0.01 * tick,
                uMouse: () => [pointer.position.x, pointer.position.y],
                uMorph: () => morphAmount,
                uRandomSeed: DEV ? 138975.579831 : new Date().getTime() % 1000000, //
                uGrid: ({ viewportWidth, viewportHeight }) => {
                    const ratio = 0.32;
                    return viewportHeight >= viewportWidth ? [1, viewportHeight / viewportWidth * ratio]
                        : [viewportWidth / viewportHeight * ratio, 1]
                }
            },

            // This tells regl the number of vertices to draw in this command
            count: 6
        });

        // regl.frame() wraps requestAnimationFrame and also handles viewport changes
        regl.frame(() => {
            draw();
        })
    })
};

	//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================



//Spollers
function spollerInit() {
	let spollers = document.querySelectorAll("._spoller");
	if (spollers.length > 0) {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];

			if(spoller.classList.contains('_active')) {
				_slideDown(spoller.nextElementSibling);
			}

			spoller.addEventListener("click", function (e) {
				e.preventDefault();
				if (spoller.classList.contains('_spoller-992') && window.innerWidth > 992) {
					return false;
				}
				if (spoller.classList.contains('_spoller-768') && window.innerWidth > 768) {
					return false;
				}
				if (spoller.closest('._spollers').classList.contains('_one')) {
					let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
					for (let i = 0; i < curent_spollers.length; i++) {
						let el = curent_spollers[i];
						if (el != spoller) {
							el.classList.remove('_active');
							el.parentElement.classList.remove('_active');
							_slideUp(el.nextElementSibling);
						}
					}
				}
				spoller.classList.toggle('_active');
				if(spoller.classList.contains('_active')) {
					spoller.parentElement.classList.add('_active');
				} else {
					spoller.parentElement.classList.remove('_active');
				}
				_slideToggle(spoller.nextElementSibling);
			});
		}
	}
}
spollerInit()
// === // Spollers ==================================================================




if($('.anchor').length>0) {
	$(".anchor").click(function() {
	  var elementClick = $(this).attr("href");
	  var destination = $(`${elementClick}`).offset().top - 90;
	  jQuery("html:not(:animated),body:not(:animated)").animate({
		scrollTop: destination
	  }, 600);
	  return false;
	});
}


function createTabs(containerName = false, triggersName = false, tabsName = false) {
	let container = document.querySelector(`${containerName}`);
	if (container) {
		let allTriggers = container.querySelectorAll(`${triggersName}`);
		let allTabs = container.querySelectorAll(`${tabsName}`);

		if (!allTabs.length) {
			let err = new Error('Tabs not found.');
			throw err;
		}

		if (allTriggers.length) {
			allTriggers.forEach(trigger => {
				trigger.addEventListener('click', (e) => {
					e.preventDefault();
					const id = trigger.getAttribute('href').replace('#', '');

					trigger.classList.add('active');

					allTriggers.forEach(i => {
						if (i == trigger) {
							return
						}
						i.classList.remove('active');
					});

					allTabs.forEach(tab => {
						if (tab.id == id) {
							tab.classList.add('active')
						} else {
							tab.classList.remove('active');
						}
					})

				})
			})
		} else {
			let err = new Error('Triggers not found.');
			throw err;
		}

	}
}

//createTabs('.tabs', '.tab-trigger', '.tab-content')


function setSameHeight(items) {
    if(!items.length) return;

    let maxHeight = Math.max(...Array.from(items).map(i => i.clientHeight));
    items.forEach(i => i.style.minHeight = maxHeight + 'px');
}


function initScrollBar() {
	let scrollElements = document.querySelectorAll('[data-scroll]');
	if(scrollElements.length) {
		scrollElements.forEach(el => {
			if(!el.getAttribute('data-simplebar') && document.documentElement.clientWidth > 991.98) {
				new SimpleBar(el, { autoHide: false });
			}
		})

	}
}

initScrollBar();;
});

window.addEventListener('DOMContentLoaded', function() {
	if(isMobile.any()) {
		document.body.classList.add('_is-mobile');
	}


	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});



	$('img.img-svg').each(function(){
		var $img = $(this);
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		$.get(imgURL, function(data) {
		  var $svg = $(data).find('svg');
		  if(typeof imgClass !== 'undefined') {
			$svg = $svg.attr('class', imgClass+' replaced-svg');
		  }
		  $svg = $svg.removeAttr('xmlns:a');
		  if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
			$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
		  }
		  $img.replaceWith($svg);
		}, 'xml');
	  });
	  
});

//// html example --- <img class="lazy" data-src="https://images.unsplash.com/photo-1606851091851-e8c8c0fca5ba?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" src="img/photo/placeholder.jpg" alt="img">


// === lazy load ==================================================================
document.addEventListener("DOMContentLoaded", function () {
	var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    let active = false;

	if ("IntersectionObserver" in window) {
        
		let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					let lazyImage = entry.target;
					lazyImage.src = lazyImage.dataset.src;
					//lazyImage.srcset = lazyImage.dataset.srcset;
					lazyImage.classList.remove("lazy");
					lazyImageObserver.unobserve(lazyImage);
				}
			});
		});

		lazyImages.forEach(function (lazyImage) {
			lazyImageObserver.observe(lazyImage);
		});
	} else {
        const lazyLoad = function() {
            if (active === false) {
              active = true;
              setTimeout(function() {
                lazyImages.forEach(function(lazyImage) {
                  if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                    lazyImage.src = lazyImage.dataset.src;
                    //lazyImage.srcset = lazyImage.dataset.srcset;
                    lazyImage.classList.remove("lazy");
        
                    lazyImages = lazyImages.filter(function(image) {
                      return image !== lazyImage;
                    });
        
                    if (lazyImages.length === 0) {
                      document.removeEventListener("scroll", lazyLoad);
                      window.removeEventListener("resize", lazyLoad);
                      window.removeEventListener("orientationchange", lazyLoad);
                    }
                  }
                });
        
                active = false;
              }, 200);
            }
          };
      
          lazyLoad();
        
          document.addEventListener("scroll", lazyLoad);
          window.addEventListener("resize", lazyLoad);
          window.addEventListener("orientationchange", lazyLoad);
    }
    
});
// === // lazy load ==================================================================;

