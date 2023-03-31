console.log("Project Kalkulator dengan JavaScript!");

// create the object calc to holds numeric values and others
const calculator = {
    displayNumber: "0",
    operator: null,
    firstNumber: null,
    waitingSecondNumber: false,
};

// function for update numbers
function updateNumbers() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

// function for button clear
function deleteCalc() {
    calculator.displayNumber = "0";
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingSecondNumber = false;
}

// function for input numbers
function inputNumbers(digit) {
    if (calculator.displayNumber === "0") {
        calculator.displayNumber = digit;
    }else{
        calculator.displayNumber += digit;
    }
}

// create button click events
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener("click", function (event) {
        function inverseNumber() {
            if (calculator.displayNumber === "0") {
            return;
            }
            calculator.displayNumber = calculator.displayNumber * -1;
        }

        function handleOperator(operator) {
        if (!calculator.waitingSecondNumber) {
            calculator.operator = operator;
            calculator.waitingSecondNumber = true;
            calculator.firstNumber = calculator.displayNumber;
            calculator.displayNumber = "0";
        }else{
            alert("Operator already set!");
        }
        }

        function performCalculation() {
            if (calculator.firstNumber == null || calculator.operator == null) {
                alert("uppps! please set the operator firstly");
                return;
            }

            let result = 0;
            if (calculator.operator === "+") {
                result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
            }else{
                result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
            }

            calculator.displayNumber = result;
        }

        // get the clicked object element
        const target = event.target;

        // target is button CE
        if (target.classList.contains("clear")) {
            deleteCalc();
            updateNumbers();
            return;
        }

        // target is button negative
        if (target.classList.contains("negative")) {
            inverseNumber();
            updateNumbers();
            return;
        }

        // target is button equals
        if (target.classList.contains("equals")) {
            performCalculation();
            updateNumbers();
            return;
        }

        // target is button operator
        if (target.classList.contains("operator")) {
            handleOperator(target.innerText);
            return;
        }

        inputNumbers(target.innerText);
        updateNumbers();
  });
};