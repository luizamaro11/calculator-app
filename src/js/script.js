let numbers = document.getElementsByClassName("number");
let inputResult = document.querySelector(".result_calc");

let i;
for (i = 0; i < numbers.length; i++) {

    var value;
    var result = 0;
    countClick = 0;

    numbers[i].addEventListener("click", function() {
        value = this.getAttribute('data-number');

        countClick += 1;

        if (countClick !== 1) {
            inputResult.innerHTML += value;
        } else {
            inputResult.innerHTML = value;
        }
    });

}

let dot = document.querySelector('.dot');

dot.addEventListener("click", function() {
    inputResult.innerHTML += this.innerHTML;
});

//ação das operações

let operations = document.getElementsByClassName("operation");
var valueOne = 0;
var valueTwo = 0;
var operation;

for (i = 0; i < operations.length; i++) {

    operations[i].addEventListener("click", function() {
        var operation = this.getAttribute("data-operation");

        if (valueOne == 0) {
            valueOne = inputResult.textContent;
        }

        let strOperator = getSignalOperator(operation);

        inputResult.innerHTML += strOperator
    });
}

let equal = document.querySelector(".equal_to");

equal.addEventListener("click", resultCalculator);

let reset = document.querySelector(".reset");

reset.addEventListener('click', function() {
    inputResult.innerHTML = "";
});

window.addEventListener("keydown", (event) => {

    let keydownPermission = ['+', '-', '*', '/', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];

    if (keydownPermission.includes(event.key)) {
        inputResult.innerHTML += event.key;
    }

    if (event.key === 'Backspace') {
        inputResult.innerHTML = inputResult.textContent.slice(0, -1);

        if (inputResult.textContent === '') {
            inputResult.innerHTML = '0';
        }
    }

    if (event.key === 'Enter') {
        resultCalculator();
    }

    if (event.ctrlKey === true && event.key === 'Backspace') {
        inputResult.innerHTML = '0';
    }
}, true);

let del = document.querySelector(".button_del");

del.addEventListener('click', function() {
    inputResult.innerHTML = inputResult.textContent.slice(0, -1);

    if (inputResult.textContent === '') {
        inputResult.innerHTML = '0';
    }
});

function resultCalculator() {
    let input = inputResult.textContent;
    let regexValueOne;
    let regexValueTwo;

    const regex = /./gm;
    let typeNumber = input.match(regex);

    let operator = '';

    if (typeNumber.includes('.') === true) {
        //operator = input.replace(/(\+|\-|\*|\/)/gm, '$1'); // operator para numeros decimais
        //(\d+.\d+.)
        const regex  = /(\+|\-|\*|\/)/gm;

        let arrayOperator = regex.exec(input);

        operator = arrayOperator[0];

        if (operator === '+') {
            regexValueOne = /(\+\d+.\d+)/gm;
            regexValueTwo = /(\d+.\d+\+)/gm;
        } else if (operator === '-') {
            regexValueOne = /(\-\d+.\d+)/gm;
            regexValueTwo = /(\d+.\d+\-)/gm;
        } else if (operator === '*') {
            regexValueOne = /(\*\d+.\d+)/gm;
            regexValueTwo = /(\d+.\d+\*)/gm;
        } else if (operator === '/') {
            regexValueOne = /(\/\d+.\d+)/gm;
            regexValueTwo = /(\d+.\d+\/)/gm;
        }
    } else {
        operator = input.replace(/(\d+)/gm, ``); // operator para numeros inteiros

        if (operator === '+') {
            regexValueOne = /(\+\d+)/gm;
            regexValueTwo = /(\d+\+)/gm;
        } else if (operator === '-') {
            regexValueOne = /(\-\d+)/gm;
            regexValueTwo = /(\d+\-)/gm;
        } else if (operator === '*') {
            regexValueOne = /(\*\d+)/gm;
            regexValueTwo = /(\d+\*)/gm;
        } else if (operator === '/') {
            regexValueOne = /(\/\d+)/gm;
            regexValueTwo = /(\d+\/)/gm;
        }
    }

    let numberOne = input.replace(regexValueOne, '');
    let numberTwo = input.replace(regexValueTwo, '');

    valueOne = numberOne;
    valueTwo = numberTwo;

    if (valueTwo !== 0) {
        let result = calculator(valueOne, valueTwo, operator);

        inputResult.innerHTML = result.toString();
    }
}

function calculator(valueOne, valueTwo, operation) {

    let result = 0;

    valueOne = formatNumber(valueOne);
    valueTwo = formatNumber(valueTwo);

    if (operation === '+') {
        result = valueOne + valueTwo;
    } else if (operation === '-') {
        result = valueOne - valueTwo;
    } else if (operation === '*') {
        result = valueOne * valueTwo;
    } else if (operation === '/') {
        result = valueOne / valueTwo;
    }
    console.log(result);

    return result;
}

function formatNumber(number) {
    const regex = /./gm
    let valueNumber

    // verifica se é um number ou float
    let typeNumber = number.match(regex)

    valueNumber = (typeNumber.includes('.') === true) ? parseFloat(number) : parseInt(number)

    return valueNumber;
}

function getSignalOperator(operator) {
    let strOperator;

    if (operator == 'addition') {
        strOperator = '+'
    } else if (operator == 'subtraction') {
        strOperator = '-'
    } else if (operator == 'multiplication') {
        strOperator = '*'
    } else if (operator == 'division') {
        strOperator = '/'
    }

    return strOperator;
}

// troca de tema
const theme = document.querySelector('[name="theme"]');
const root = document.querySelector(':root');

theme.addEventListener("change", function(e) {
    const valueTheme = e.target.value;
    alterTheme(valueTheme);
});

function alterTheme(valueTheme) {

    if (valueTheme == 1) {
        root.style.setProperty('--background-body', 'hsl(222, 26%, 31%)');
        root.style.setProperty('--color-text', '#fff');
        root.style.setProperty('--background-result', 'hsl(224, 36%, 15%)');
        root.style.setProperty('--background-calculator', 'hsl(223, 31%, 20%)');
        root.style.setProperty('--background-button', 'hsl(30, 25%, 89%)');
        root.style.setProperty('--color-text-button', 'hsl(60, 10%, 19%)');
        root.style.setProperty('--shadow-button', 'hsl(28, 16%, 65%)');
        root.style.setProperty('--background-button-del', 'hsl(225, 21%, 49%)');
        root.style.setProperty('--background-button-reset', 'hsl(225, 21%, 49%)');
        root.style.setProperty('--shadow-button-del', 'hsl(224, 28%, 35%)');
        root.style.setProperty('--shadow-button-reset', 'hsl(224, 28%, 35%)');
        root.style.setProperty('--background-button-equal', 'hsl(6, 63%, 50%)');
        root.style.setProperty('--shadow-button-equal', 'hsl(6, 70%, 34%)');
        root.style.setProperty('--color-text-equal', '#fff');
    } else if (valueTheme == 2) {
        root.style.setProperty('--background-body', 'hsl(0, 0%, 90%)');
        root.style.setProperty('--color-text', 'hsl(60, 10%, 19%)');
        root.style.setProperty('--background-result', 'hsl(0, 0%, 93%)');
        root.style.setProperty('--background-calculator', 'hsl(0, 5%, 81%)');
        root.style.setProperty('--background-button', 'hsl(45, 7%, 89%)');
        root.style.setProperty('--color-text-button', 'hsl(60, 10%, 19%);');
        root.style.setProperty('--shadow-button', 'hsl(35, 11%, 61%)');
        root.style.setProperty('--background-button-del', 'hsl(185, 42%, 37%)');
        root.style.setProperty('--background-button-reset', 'hsl(185, 42%, 37%)');
        root.style.setProperty('--shadow-button-del', 'hsl(185, 58%, 25%)');
        root.style.setProperty('--shadow-button-reset', 'hsl(185, 58%, 25%)');
        root.style.setProperty('--background-button-equal', 'hsl(25, 98%, 40%)');
        root.style.setProperty('--shadow-button-equal', 'hsl(25, 99%, 27%)');
        root.style.setProperty('--color-text-equal', '#fff');
    } else if (valueTheme == 3) {
        root.style.setProperty('--background-body', 'hsl(268, 75%, 9%)');
        root.style.setProperty('--color-text', 'hsl(52, 100%, 62%)');
        root.style.setProperty('--background-result', 'hsl(268, 71%, 12%)');
        root.style.setProperty('--background-calculator', 'hsl(268, 71%, 12%)');
        root.style.setProperty('--background-button', 'hsl(268, 47%, 21%)');
        root.style.setProperty('--color-text-button', 'hsl(52, 100%, 62%)');
        root.style.setProperty('--shadow-button', 'hsl(290, 70%, 36%)');
        root.style.setProperty('--background-button-del', 'hsl(281, 89%, 26%)');
        root.style.setProperty('--background-button-reset', 'hsl(281, 89%, 26%)');
        root.style.setProperty('--shadow-button-del', 'hsl(285, 91%, 52%)');
        root.style.setProperty('--shadow-button-reset', 'hsl(285, 91%, 52%)');
        root.style.setProperty('--background-button-equal', 'hsl(176, 100%, 44%)');
        root.style.setProperty('--shadow-button-equal', 'hsl(177, 92%, 70%)');
        root.style.setProperty('--color-text-equal', '#000');
    }
}