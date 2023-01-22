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

equal.addEventListener("click", function() {

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
})

let reset = document.querySelector(".reset");

reset.addEventListener('click', function() {
    inputResult.innerHTML = "";
});

window.addEventListener("keydown", (event) => {

    if (event.key.includes([''])) {

    }
    inputResult.innerHTML += event.key;
    var resultArr = indexArr.map(i => fruitier[i]);

    console.log(event);
}, true);

let del = document.querySelector(".button_del");

del.addEventListener('click', function() {
    inputResult.innerHTML = inputResult.textContent.slice(0, -1);

    if (inputResult.textContent === '') {
        inputResult.innerHTML = '0';
    }
});

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