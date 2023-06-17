const buttons = document.querySelectorAll(".button");
let expression = "";
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let targetedValue = e.target.innerHTML;

    if (targetedValue == "=") {
      if (isValidInput(expression)) {
        expression = eval(expression);
        document.querySelector("input").value = expression;
      } else {
        let message = "Error! Please type valid input";
        displayError(message);
      }
    } else if (targetedValue == "AC") {
      expression = "";
      document.querySelector("input").value = expression;
    } else if (targetedValue == "DEL") {
      expression = expression.replace(expression[expression.length - 1], "");

      document.querySelector("input").value = expression;
    } else {
      expression = expression + e.target.innerHTML;
      document.querySelector("input").value = expression;
    }
  });
});

// function for to check if input is valid or not

function isValidInput(expression) {
  const validInputRegex = /^[\d.+\-*/()%\s]+$/;
  const consecutiveOperatorRegex = /[+\-*/]{2,}/;
  const openingParentheses = expression.match(/\(/g);
  const closingParentheses = expression.match(/\)/g);

  if (
    expression.trim() === "" ||
    !validInputRegex.test(expression) ||
    consecutiveOperatorRegex.test(expression) ||
    (openingParentheses &&
      closingParentheses &&
      openingParentheses.length !== closingParentheses.length)
  ) {
    return false;
  }

  return true;
}

// fucntion for display error........
function displayError(message) {
  const error = document.querySelector(".error");
  error.innerHTML = message;
  expression = "";
  document.querySelector("input").value = expression;
  setTimeout(() => {
    error.innerHTML = "";
  }, 1000);
}
