document.addEventListener('DOMContentLoaded', () => {
    const previousOperandTextElement = document.getElementById('previous-operand');
    const currentOperandTextElement = document.getElementById('current-operand');

    let currentOperand = '0';
    let previousOperand = '';
    let operation = undefined;

    const numberButtons = document.querySelectorAll('.btn-number');
    const operatorButtons = document.querySelectorAll('.btn-operator');
    const equalsButton = document.querySelector('.btn-equals');
    const clearButton = document.querySelector('[data-action="clear"]');
    const deleteButton = document.querySelector('[data-action="delete"]');

    function updateDisplay() {
        currentOperandTextElement.innerText = currentOperand;
        if (operation != null) {
            previousOperandTextElement.innerText = `${previousOperand} ${operation}`;
        } else {
            previousOperandTextElement.innerText = '';
        }
    }

    function clear() {
        currentOperand = '0';
        previousOperand = '';
        operation = undefined;
    }

    function deleteNumber() {
        if (currentOperand === '0') return;
        if (currentOperand.length === 1) {
            currentOperand = '0';
        } else {
            currentOperand = currentOperand.toString().slice(0, -1);
        }
    }

    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        if (currentOperand === '0' && number !== '.') {
            currentOperand = number.toString();
        } else {
            currentOperand = currentOperand.toString() + number.toString();
        }
    }

    function chooseOperation(op) {
        if (currentOperand === '0' && op === '-') {
            currentOperand = '-';
            updateDisplay();
            return;
        }
        if (currentOperand === '' || currentOperand === '-') return;
        if (previousOperand !== '') {
            compute();
        }
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '0';
    }

    async function compute() {
        let prev = parseFloat(previousOperand);
        let current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        try {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    num1: prev,
                    num2: current,
                    action: operation
                })
            });

            const data = await response.json();

            if (response.ok) {
                currentOperand = data.result.toString();
                operation = undefined;
                previousOperand = '';
                updateDisplay();
            } else {
                currentOperand = 'Error';
                operation = undefined;
                previousOperand = '';
                updateDisplay();
                setTimeout(clear, 1500); // clear after showing error
            }
        } catch (error) {
            console.error('Error:', error);
            currentOperand = 'Error';
            operation = undefined;
            previousOperand = '';
            updateDisplay();
        }
    }

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.dataset.number);
            updateDisplay();
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            chooseOperation(button.dataset.operator);
            updateDisplay();
        });
    });

    equalsButton.addEventListener('click', button => {
        compute();
    });

    clearButton.addEventListener('click', button => {
        clear();
        updateDisplay();
    });

    deleteButton.addEventListener('click', button => {
        deleteNumber();
        updateDisplay();
    });

    updateDisplay();
});
