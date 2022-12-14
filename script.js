const display = document.querySelector("#display");
const clearButton = document.querySelector("#clear");
const equalsButton = document.querySelector("#equals");
const plusMinusButton = document.querySelector("#plus-minus");
const percentButton = document.querySelector("#percent");
const periodButton = document.querySelector("#period");
const digitButtons = document.querySelectorAll("button[data-digit]");
const operatorButtons = document.querySelectorAll("button[data-operation]");

let value = 0;
let displayingResult = false;
let storedValue = null;
let storedOp = null;

for (const button of digitButtons) {
    const digit = button.textContent;
    button.addEventListener("click", () => {
        if (displayingResult) {
            value = 0;
            displayingResult = false;
        }
        value = String(Number((value || "") + digit));
        display.textContent = value;
        clearButton.textContent = "C";
    });
}

for (const button of operatorButtons) {
    let op;
    switch (button.dataset.operation) {
        case "add":
            op = (a, b) => a + b;
            break;
        case "subtract":
            op = (a, b) => a - b;
            break;
        case "multiply":
            op = (a, b) => a * b;
            break;
        case "divide":
            op = (a, b) => a / b;
            break;
    }
    button.addEventListener("click", () => {
        if (displayingResult) {
            storedValue = null;
            storedOp = null;
        }
        if (storedValue !== null && storedOp !== null) {
            value = storedOp(storedValue, Number(value));
            display.textContent = value;
        }
        storedOp = op;
        storedValue = Number(value);
        displayingResult = true;
        periodButton.disabled = false;
    });
}

equalsButton.addEventListener("click", () => {
    if (displayingResult || storedOp === null || storedValue === null) {
        return;
    }
    value = String(storedOp(storedValue, Number(value)));
    display.textContent = value;
    displayingResult = true;
    clearButton.textContent = "C";
});

clearButton.addEventListener("click", () => {
    if (displayingResult || value) {
        value = 0;
        displayingResult = false;
    } else {
        storedOp = null;
        storedValue = null;
    }
    display.textContent = 0;
    clearButton.textContent = "AC";
    periodButton.disabled = false;
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
    clearButton.textContent = "C";
});