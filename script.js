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
const bookTable = document.querySelector("#bookTable");

if (localStorage.getItem("all_books") !== null) {
    books = JSON.parse(localStorage.getItem('all_books'));
    localStorage.clear();
    for (let i = 0; i < books.length; i++) {
        updateTable(books[i]);
    }
}

resetButton.addEventListener("click", () => {
    theForm.reset();
});

addBtn.addEventListener("click", () => {
    formWindow.style.display = "flex";
});

formWindow.addEventListener("click", e => {
    if (e.target == e.currentTarget) {
        formWindow.style.display = "none";
    }

});

addBook.addEventListener("click", (e) => {
    if ((title.value !== "") && (author.value !== "") && (pages.value !== "")) {
        let book = new Book(title.value, author.value, pages.value, readingStatus.value);
        books.push(book);
        updateTable(book);
        e.preventDefault();
        formWindow.style.display = "none";
        theForm.reset();
    }
});

function updateTable(book) {
    let tableLine = document.createElement("tr");
    bookTable.appendChild(tableLine);
    let tableTitle = document.createElement("td");
    tableTitle.textContent = book.title;
    tableTitle.classList.add("titleCell");
    tableLine.appendChild(tableTitle);
    let tableAuthor = document.createElement("td");
    tableAuthor.textContent = book.author;
    tableAuthor.classList.add("authorCell");
    tableLine.appendChild(tableAuthor);
    let tablePages = document.createElement("td");
    tablePages.textContent = book.numOfPages;
    tablePages.classList.add("pagesCell");
    tableLine.appendChild(tablePages);
    let tableReadStatus = document.createElement("td");
    tableReadStatus.classList.add("statusCell");
    tableLine.appendChild(tableReadStatus);
    let statusBtn = document.createElement("button");
    statusBtn.textContent = book.readStatus;
    statusBtn.classList.add("statusBtn");
    tableReadStatus.appendChild(statusBtn);
    statusBtn.addEventListener("click", () => {
        if (statusBtn.textContent == "Reading") {
            statusBtn.textContent = "Finished";
            book.readStatus = "Finished";
        } else
            if (statusBtn.textContent == "Finished") {
                statusBtn.textContent = "Later";
                book.readStatus = "Later";
            } else
                if (statusBtn.textContent == "Later") {
                    statusBtn.textContent = "Reading";
                    book.readStatus = "Reading";
                }
    });
    let deleteBtnH = document.createElement("td");
    deleteBtnH.classList.add("deleteCell");
    tableLine.appendChild(deleteBtnH);
    let deleteBtn = document.createElement("input");
    deleteBtn.classList.add("delete");
    deleteBtn.type = "image";
    deleteBtn.src = "imgs/trash.png";
    deleteBtnH.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", () => {
        let indexOfRemoved = books.indexOf(book);
        books.splice(indexOfRemoved, 1);
        tableLine.remove();
    });
}

window.onbeforeunload = closingCode;
function closingCode() {
    localStorage.setItem("all_books", JSON.stringify(books));
    //localStorage.clear();
    return null;
}