let btnNumberArray = document.querySelectorAll(".numbers");
let btnSymbolsArray = document.querySelectorAll(".btnSymbols");
let screenOne = document.querySelector("#one");
let screenTwo = document.querySelector("#two");

let oneOperand = 0;
let symbols = '';
let twoOperand = 0;
let procent = 0;
let i = 0;

// Проценты
document.querySelector("#btnPercent").addEventListener("click", function(){
    if (oneOperand == 0 || symbols ==='' || screenOne.textContent === '' ) {
        console.log(procent);
        return;
    }
    if (symbols == '-') {
        screenTwo.textContent += twoOperand + "%";
        procent = oneOperand / 100;
        procent = procent * twoOperand;
        screenOne.textContent = oneOperand - procent;
    }
    if (symbols == '+') {
        screenTwo.textContent += twoOperand + "%";
        procent = oneOperand / 100;
        procent = procent * twoOperand;
        screenOne.textContent = oneOperand + procent;
    }
})

// Два 00
document.querySelector("#btnTwoZero").addEventListener("click", function(event) {
    if (screenOne.textContent === '') {
        screenOne.textContent += '0.';
        return;}
    else{screenOne.textContent += 0;}    

    // let x = Number(screenOne.textContent);
    // oneOperand = x;
})

//Точка - 0
let dotOne = true;
document.querySelector("#btnDot").addEventListener("click", addOneZero);
function addOneZero () {
        if (screenOne.textContent > 0 && dotOne === true) {
            screenOne.textContent += '.';
            dotOne = false;
        }
        if (screenOne.textContent === '') {
            screenOne.textContent += '0.';
            dotOne = false;
        }
    };

// Очистка -  AC
document.querySelector("#btnClear").addEventListener("click", clearInput);
function clearInput () {
    if (symbols == '') {
        screenOne.textContent = '';
        oneOperand = 0;
    }
    if (symbols != '') {
        screenOne.textContent = '';
        twoOperand = 0;
    }
};

// Сброс всего - Del
document.querySelector("#btnDelete").addEventListener("click", deleteUserData);
function deleteUserData () {
    oneOperand = 0;
    symbols = '';
    twoOperand = 0;
    screenOne.textContent = '';
    screenTwo.textContent = '';
};

// Ввод данных в Операнд 1
btnNumberArray.forEach(btn => {
    btn.addEventListener("click", function (event) {
        if (symbols == '' && i < 10) { 
            ++i;
            oneOperand = Number(event.target.textContent);
            if (screenOne.textContent === '' && oneOperand === 0) {
                oneOperand += '.';
                dotOne = false;
            }
            screenOne.textContent += oneOperand;
            oneOperand = Number(screenOne.textContent);
        }

        // Ввод данных в Операнд 2
        if (symbols != '' && i < 10) {
            ++i;
            twoOperand = Number(event.target.textContent);
            if (screenOne.textContent === '' && twoOperand === 0) {
                twoOperand += '.';
                dotOne = true;
            }
            screenOne.textContent += twoOperand;
            twoOperand = Number(screenOne.textContent);
        }
    })
});

// Ввод символа операции
btnSymbolsArray.forEach(btn => {
    btn.addEventListener("click", function (event) {
        dotOne = true;
        i = 0;
        if(oneOperand != 0) {
            screenTwo.textContent = screenOne.textContent;
            if (symbols == '') {
            screenOne.textContent = "";
            symbols = event.target.textContent;
            screenTwo.textContent += symbols;
            }
            else if (symbols != '') {
                screenOne.textContent = "";
                symbols = event.target.textContent;
                screenTwo.textContent = oneOperand;
                screenTwo.textContent += symbols;
            }
        }
    });
});

// Равно - Математические операции
document.querySelector("#btnEquals").addEventListener("click", calc => {
    let result = 0;
    switch (symbols) {
        case '+':
            screenTwo.textContent = oneOperand + " + " + twoOperand;
            result = oneOperand + twoOperand;
            if (result % 1) {screenOne.textContent = result.toFixed(2)}
            else {screenOne.textContent = result.toFixed()}
            break;
        case '-':
            screenTwo.textContent = oneOperand + " - " + twoOperand;
            result = oneOperand - twoOperand;
            if (result % 1) {screenOne.textContent = result.toFixed(2)}
            else {screenOne.textContent = result.toFixed()}
            break;
        case 'x':
            screenTwo.textContent = oneOperand + " x " + twoOperand;
            result = oneOperand * twoOperand;
            if (result % 1) {screenOne.textContent = result.toFixed(2)}
            else {screenOne.textContent = result.toFixed()}
            break;
        case '/':
            if ( oneOperand === 0 || twoOperand === 0 ) {
                screenTwo.textContent = "";
                screenOne.textContent = "Eror";
            }
            else {
                screenTwo.textContent = oneOperand + " / " + twoOperand;
                result = oneOperand / twoOperand;
                if (result % 1) {screenOne.textContent = result.toFixed(2)}
                else {screenOne.textContent = result.toFixed()}
            }
            break;
    }
});



