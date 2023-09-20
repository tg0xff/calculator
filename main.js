const screen = document.getElementById("screen");
const buttons = document.querySelectorAll("button");
let backgroundColorContainer = "";
let boxShadowContainer = "";
let math_expression = ["0"];

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
  switch (operator) {
    case "+":
      return add(operand0, operand1);

    case "−":
      return subtract(operand0, operand1);

    case "×":
      return multiply(operand0, operand1);

    case "÷":
      return divide(operand0, operand1);
  }
}

function getOperatorIndex(operator0, operator1) {
  const oindex0 = math_expression.indexOf(operator0);
  const oindex1 = math_expression.indexOf(operator1);

  if (oindex0 !== -1) {
    return oindex0 < oindex1 ? oindex0 : oindex1;
  } else {
    return oindex1;
  }
}

function calculateOperation(opstr0, opstr1, keepGoing) {
  const oindex = getOperatorIndex(opstr0, opstr1);
  const operator = math_expression[oindex];
  const operand0 = math_expression[oindex - 1];
  const operand1 = math_expression[oindex + 1];

  if (operand1 && operand0) {
    math_expression.splice(
      oindex - 1,
      3,
      operate(operand0, operator, operand1),
    );
  } else {
    math_expression = [""];
    keepGoing = false;
  }

  return keepGoing;
}

function calculateResult() {
  let keepGoing = true;
  while (keepGoing) {
    if (math_expression.includes("×") || math_expression.includes("÷")) {
      keepGoing = calculateOperation("×", "÷");
    } else if (math_expression.includes("+") || math_expression.includes("−")) {
      keepGoing = calculateOperation("+", "−");
    } else {
      keepGoing = false;
    }
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
  let newContent = math_expression[math_expression.length - 1];
  newContent = newContent.slice(-12);
  screen.textContent = newContent;
}

function inputNumber(e) {
  if (math_expression[math_expression.length - 1] !== "0") {
    math_expression[math_expression.length - 1] += e.target.textContent;
  } else {
    math_expression[math_expression.length - 1] = e.target.textContent;
  }
}

function inputNought() {
  if (math_expression[math_expression.length - 1] !== "0") {
    math_expression[math_expression.length - 1] += "0";
  }
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
