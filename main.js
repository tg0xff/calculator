const screen = document.getElementById("screen");
const buttons = document.querySelectorAll("button");
const operatorFuncs = {
  "+": add,
  "−": subtract,
  "×": multiply,
  "÷": divide,
};
const buttonFuncs = {
  0: inputNought,
  1: inputNumber,
  2: inputNumber,
  3: inputNumber,
  4: inputNumber,
  5: inputNumber,
  6: inputNumber,
  7: inputNumber,
  8: inputNumber,
  9: inputNumber,
  ".": inputPoint,
  "÷": inputOperation,
  "×": inputOperation,
  "−": inputOperation,
  "+": inputOperation,
  "⌫": inputBackspace,
  C: clearScreen,
  "=": calculateResult,
};
const keysToIds = {
  Numpad0: "calc-0",
  Digit0: "calc-0",
  Numpad1: "calc-1",
  Digit1: "calc-1",
  Numpad2: "calc-2",
  Digit2: "calc-2",
  Numpad3: "calc-3",
  Digit3: "calc-3",
  Numpad4: "calc-4",
  Digit4: "calc-4",
  Numpad5: "calc-5",
  Digit5: "calc-5",
  Numpad6: "calc-6",
  Digit6: "calc-6",
  Numpad7: "calc-7",
  Digit7: "calc-7",
  Numpad8: "calc-8",
  Digit8: "calc-8",
  Numpad9: "calc-9",
  Digit9: "calc-9",
};
let backgroundColorContainer = "";
let boxShadowContainer = "";
let calculatorNumbers = ["0"];
let calculatorOperations = [];
let isDecimalFraction = false;

function add(summand0, summand1) {
  return summand0 + summand1;
}

function subtract(minuend, subtrahend) {
  return minuend - subtrahend;
}

function multiply(factor0, factor1) {
  return factor0 * factor1;
}

function divide(dividend, divisor) {
  return dividend / divisor;
}

function operate(operand0, operator, operand1) {
  let result;
  operand0 = +operand0;
  operand1 = +operand1;
  const operF = operatorFuncs[operator];
  result = operF(operand0, operand1);
  return result.toString();
}

function calculateResult() {
  let operand0;
  let operand1;
  let operator;
  let result;
  calculatorNumbers.reverse();
  calculatorOperations.reverse();

  while (calculatorOperations.length > 0) {
    operand0 = calculatorNumbers.pop();
    operand1 = calculatorNumbers.pop();
    operator = calculatorOperations.pop();
    result = operate(operand0, operator, operand1);
    calculatorNumbers.push(result);
  }
}

function styleWhileClicking(e) {
  backgroundColorContainer = e.target.style["background-color"];
  boxShadowContainer = e.target.style["box-shadow"];

  e.target.style["background-color"] = "var(--background-colour)";
  e.target.style["box-shadow"] = "none";
}

function styleAfterClicking(e) {
  e.target.style["background-color"] = backgroundColorContainer;
  e.target.style["box-shadow"] = boxShadowContainer;

  backgroundColorContainer = "";
  boxShadowContainer = "";
}

function updateScreen() {
  let number = calculatorNumbers[calculatorNumbers.length - 1];
  let newContent = number;
  newContent = (number.length > 13 ? "…" : "") + newContent.slice(-13);
  screen.textContent = newContent;
}

function inputNumber(e) {
  const lastIndex = calculatorNumbers.length - 1;
  if (calculatorNumbers[lastIndex] !== "0") {
    calculatorNumbers[lastIndex] += e.target.textContent;
  } else {
    calculatorNumbers[lastIndex] = e.target.textContent;
  }
}

function inputNought() {
  const lastIndex = calculatorNumbers.length - 1;
  if (calculatorNumbers[lastIndex] !== "0") {
    calculatorNumbers[lastIndex] += "0";
  }
}

function inputPoint() {
  const lastIndex = calculatorNumbers.length - 1;
  if (!isDecimalFraction) {
    calculatorNumbers[lastIndex] += ".";
    isDecimalFraction = true;
  }
}

function inputOperation(e) {
  calculatorOperations[calculatorOperations.length] = e.target.textContent;
  calculatorNumbers[calculatorNumbers.length] = "0";
  isDecimalFraction = false;
}

function inputBackspace() {
  const lastIndex = calculatorNumbers.length - 1;
  const numString = calculatorNumbers[lastIndex];
  const lastChar = numString.slice(-1);

  if (numString.length > 1) {
    calculatorNumbers[lastIndex] = numString.slice(0, -1);
  } else {
    calculatorNumbers[lastIndex] = "0";
  }

  if (lastChar === ".") {
    isDecimalFraction = false;
  }
}

function clearScreen() {
  calculatorNumbers = ["0"];
  isDecimalFraction = false;
}

function execButtonAction(e) {
  const buttonF = buttonFuncs[e.target.textContent];
  buttonF(e);
  updateScreen();
}

function buttonEventListeners(button) {
  button.addEventListener("mousedown", styleWhileClicking);
  button.addEventListener("mouseup", styleAfterClicking);
  button.addEventListener("click", execButtonAction);
}

function recogniseKeybindings(e) {
  const buttonId = keysToIds[e.code];
  if (buttonId) {
    e.preventDefault();
    document.getElementById(buttonId).click();
  }
}

updateScreen();
buttons.forEach((button) => buttonEventListeners(button));
window.addEventListener("keydown", recogniseKeybindings);
