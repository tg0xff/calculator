const buttons = document.querySelectorAll("button");
let backgroundColorContainer = "";
let boxShadowContainer = "";

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
      add(operand0, operand1);
      break;

    case "−":
      subtract(operand0, operand1);
      break;

    case "×":
      multiply(operand0, operand1);
      break;

    case "÷":
      divide(operand0, operand1);
      break;
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

function styleButtonClick(button) {
  button.addEventListener("mousedown", styleWhileClicking);
  button.addEventListener("mouseup", styleAfterClicking);
}

buttons.forEach((button) => styleButtonClick(button));
