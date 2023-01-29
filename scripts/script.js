/* Aqui inicia a renderizção do layout inicial */
const user_habit_data = JSON.parse(localStorage.getItem("user@habits")) || {};

function saveHabits(){
    localStorage.setItem("user@habits", JSON.stringify(user_habit_data));
    console.log(nlwSetup.habits);
}

function load() {
    Object.keys(user_habit_data).forEach((key) => {
        renderLayout(key, user_habit_data[key]);
    });
}

function renderLayout(key, value) {
    let pElement = document.createElement("div");
    let pElementText = document.createTextNode(value);

    pElement.classList.add("habit");
    pElement.setAttribute("data-name", key);

    pElement.appendChild(pElementText);
    document.querySelector("#habits-container").appendChild(pElement);
}

load()
/* Aqui termina a renderização do layout inicial */



/* Aqui inicia a renderização do grid de icones para criação de um novo hábito */
const icons = [
    "⏰", "💤", "📖", "📚", "🙏", "💪", "🏋️‍♂️", "🚴‍♀️", "🏄‍♂️",
    "🏃‍♂️", "🏃‍♀️", "💃", "🕺", "🍎", "🥗", "💧", "☕", "💊", 
    "⚽", "🎼", "👨‍🔧", "👩‍🍳", "👨‍🎨", "🚗", "🏍", "✈", "😁",
    "🤣", "🥰", "🥳", "💰", "👨🏽‍🤝‍👨🏻", "💏", "👩‍❤️‍💋‍👩", "👨‍❤️‍💋‍👨", "👪",
    "😈", "👽", "🌼", "🤼‍♂️", "🐕", "🐈", "🐎", "👩‍👦", "👨‍👦", 
    "❤", "🎉", "🛁", "🧻", "⛱"
];

function loadCreationBox() {
    let count = 1;
    icons.forEach((key) => {
        let idText = "i" + count;
        let pElement = document.createElement("div");

        let pElementInput = document.createElement("input");
        pElementInput.id = idText;
        pElementInput.type = "radio";
        pElementInput.name = "iconSelection";
        pElementInput.value = key;
        pElement.appendChild(pElementInput);

        let pElementLabel = document.createElement("label");
        pElementLabel.setAttribute("for", idText);
        pElementLabel.appendChild(document.createTextNode(key));
        pElement.appendChild(pElementLabel);

        document.getElementById("icons-container").appendChild(pElement);
        count++
    })
}

loadCreationBox();
/* Aqui termina a renderização do grid de icones para criação de um novo hábito */



/* Aqui iniciam os codigos relacionados a adição de novos hábitos */
function alreadyCreated(value) {
    let inputList = document.querySelectorAll(".habit");
    for(let element of inputList){
        if (element.textContent === value){
            return true;
        }
    }
    return false
}

function addElement(value) {

    let pElement = document.createElement("div");
    let pElementText = document.createTextNode(value);

    pElement.classList.add("habit");

    let habitDataName = "habit#" + (document.querySelectorAll(".habit").length + 1);
    pElement.setAttribute("data-name", habitDataName);

    pElement.appendChild(pElementText);
    document.getElementById("habits-container").appendChild(pElement);

    addData(habitDataName, value);
}

function addData(dataName, textNode){
    user_habit_data[dataName] = textNode;
    nlwSetup.addHabit(dataName);
    saveHabits();
    nlwSetup.renderLayout();
}
/* Aqui finalizam os códigos relacionados a adição de novos hábitos */


/* Renderizção dos checkbox e dias via NLWSetup */
const form = document.querySelector("#form-habits");
const nlwSetup = new NLWSetup(form);
const headerButton = document.querySelector("header button");


headerButton.addEventListener("click", addDays);
form.addEventListener("change", saveDays);

function addDays() {
    const today = new Date().toLocaleDateString("pt-BR").slice(0, -5);
    const dayExists = nlwSetup.dayExists(today);

    if(dayExists) {
        alert("Dia já incluso 🔴");
        return;
    }

    nlwSetup.addDay(today);
}

function saveDays() {
    localStorage.setItem("setup@habits", JSON.stringify(nlwSetup.data));
}

const data = JSON.parse(localStorage.getItem("setup@habits")) || {}
nlwSetup.setData(data);
nlwSetup.load();
/* Fim da renderização de dias e checkboxes via NLWSetup */



/* Inicio do eventos de botão */
let addButton = document.getElementById("add-habit-button");

const overlay = document.getElementById("overlay");
const body = document.body;
let createButton = document.getElementById("create-habit-button");
let cancelButton = document.getElementById("cancel-create-habit-button");


addButton.addEventListener("click", function(event){
    event.preventDefault();
    body.style.overflow = "hidden";
    overlay.classList.remove("hidden");
});

createButton.addEventListener("click", function(event){
    event.preventDefault();

    let checkedElem = document.querySelectorAll("input[name='iconSelection']:checked")
    if (checkedElem.length === 0){ return; }

    if (alreadyCreated(checkedElem[0].value)){
        alert("Já existe esse hábito ❌");
        return;
    }

    addElement(checkedElem[0].value);
    hideHeaderButton();
    hideAddButton();
    uncheckRadio();
    overlay.classList.add("hidden");
    body.style.overflow = "visible";
});

cancelButton.addEventListener("click", function(event){
    event.preventDefault();
    overlay.classList.add("hidden");
    uncheckRadio();
});
/* Término dos eventos de botão */



/* Alguns ajustes de visual */
function uncheckRadio() {
    let radioChecked = document.querySelectorAll("input[name='iconSelection']:checked");
    if (radioChecked.length === 0) { return }
    radioChecked[0].checked = false
}

function hideAddButton(){
    if(document.querySelectorAll(".habit").length >= 7) {
        addButton.classList.add("hidden");
    }else if (addButton.className === "hidden") {
        addButton.classList.remove("hidden");
    }
}

function hideHeaderButton() {
    if(document.querySelectorAll(".habit").length < 1) {
        headerButton.classList.add("hidden");
    }else if (headerButton.className === "hidden") {
        headerButton.classList.remove("hidden");
    }
    return;
}

hideHeaderButton();
/* Fim dos ajustes de visual */
