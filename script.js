let books = [];

function Book(title, author, numOfPages, readStatus) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.readStatus = readStatus;
}
Book.prototype.info = function () {
    console.log("Title: " + this.title + " Author: " + this.author + " Pages: " + this.numOfPages + " Status: " + this.readStatus);
};
const addBook = document.querySelector("#addBook");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#numOfPages");
const readingStatus = document.querySelector("#readingStatus");
const addBtn = document.querySelector("#addButton");
const formWindow = document.querySelector("#formWrapper");
const theForm = document.querySelector("#theForm");
const resetButton = document.querySelector("#resetButton");

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
        let book = new Book(title.value, author.value, pages.value, readingStatus.value);
    books.push(book);
    for (let i = 0; i < books.length; i++) {
        books[i].info();
    }
    theForm.reset();
    formWindow.style.display = "none";
    }
});
