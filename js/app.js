'use strict'

let formEl = document.getElementById('form');
let submitEl =document.getElementById('submit');
let divEl = document.getElementById('div'); 


function Books(name,price){
    this.name =name;
    this.price =price;
    this.pagesArray =[];
    Books.all.push(this);

    saveToLocalstorage();
}

Books.all =[];


let Pages = pageRandom(1,500);

Books.prototype.getPages = function(){

    for (let i=0 ; i <Books.all.length ; i++){
       
        let Pages = pageRandom(1,500);
        this.pagesArray.push(Pages);
        console.log(this.pagesArray);
    }
}

function pageRandom(min,max){
    return Math.floor(Math.random()*(max - min+1)+ min);
}

formEl.addEventListener('submit',addBookHandler);

function addBookHandler(event){
    event.preventDefault();

    const book = event.target;
   
     let name = book.name.value;
     console.log(name);
     let price = book.price.value;
     console.log(price);
     let newBook = new Books(name , price);
     newBook.getPages(1,500);

     renderTable();

}

let tHead = document.getElementById('thead');
let tBody = document.getElementById('tbody');

let headingArray = ["Book Name","Book Pages" , "Price"];

let Total = 0;
function renderTable(){

    let Pages = pageRandom(1,500);

    tHead.innerHTML="";
    tBody.innerHTML="";

    let rowHead = document.createElement("tr");
    tHead.appendChild(rowHead);

    for(let i=0 ; i<headingArray.length ; i++){

        let tdEl = document.createElement("td");
        tdEl.textContent = headingArray[i];
        rowHead.appendChild(tdEl);
        
    }

    let rowBody = document.createElement("tr");
    tBody.appendChild(rowBody);

    for(let j=0 ; j< Books.all.length ;j++){

        let tdName = document.createElement("td");
        rowBody.appendChild(tdName);
        tdName.textContent = Books.all.name;


        let tdPages= document.createElement("td");
        rowBody.appendChild(tdPages);
        tdPages.textContent = Books.all.pagesArray;


        let tdPrice = document.createElement("td");
        rowBody.appendChild(tdPrice);
        tdPrice.textContent = Books.all.price;

        
        let pTotal=document.createElement('p');
        divEl.appendChild(pTotal);
        pTotal.textContent = Pages;

    }
    Total+=Pages;
}


function saveToLocalstorage(){
    let data = JSON.stringify(Books.all);
    localStorage.setItem("Book" , data);
}

function getFromLocalstorage(){
    let stringValue = localStorage.getItem("Book");
    let normalValue = JSON.parse(stringValue);

    if(normalValue!==null){
        Books.all = normalValue;
    }
    renderTable();
}
getFromLocalstorage();


