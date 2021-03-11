'use scrict';

window.addEventListener('DOMContentLoaded', () => {


    //UI-components

    const modalTriger = document.querySelector('.first__btn'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = modal.querySelector('.modal__btn-close'),
        salaryInput = modal.querySelector('.form__salary-input'),
        errorMess = modal.querySelector('.form__input-error-mess'),
        btnCount = modal.querySelector('.form__row-count'),
        formResult = modal.querySelector('.form__result'),
        resultBox = modal.querySelector('.result-box'),
        currency = document.querySelector('.currency');


    //functions

    function hideElement(elem) {
        elem.classList.remove('show');
        elem.classList.add('hide');

    };

    function showElement(elem) {
        elem.classList.add('show');
        elem.classList.remove('hide');

    };

    function getNumber(target) {
        if (target.tagName === "INPUT") {
            target.value = target.value.replace(/[^\?0-9]/g, '');
        };
        return target.value;
    };

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    function positionCurrency(value, element) {
        let length = String(value).length;
        if (length) {
            showElement(element);
            let number = (24 + length * 9) + 'px';
            element.style.left = number;
        } else {
            hideElement(element);
        }
    };

    function getArrTax(yearTax) {
        let maxTax = 260000;
        let arr = [];

        while (maxTax > yearTax) {
            maxTax = maxTax - yearTax;
            arr.push(yearTax);
        }
        arr.push(maxTax);
        return arr;
    };

    function inputValidation(input, className) {
        if (!input.value.length) {
            input.classList.add(className);
            showElement(errorMess);
        } else {
            input.classList.remove(className);
            hideElement(errorMess);
        }
    };

    //Закрытие или открытие модального окна

    modalTriger.addEventListener('click', () => showElement(modal));

    modalCloseBtn.addEventListener('click', () => hideElement(modal));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideElement(modal);
        };
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            hideElement(modal);
        }
    });


    //Вывод чисел в инпуте в нужном формате

    const correctNum = (selector) => {
        selector.addEventListener('input', ({ target }) => {
            getNumber(target);
            positionCurrency(target.value, currency);
            target.value = numberWithSpaces(selector.value);
        })
    };

    correctNum(salaryInput);


    //Создание и вывод списка результатов 

    function cleateItem(i, sum) {
        const formResultItem = document.createElement('li');
        formResultItem.classList.add('form__result-item');
        if (i !== 1) {
            formResultItem.innerHTML = `
            <input class="form__resul-checkbox" type="checkbox" id="input-${i}" name="result-input-${i}">
            <label class="form__resul-label" for="input-${i}">${numberWithSpaces(sum)} рублей <span>в ${i + 1}-й год</span></label>
        `;
        } else {
            formResultItem.innerHTML = `
            <input class="form__resul-checkbox" type="checkbox" id="input-${i}" name="result-input-${i}">
            <label class="form__resul-label" for="input-${i}">${numberWithSpaces(sum)} рублей <span>во ${i + 1}-й год</span></label>
        `;
        }

        return formResultItem;
    }

    btnCount.addEventListener('click', (e) => {
        e.preventDefault();

        inputValidation(salaryInput, "form__input--error");

        const salary = parseInt((salaryInput.value).split(' ').join(''));
        const yearTax = salary * 12 * 0.13;
        if (salary) {
            showElement(formResult);
        };

        const arrTax = getArrTax(yearTax);
        const list = document.createElement('ul');
        list.classList.add('form__result-list');
        arrTax.forEach((item, i) => {
            const li = cleateItem(i, item);
            list.append(li);
        });
        resultBox.innerHTML = '';
        resultBox.append(list);
    });
});
