// Get all the elements we need
const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const decimalButton = document.querySelector(".decimal");
const clearButton = document.querySelector(".clear");

let currentDisplay = "0";
let hasDecimal = false;

// Function to update the display
function updateDisplay() {
  display.textContent = currentDisplay;
}

// Add click event listeners to number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentDisplay === "0") {
      currentDisplay = button.textContent;
    } else {
      currentDisplay += button.textContent;
    }
    updateDisplay();
  });
});

// Add click event listener to decimal button
decimalButton.addEventListener("click", () => {
  if (!hasDecimal) {
    if (currentDisplay === "0") {
      currentDisplay = "0.";
    } else {
      currentDisplay += ".";
    }
    hasDecimal = true;
    updateDisplay();
  }
});

//Add click event listener to clear button
clearButton.addEventListener("click", () => {
  currentDisplay = "0";
  hasDecimal = false;
  updateDisplay();
});

// Initialize display
updateDisplay();
