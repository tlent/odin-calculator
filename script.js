const display = document.querySelector("#display");
const clearButton = document.querySelector("#clear");
const equalsButton = document.querySelector("#equals");
const plusMinusButton = document.querySelector("#plus-minus");
const percentButton = document.querySelector("#percent");
const periodButton = document.querySelector("#period");
const digitButtons = document.querySelectorAll("button[data-digit]");
const operatorButtons = document.querySelectorAll("button[data-operation]");

let value = null;
let storedValue = null;
let operation = null;

clearButton.addEventListener("click", () => {
    if (value === null) {
        storedValue = null;
        operation = null;
    } else {
        value = null;
    }
    display.textContent = 0;
    clearButton.textContent = "AC";
    periodButton.disabled = false;
});

equalsButton.addEventListener("click", () => {
    if (!operation || storedValue === null || value === null) {
        return;
    }
    value = String(operation(storedValue, Number(value)));
    periodButton.disabled = value.includes(".");
    storedValue = null;
    display.textContent = value;
    clearButton.textContent = "C";
});

plusMinusButton.addEventListener("click", () => {
    value *= -1;
    display.textContent = value;
});

percentButton.addEventListener("click", () => {
    value /= 100;
    display.textContent = value;
    periodButton.disabled = value.includes(".");
});

periodButton.addEventListener("click", () => {
    value = (value || 0) + ".";
    display.textContent = value;
    periodButton.disabled = true;
});

for (const button of digitButtons) {
    const digit = button.textContent;
    button.addEventListener("click", () => {
        value = String(Number((value || "") + digit));
        display.textContent = value;
        clearButton.textContent = "C";
    });
}

for (const button of operatorButtons) {
    let operationFunction;
    switch (button.dataset.operation) {
        case "add":
            operationFunction = (a, b) => a + b;
            break;
        case "subtract":
            operationFunction = (a, b) => a - b;
            break;
        case "multiply":
            operationFunction = (a, b) => a * b;
            break;
        case "divide":
            operationFunction = (a, b) => a / b;
            break;
    }
    button.addEventListener("click", () => {
        operation = operationFunction;
        if (value !== null) {
            storedValue = Number(value);
            value = null;
            periodButton.disabled = false;
        }
    });
}