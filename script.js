let books = [];

function Book(title, author, numOfPages, readStatus, bookID) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.readStatus = readStatus;
    this.bookID = bookID;
}
Book.prototype.info = function () {
    console.log("Title: " + this.title + " Author: " + this.author + " Pages: " + this.numOfPages + " Status: " + this.readStatus + " ID: " + this.bookID);
};

let IDcounter = 0;
const addBook = document.querySelector("#addBook");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#numOfPages");
const readingStatus = document.querySelector("#readingStatus");
const addBtn = document.querySelector("#addButton");
const formWindow = document.querySelector("#formWrapper");
const theForm = document.querySelector("#theForm");
const resetButton = document.querySelector("#resetButton");
const bookTable = document.querySelector("#bookTable");

resetButton.addEventListener("click",()=>{
    theForm.reset();
});

addBtn.addEventListener("click",() => {
    formWindow.style.display = "flex";
});

formWindow.addEventListener("click", e => {
    if(e.target == e.currentTarget){
        formWindow.style.display = "none";
    }
    
});

addBook.addEventListener("click", () => {
    if((title.value !== "") && (author.value !== "") && (pages.value !== "")){
        let book = new Book(title.value, author.value, pages.value, readingStatus.value, IDcounter++);
    books.push(book);
    updateTable(book);
    for (let i = 0; i < books.length; i++) {
        books[i].info();
    }
    theForm.reset();
    }
});

function updateTable(book){
    let tableLine = document.createElement("tr");
    bookTable.appendChild(tableLine);
    let tableTitle = document.createElement("td");
    tableTitle.textContent = book.title;
    tableLine.appendChild(tableTitle);
    let tableAuthor = document.createElement("td");
    tableAuthor.textContent = book.author;
    tableLine.appendChild(tableAuthor);
    let tablePages = document.createElement("td");
    tablePages.textContent = book.numOfPages;
    tableLine.appendChild(tablePages);
    let tableReadStatus = document.createElement("td");
    tableReadStatus.textContent = book.readStatus;
    tableLine.appendChild(tableReadStatus);
}