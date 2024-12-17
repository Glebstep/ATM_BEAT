// Глобальные переменные
let currentCard = null;
let currentLanguage = "en"; // Язык по умолчанию

// Карты и данные
const cards = {
    "4441111145678765": { password: "0000", balance: 1000 },
    "4114356447984545": { password: "0000", balance: 500 },
    "4141414141414141": { password: "0000", balance: 250 },
};

// Тексты для перевода
const translations = {
    en: {
        welcome: "Welcome to the best ATM ever",
        insertCard: "Insert Card for continuing operation",
        menu: "Menu",
        balance: "Your balance is: ",
        invalidCard: "Invalid card number or password",
        insufficientFunds: "Insufficient funds!",
        invalidAmount: "Invalid amount!",
        enterCard: "Enter Card Details",
        checkBalance: "Check Balance",
        withdrawMoney: "Withdraw Money",
        depositMoney: "Deposit Money",
        backToMenu: "Back to Menu",
        withdrawSuccess: "Withdraw successful!",
        depositSuccess: "Deposit successful!",
    },
    ru: {
        welcome: "Добро пожаловать в лучший банкомат",
        insertCard: "Вставьте карту для продолжения",
        menu: "Меню",
        balance: "Ваш баланс: ",
        invalidCard: "Неправильный номер карты или пароль",
        insufficientFunds: "Недостаточно средств!",
        invalidAmount: "Неверная сумма!",
        enterCard: "Введите данные карты",
        checkBalance: "Проверить баланс",
        withdrawMoney: "Снять деньги",
        depositMoney: "Пополнить баланс",
        backToMenu: "Вернуться в меню",
        withdrawSuccess: "Снятие успешно!",
        depositSuccess: "Пополнение успешно!",
    },
    lt: {
        welcome: "Sveiki atvykę į geriausią bankomatą",
        insertCard: "Įdėkite kortelę norėdami tęsti",
        menu: "Meniu",
        balance: "Jūsų sąskaitos likutis: ",
        invalidCard: "Neteisingas kortelės numeris arba slaptažodis",
        insufficientFunds: "Nepakanka lėšų!",
        invalidAmount: "Netinkama suma!",
        enterCard: "Įveskite kortelės duomenis",
        checkBalance: "Patikrinti balansą",
        withdrawMoney: "Pasiimti pinigus",
        depositMoney: "Papildyti sąskaitą",
        backToMenu: "Grįžti į meniu",
        withdrawSuccess: "Pinigai sėkmingai atsiimti!",
        depositSuccess: "Pinigai sėkmingai papildyti!",
    },
};

// Обновление текстов на текущем экране
function updateScreenTranslations() {
    document.getElementById("welcome-text").innerText = translations[currentLanguage].welcome;
    document.getElementById("insert-card-text").innerText = translations[currentLanguage].insertCard;
    document.getElementById("card-entry-text").innerText = translations[currentLanguage].enterCard;
    document.getElementById("menu-title").innerText = translations[currentLanguage].menu;

    // Обновляем все кнопки с data-translate
    document.querySelectorAll("[data-translate]").forEach(button => {
        const key = button.getAttribute("data-translate");
        button.innerText = translations[currentLanguage][key];
    });
}

// Смена языка
function setLanguage(lang) {
    currentLanguage = lang;
    updateScreenTranslations();
}

// Показываем экран
function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => screen.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");
    updateScreenTranslations(); // Обновляем язык при смене экрана
}

// Проверка баланса
function checkBalance() {
    document.getElementById("balance-text").innerText = translations[currentLanguage].balance + cards[currentCard].balance + " EUR";
    showScreen("balance-screen");
}

// Снятие денег
function withdrawMoneyMenu() {
    showScreen("withdraw-screen");
}

function withdrawMoney() {
    const amount = parseInt(document.getElementById("withdraw-amount").value);
    if (amount > 0 && amount <= cards[currentCard].balance) {
        cards[currentCard].balance -= amount;
        alert(translations[currentLanguage].withdrawSuccess);
        showScreen("menu-screen");
    } else {
        alert(translations[currentLanguage].insufficientFunds);
    }
}

// Пополнение баланса
function depositMoneyMenu() {
    showScreen("deposit-screen");
}

function depositMoney() {
    const amount = parseInt(document.getElementById("deposit-amount").value);
    if (amount > 0) {
        cards[currentCard].balance += amount;
        alert(translations[currentLanguage].depositSuccess);
        showScreen("menu-screen");
    } else {
        alert(translations[currentLanguage].invalidAmount);
    }
}

// Валидация карты
function validateCard() {
    const cardNumber = document.getElementById("card-number").value;
    const cardPassword = document.getElementById("card-password").value;

    if (cards[cardNumber] && cards[cardNumber].password === cardPassword) {
        currentCard = cardNumber;
        showScreen("menu-screen");
    } else {
        document.getElementById("error-message").innerText = translations[currentLanguage].invalidCard;
        document.getElementById("error-message").classList.remove("hidden");
    }
}
