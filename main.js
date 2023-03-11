let btnNumberArray = document.querySelectorAll(".numbers");
let btnSymbolsArray = document.querySelectorAll(".btnSymbols");
let screenOne = document.querySelector("#one");
let screenTwo = document.querySelector("#two");

let oneOperand = 0;
let symbols = '';
let twoOperand = 0;
let procent = 0;
let result = '';
let str = '';
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
            if(oneOperand != 0 && symbols == '' && twoOperand == 0) {
            screenTwo.textContent += screenOne.textContent;  // Переносим первое число на маленький экран 
        }
            if (symbols == '' && screenOne.textContent != '') { // Если символ не введен и есть значение на Большом экране
            screenOne.textContent = "";  // Очищаем большой экран
            symbols = event.target.textContent; // Определяем символ операции 
            screenTwo.textContent += symbols; // Добавляем это символ на маленький экран
            }
            // Смена символа после ввода первого операнда
            else if (symbols != '' && screenOne.textContent == '') {
                screenOne.textContent = "";
                symbols = event.target.textContent;
                screenTwo.textContent = oneOperand;
                screenTwo.textContent += symbols;
            }
        }
        // Поочередное сложение цифр
        if(screenTwo != '' && symbols != '' && screenOne.textContent != '') {
            if (event.target.textContent === '+') {
                oneOperand += Number(screenOne.textContent);
                screenTwo.textContent += screenOne.textContent;
                screenTwo.textContent += '+';
                str = screenTwo.textContent;
                screenOne.textContent = '';
                twoOperand = 0;
                console.log(oneOperand, twoOperand, str);
            }
        } 
    });
});

// Равно - Математические операции
document.querySelector("#btnEquals").addEventListener("click", calc => {
    if (str != '') { // Равно если поочерёдно прибавляем цифры
        oneOperand += Number(screenOne.textContent);
        str += screenOne.textContent;
        screenTwo.textContent = str;
        screenOne.textContent = oneOperand;
        console.log(oneOperand, twoOperand, str);
        str = '';
        twoOperand = 0;
    }
    if (oneOperand != 0 && symbols != '' && twoOperand != 0 && str === '') { // Равно если есть только 2 операнда
        switch (symbols) { 
        case '+':
            screenTwo.textContent = oneOperand + " + " + twoOperand;
            result = oneOperand + twoOperand;
            if (result % 1) {screenOne.textContent = result.toFixed(2)}
            else {screenOne.textContent = result.toFixed()}
            console.log(oneOperand, twoOperand, str);
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
        console.log(result)}
});



