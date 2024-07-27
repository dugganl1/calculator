// Get all the elements we need
const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const decimalButton = document.querySelector(".decimal");
const clearButton = document.querySelector(".clear");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");

let currentDisplay = "0";
let firstNumber = null;
let operation = null;
let hasDecimal = false;
let readyForSecondNumber = false;

//FUNCTIONS

// Function to update the display
function updateDisplay() {
  display.textContent = currentDisplay;
}

function inputNumber(number) {
  if (readyForSecondNumber) {
    currentDisplay = number;
    readyForSecondNumber = false;
  } else {
    currentDisplay = currentDisplay === "0" ? number : currentDisplay + number;
  }
  updateDisplay();
}

function calculate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) return "Error";
      return a / b;
    default:
      return b;
  }
}

//EVENT LISTENERS

// Add click event listeners to number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => inputNumber(button.textContent));
});

// Add click event listener to decimal button
decimalButton.addEventListener("click", () => {
  if (!hasDecimal) {
    if (readyForSecondNumber) {
      currentDisplay = "0.";
      readyForSecondNumber = false;
    } else {
      currentDisplay += ".";
    }
    hasDecimal = true;
    updateDisplay();
  }
});

// Add click event listeners to operator buttons
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (firstNumber === null) {
      firstNumber = parseFloat(currentDisplay);
    } else if (operation) {
      const secondNumber = parseFloat(currentDisplay);
      const result = calculate(firstNumber, secondNumber, operation);
      currentDisplay = result.toString();
      firstNumber = result;
      updateDisplay();
    }
    operation = button.dataset.operator;
    readyForSecondNumber = true;
    hasDecimal = false;
  });
});

//Add click event listener to clear button
clearButton.addEventListener("click", () => {
  currentDisplay = "0";
  firstNumber = null;
  operation = null;
  hasDecimal = false;
  readyForSecondNumber = false;
  updateDisplay();
});

//Add click event listener to equals button
equalsButton.addEventListener("click", () => {
  if (firstNumber !== null && operation) {
    const secondNumber = parseFloat(currentDisplay);
    const result = calculate(firstNumber, secondNumber, operation);
    currentDisplay = result.toString();
    firstNumber = null;
    operation = null;
    readyForSecondNumber = true;
    hasDecimal = currentDisplay.includes(".");
    updateDisplay();
  }
});

// Initialize display
updateDisplay();
