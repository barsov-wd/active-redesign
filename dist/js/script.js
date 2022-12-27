document.addEventListener('DOMContentLoaded', () => {
        // if (document.documentElement.innerWidth < 1200) {
            const menu = document.querySelector('.header__nav'),
                menuItem = document.querySelectorAll('.header__menu-item'),
                humburger = document.querySelector('.humburger');

                humburger.addEventListener('click', () => {
                    toggleMenu();
                });


                menuItem.forEach(item => {
                    item.addEventListener('click', () => {
                        toggleMenu();
                    });
                });

                function toggleMenu() {
                    humburger.classList.toggle('humburger_active');
                    menu.classList.toggle('header__nav_active');
                    document.body.style.overflow = menu.classList.contains('header__nav_active') ? 'hidden' : '';
                }
        // }

        const sumInput = document.querySelector('.calc__input--sum'),
            timeInput = document.querySelector('.calc__input--time'),
            payt = document.querySelector('.calc__pt'),
            rangeTimeInput = document.querySelector('.range__input--time'),
            rangeSumInput = document.querySelector('.range__input--sum'),
            dateText = document.querySelector('.calc__input-text-right--date');



        // range + calc

        // маска
        function prettify(num) {
            var n = num.toString();
            return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
        }

        function getPayment(sum, period, rate) {
            // *
            // * sum - сумма кредита
            // * period - срок в годах
            // * rate - годовая ставка в процентах
            // * payt - поле, куда будет вывобиться платеж
            let i,
                koef;

            // ставка в месяц
            i = (rate / 12) / 100;

            // коэффициент аннуитета
            koef = (i * (Math.pow(1 + i, period * 12))) / (Math.pow(1 + i, period * 12) - 1);

            // итог
            payt.textContent = (sum * koef).toFixed().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
        }

        function range(input, progress, content) {
            const input$ = document.querySelector(input);
            const progress$ = document.querySelector(progress);
            if (input$) {
                const val = input$.value;
                const min = input$.getAttribute('min');
                const max = input$.getAttribute('max');
                const step = input$.getAttribute('step');
                const position =  100 / (max - step) * (val - step);
                updateRangePosition(progress$, position);

                input$.addEventListener('input', () => {
                    const val = input$.value;
                    const min = input$.getAttribute('min');
                    const max = input$.getAttribute('max');
                    const step = input$.getAttribute('step');
                    const position =  100 / (max - step) * (val - step);
                    updateRangePosition(progress$, position);
                    content.value = prettify(val);
                });
            }
        }

        function updateRangePosition(progress$, position) {
            if (progress$) {
                progress$.style.width = `${position}%`;
            }
        }

        function calc() {
            let sum = +sumInput.value.replace(/\D/g, ''),
                period = +timeInput.value.replace(/\D/g, '');

            getPayment(sum, period, 6.5);
        }



        function checkSymbols(input, event, maxValue) {
            input.addEventListener(event, () => {
                if (maxValue) {
                    if (input.value[0] == 0) {
                        input.value = input.value.replace(/./g, '');
                    }

                    input.value = input.value.replace(/\D/g, '');

                    input.value = prettify(input.value);

                    if (+input.value.replace(/\D/g, '') > maxValue) {
                        input.value = prettify(maxValue);
                    }
                }
                if ((+sumInput.value.replace(/\D/g, '') >= 300000 && +sumInput.value.replace(/\D/g, '') <= 20000000) && (+timeInput.value.replace(/\D/g, '') >= 1 && +timeInput.value.replace(/\D/g, '') <= 10)) {
                    calc();
                } else {
                    payt.textContent = '0';
                }

                switch (timeInput.value) {
                    case '1':
                        dateText.textContent = 'год';
                        break;

                    case '2':
                    case '3':
                    case '4':
                        dateText.textContent = 'года';
                        break;
                    default:
                        dateText.textContent = 'лет';
                }
            });
        }

        range('.range__input--sum', '.range__track--sum', sumInput);
        range('.range__input--time', '.range__track--time', timeInput);
        checkSymbols(sumInput, 'input', 20000000);
        checkSymbols(timeInput, 'input', 10);
        checkSymbols(rangeSumInput, 'change');
        checkSymbols(rangeTimeInput, 'change');

        // faq

        function faq(title, itemActive) {

            const titles = document.querySelectorAll(title);

            titles.forEach((item) => {
                item.addEventListener('click', () => {
                    item.parentElement.classList.toggle(itemActive);

                });
            });

        }

        faq('.faq__item__title', 'faq__item--active');


        // Функция слайдера
        function slider(window, field, cards, cardWidth, margin, dotsWrap, dotClass, dotClassActive, arrowPrev, arrowNext, arrowClass) {
            const window_ = document.querySelector(window),
                  field_ = document.querySelector(field),
                  cards_ = document.querySelectorAll(cards),
                  arrowPrev_ = document.querySelector(arrowPrev),
                  arrowNext_ = document.querySelector(arrowNext);
    
            let startPoint,
                swipeAction,
                endPoint,
                sliderCounter = 0,
                dots_ = [];
    
            // Устанавливаем фиксированную ширину поля слайдов
    
            field_.style.width = `${cardWidth * cards_.length + (margin * (cards_.length - 1))}px`;
            field_.style.marginLeft = 'auto';
            field_.style.marginRight = 'auto';
    
            // Слайд следующий
    
            function slideNext() {
                sliderCounter++;
                arrowNext_.classList.remove(arrowClass);
                arrowPrev_.classList.remove(arrowClass);
                if (sliderCounter >= cards_.length) {
                    sliderCounter = cards_.length - 1;
                }
                if ((sliderCounter + 1) == cards_.length) {
                    arrowNext_.classList.add(arrowClass);
                }
                if (dotsWrap) {
                    dots_.forEach((item, index)=> {
                    item.classList.remove(dotClassActive);
                    if (index == sliderCounter) {
                        item.classList.add(dotClassActive);
                    }
                    });
                }
                field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
            }
    
            // Слайд предыдущий
    
            function slidePrev() {
                sliderCounter--;
                arrowNext_.classList.remove(arrowClass);
                arrowPrev_.classList.remove(arrowClass);
                if (sliderCounter <= 0) {
                    sliderCounter = 0;
                }
                if (sliderCounter == 0) {
                    arrowPrev_.classList.add(arrowClass);
                }
                if (dotsWrap) {
                    dots_.forEach((item, index)=> {
                    item.classList.remove(dotClassActive);
                    if (index == sliderCounter) {
                        item.classList.add(dotClassActive);
                    }
                    });
                }
                field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
            }
    
            // Рендер точек
    
            if (dotsWrap) {
                const dotsWrap_ = document.querySelector(dotsWrap);
    
                cards_.forEach(() => {
                    const dot = document.createElement('div');
                    dot.classList.add(dotClass);
                    dotsWrap_.appendChild(dot);
                    dots_.push(dot);
                });
                dots_[0].classList.add(dotClassActive);
                dots_.forEach((item, index) => {
                    item.addEventListener('click', () => {
                    sliderCounter = index;
                    arrowNext_.classList.remove(arrowClass);
                    arrowPrev_.classList.remove(arrowClass);
                    if (sliderCounter == 0) {
                        arrowPrev_.classList.add(arrowClass);
                    }
                    if ((sliderCounter + 1) == cards_.length) {
                        arrowNext_.classList.add(arrowClass);
                    }
                    dots_.forEach(item_ => {
                        item_.classList.remove(dotClassActive);
                    });
                    item.classList.add(dotClassActive);
                    field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
                    });
                });
            }
    
            // Переключение на стрелки
    
            arrowPrev_.addEventListener('click', () => {
                slidePrev();
            });
    
            arrowNext_.addEventListener('click', () => {
                slideNext();
            });
    
            // Свайп слайдов тач-событиями
    
            window_.addEventListener('touchstart', (e) => {
                startPoint = e.changedTouches[0].pageX;
            });
    
            window_.addEventListener('touchmove', (e) => {
                swipeAction = e.changedTouches[0].pageX - startPoint;
                field_.style.transform = `translateX(${swipeAction + (-(cardWidth + margin) * sliderCounter)}px)`;
            });
    
            window_.addEventListener('touchend', (e) => {
                endPoint = e.changedTouches[0].pageX;
                if (Math.abs(startPoint - endPoint) > 50) {
                    arrowNext_.classList.remove(arrowClass);
                    arrowPrev_.classList.remove(arrowClass);
                    if (endPoint < startPoint) {
                    slideNext();
                    } else {
                    slidePrev();
                    }
                } else {
                    field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
                }
            });
        }

        slider('.reviews__window--mob',
                '.reviews__field--mob',
                '.reviews__card--mob',
                280,
                20,
                '.reviews__dots__wrap',
                'reviews__dot',
                'reviews__dot--active',
                '.reviews__arrow--prev--mob',
                '.reviews__arrow--next--mob',
                'reviews__arrow--inactive'
        );
    
});

