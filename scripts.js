document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');
    
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (!value) return;

            if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput === '') return;

                if (previousInput !== '') {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.innerText = currentInput;
                }

                operator = value;
                previousInput = currentInput;
                currentInput = '';
            } else if (value === '.') {
                if (!currentInput.includes('.')) {
                    currentInput += value;
                }
            } else {
                currentInput += value;
            }

            display.innerText = currentInput || previousInput || '0';
        });
    });

    clearButton.addEventListener('click', () => {
        currentInput = '';
        previousInput = '';
        operator = '';
        display.innerText = '0';
    });

    equalsButton.addEventListener('click', () => {
        if (currentInput === '' || previousInput === '' || !operator) return;

        currentInput = calculate(previousInput, currentInput, operator);
        display.innerText = currentInput;
        previousInput = '';
        operator = '';
    });

    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);

        switch (operator) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                return (a / b).toString();
            default:
                return '';
        }
    }
});

