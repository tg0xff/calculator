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

  switch (operator) {
    case "+":
      result = add(operand0, operand1);
      break;

    case "−":
      result = subtract(operand0, operand1);
      break;

    case "×":
      result = multiply(operand0, operand1);
      break;

    case "÷":
      result = divide(operand0, operand1);
      break;
  }

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

function clearScreen() {
  calculator_numbers = ["0"];
  isDecimalFraction = false;
}

function execButtonAction(e) {
  switch (e.target.textContent) {
    case "0":
      inputNought();
      break;

    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      inputNumber(e);
      break;

    case ".":
      inputPoint();
      break;

    case "÷":
    case "×":
    case "−":
    case "+":
      inputOperation(e);
      break;

    case "C":
      clearScreen();
      break;

    case "=":
      calculateResult();
      break;
  }
  updateScreen();
}

function buttonEventListeners(button) {
  button.addEventListener("mousedown", styleWhileClicking);
  button.addEventListener("mouseup", styleAfterClicking);
  button.addEventListener("click", execButtonAction);
}

updateScreen();
buttons.forEach((button) => buttonEventListeners(button));
