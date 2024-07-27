// Get all the elements we need
const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const decimalButton = document.querySelector(".decimal");
const clearButton = document.querySelector(".clear");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const MAX_DISPLAY_LENGTH = 15; // Maximum number of characters to display

let currentDisplay = "0";
let firstNumber = null;
let operation = null;
let hasDecimal = false;
let readyForSecondNumber = false;

//FUNCTIONS

// Function to update the display
function updateDisplay() {
  display.textContent = truncateDisplay(currentDisplay);
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

function performCalculation() {
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
}

//Adding keyboard support
function handleKeydown(event) {
  const key = event.key;

  // Prevent default behavior for calculator keys
  if (
    /^[0-9\.\,\+\-\*\/=]$/.test(key) ||
    key === "Enter" ||
    key === "Escape" ||
    key === "Backspace"
  ) {
    event.preventDefault();
  }

  // Number keys
  if (/^[0-9]$/.test(key)) {
    inputNumber(key);
  }
  // Decimal point
  else if (key === "." || key === ",") {
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
  }
  // Operators
  else if (["+", "-", "*", "/"].includes(key)) {
    const operatorButton = document.querySelector(`.operator[data-operator="${key}"]`);
    if (operatorButton) operatorButton.click();
  }
  // Equals (Enter or =)
  else if (key === "Enter" || key === "=") {
    performCalculation();
  }
  // Clear (Escape or Delete)
  else if (key === "Escape" || key === "Delete") {
    clearButton.click();
  }
  // Backspace
  else if (key === "Backspace") {
    handleBackspace();
  }
}

// Function to handle backspace
function handleBackspace() {
  if (currentDisplay.length > 1) {
    currentDisplay = currentDisplay.slice(0, -1);
  } else {
    currentDisplay = "0";
  }
  if (!currentDisplay.includes(".")) {
    hasDecimal = false;
  }
  updateDisplay();
}

// Function to truncate display text
function truncateDisplay(text) {
  if (text.length > MAX_DISPLAY_LENGTH) {
    return text.slice(0, MAX_DISPLAY_LENGTH - 3) + "...";
  }
  return text;
}

//EVENT LISTENERS

// Add keydown event listener to the document
document.addEventListener("keydown", handleKeydown);

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
equalsButton.addEventListener("click", performCalculation);

// Initialize display
updateDisplay();
