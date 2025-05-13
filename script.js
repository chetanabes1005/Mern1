let displayValue = '';

function updateDisplay(value) {
  displayValue += value;
  document.getElementById('calculator-display').value = displayValue;
}

function deleteLastDigit() {
  displayValue = displayValue.slice(0, -1);
  document.getElementById('calculator-display').value = displayValue;
}

function clearDisplay() {
  displayValue = '';
  document.getElementById('calculator-display').value = displayValue;
}

function calculate() {
  try {
    let operator = '';
    let operands = [];
    let currentNumber = '';

    for (let i = 0; i < displayValue.length; i++) {
      if (displayValue[i] === '+' || displayValue[i] === '-' || displayValue[i] === '*' || displayValue[i] === '/') {
        operator = displayValue[i];
        if (currentNumber !== '') {
          operands.push(parseFloat(currentNumber));
          currentNumber = '';
        }
      } else {
        currentNumber += displayValue[i];
      }
    }

    if (currentNumber !== '') {
      operands.push(parseFloat(currentNumber));
    }

    if (operands.length < 2 || !operator) {
      throw new Error("Invalid Input");
    }

    let result = 0;

    if (operator === '+') {
      for (let i = 0; i < operands.length; i++) {
        result += operands[i];
      }
    } else if (operator === '-') {
      result = operands[0];
      for (let i = 1; i < operands.length; i++) {
        result -= operands[i];
      }
    } else if (operator === '*') {
      result = operands[0];
      for (let i = 1; i < operands.length; i++) {
        result *= operands[i];
      }
    } else if (operator === '/') {
      result = operands[0];
      for (let i = 1; i < operands.length; i++) {
        if (operands[i] === 0) {
          throw new Error("Can't Divide [0]");
        }
        result /= operands[i];
      }
    }

    document.getElementById('calculator-display').value = result;
  } catch (e) {
    document.getElementById('calculator-display').value = 'Error: ' + e.message;
  }
}
