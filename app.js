import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://realtime-database-27878-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const taskList = ref(database, "items");

const inputField = document.getElementById("input-field");
const dateField = document.getElementById("date-field")
const timeField = document.getElementById("time-field");
const button = document.getElementById("add");
const postItems = document.getElementById("task-list");

button.addEventListener("click", function(){
    let inputValue = inputField.value;
    let dateValue = dateField.value;
    let timeValue = timeField.value;
    let all = inputValue + " | " + dateValue + " | " + timeValue;
    push(taskList, all);
    clearInputValue();

});

onValue(taskList, function(snapshot) {
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val());
        clearShoppingItems();
        for(let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i];
            addToList(currentItem);
        }
    }
    else {
        postItems.innerHTML = "";
    }
})

function clearInputValue(){
    inputField.value = "";
    dateField.value = "";
    timeField.value = "";
}

function clearShoppingItems(){
    postItems.innerHTML = "";
}

function addToList(item){
    let itemID = item[0];
    let itemValue = item[1];
    let newElement = document.createElement("li");
    newElement.textContent = itemValue;

    newElement.addEventListener("dblclick", function(){
        let locationOfItem = ref(database, `items/${itemID}`);
        remove(locationOfItem);
    });

    postItems.append(newElement);
}
