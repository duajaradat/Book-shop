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
     console.log("render");

}



let headingArray = ["Book Name","Book Pages" , "Price"];

let Total = 0;

function renderTable(){

    let Pages = pageRandom(1,500);

    document.querySelector('thead').innerHTML="";
    document.querySelector('tbody').innerHTML="";

    let tHead = document.getElementById('thead');
   

    let rowHead = document.createElement("tr");
    tHead.appendChild(rowHead);

    for(let i=0 ; i<headingArray.length ; i++){

        let tdEl = document.createElement("td");
        tdEl.textContent = headingArray[i];
        rowHead.appendChild(tdEl);
        
    }

    let tBody = document.getElementById('tbody');
    let rowBody = document.createElement("tr");
    tBody.appendChild(rowBody);

    for(let j=0 ; j< Books.all.length ;j++){

        let tdName = document.createElement("td");
        tdName.textContent = Books.all[j].name;
        rowBody.appendChild(tdName);


        let tdPages= document.createElement("td");
        tdPages.textContent = Books.all[j].pagesArray;
        rowBody.appendChild(tdPages);


        let tdPrice = document.createElement("td");
        tdPrice.textContent = Books.all[j].price;
        rowBody.appendChild(tdPrice);

    
        Total+=Pages;

    }


     let pTotal = document.createElement('p')
     divEl.appendChild(pTotal);
     pTotal.textContent = `Total ${Total}`

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


