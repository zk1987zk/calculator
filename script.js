var calculator = {
    displayValue : '0',
    leftOperand: null,
    currentOperator: null,
    time: null,
};

function bindKeyPress() {
    var keys = document.querySelector('.calculator-keys');
    //console.log(keys); print all div elements
    keys.addEventListener('click', function(event) {
        var target = event.target;
        //console.log(target); print the html element
        var value = target.value;
        //console.log(value); print the element value
        //updateDisplay(value);
        if (calculator.time) {
            removeClock();
        }
        if (target.classList.contains('decimal')) {
            return handleDecimal();
        }
        if (target.classList.contains('clear')) { 
            return handleClear();
        }
        if (target.classList.contains('equal')) {
            return handleEqual();
        }
        if (target.classList.contains('operator')) { 
            return handleOperator(value);
        }
        if (target.classList.contains('clock')) {
            return handleClock();
        } 
        handleDigit(value);
    });
}
bindKeyPress();

function handleDecimal() {
    if (calculator.displayValue.includes('.')) {
        return;
    }
    calculator.displayValue += '.';
    updateDisplay();
}

function handleEqual() {
    var leftOperand = parseFloat(calculator.leftOperand);
    var rightOperand = parseFloat(calculator.displayValue);
    var answer;
    switch(calculator.currentOperator) {
        case '+':
            answer = leftOperand + rightOperand;
            break;
        case '-':
            answer = leftOperand - rightOperand;
            break;
        case '*':
            answer = leftOperand * rightOperand;
            break;
        case '/':
            answer = leftOperand / rightOperand;
            break;
        default:
            return
    }
    calculator.displayValue = '' + answer;
    calculator.currentOperator = null;
    updateDisplay();
}

function handleClear() {
    calculator.displayValue = '0';
    updateDisplay();
}

function handleOperator(operator) {
    if (calculator.currentOperator) {
        handleEqual();
        // 重复按键要检测，一个数和两次加号要自己相加，两个数则正常操作。
    }
    calculator.leftOperand = calculator.displayValue;
    calculator.currentOperator = operator;
    calculator.displayValue = '0';
}

function handleDigit(value) {
    var displayValue = calculator.displayValue;
    if (displayValue === '0') {
        calculator.displayValue = value;
    } else {
        calculator.displayValue = displayValue + value;
    }
    updateDisplay();
}

function handleClock() {
    var currentTime = new Date().toLocaleDateString();
    calculator.time = currentTime;
    var display = document.querySelector('.calculator-screen');
    display.classList.add('time-screen');
    updateDisplay(); 
    var timeout = setTimeout(() => {
        removeClock();
    }, 3000);
}

function removeClock() {
    calculator.time = null;
    var display = document.querySelector('.calculator-screen');
    display.classList.remove('time-screen');
    updateDisplay();
}

function updateDisplay() {
    var display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
    if (calculator.time) {
        display.value = calculator.time;
    }
}