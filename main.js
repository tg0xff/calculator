const screen = document.getElementById("screen");
const buttons = document.querySelectorAll("button");
let backgroundColorContainer = "";
let boxShadowContainer = "";
let calculator_numbers = ["0"];
let calculator_operations = [];
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

  const operfunc = {
    "+": add,
    "−": subtract,
    "×": multiply,
    "÷": divide,
  }[operator];

  result = operfunc(operand0, operand1);

  return result.toString();
}

function calculateResult() {
  let operand0;
  let operand1;
  let operator;
  let result;
  calculator_numbers.reverse();
  calculator_operations.reverse();

  while (calculator_operations.length > 0) {
    operand0 = calculator_numbers.pop();
    operand1 = calculator_numbers.pop();
    operator = calculator_operations.pop();
    result = operate(operand0, operator, operand1);
    calculator_numbers.push(result);
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
  let number = calculator_numbers[calculator_numbers.length - 1];
  let newContent = number;
  newContent = (number.length > 13 ? "…" : "") + newContent.slice(-13);
  screen.textContent = newContent;
}

function inputNumber(e) {
  const lastIndex = calculator_numbers.length - 1;
  if (calculator_numbers[lastIndex] !== "0") {
    calculator_numbers[lastIndex] += e.target.textContent;
  } else {
    calculator_numbers[lastIndex] = e.target.textContent;
  }
}

function inputNought() {
  const lastIndex = calculator_numbers.length - 1;
  if (calculator_numbers[lastIndex] !== "0") {
    calculator_numbers[lastIndex] += "0";
  }
}

function inputPoint() {
  const lastIndex = calculator_numbers.length - 1;
  if (!isDecimalFraction) {
    calculator_numbers[lastIndex] += ".";
    isDecimalFraction = true;
  }
}

function inputOperation(e) {
  calculator_operations[calculator_operations.length] = e.target.textContent;
  calculator_numbers[calculator_numbers.length] = "0";
  isDecimalFraction = false;
}

function inputBackspace() {
  const lastIndex = calculator_numbers.length - 1;
  const numString = calculator_numbers[lastIndex];
  const lastChar = numString.slice(-1);

  if (numString.length > 1) {
    calculator_numbers[lastIndex] = numString.slice(0, -1);
  } else {
    calculator_numbers[lastIndex] = "0";
  }

  if (lastChar === ".") {
    isDecimalFraction = false;
  }
}

function clearScreen() {
  calculator_numbers = ["0"];
  isDecimalFraction = false;
}

function execButtonAction(e) {
  const buttonfunc = {
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
  }[e.target.textContent];

  buttonfunc(e);
  updateScreen();
}

function buttonEventListeners(button) {
  button.addEventListener("mousedown", styleWhileClicking);
  button.addEventListener("mouseup", styleAfterClicking);
  button.addEventListener("click", execButtonAction);
}

updateScreen();
buttons.forEach((button) => buttonEventListeners(button));
