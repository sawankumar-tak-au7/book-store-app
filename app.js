
// Store Book Info
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI() { }
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');

    const row = document.createElement("tr")

    row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="delete">X</a></td>
                        `
    list.appendChild(row)
}

// clear filed
UI.prototype.clearFileds = function () {
    let title = document.getElementById('title').value = ""

    let author = document.getElementById('author').value = ""

    let isbn = document.getElementById('isbn').value = ""
}

UI.prototype.showAlert = function (msg, classname) {
    const div = document.createElement("div");

    div.className = `alert ${classname}`;
    div.appendChild(document.createTextNode(msg))

    const container = document.querySelector(".container")

    const form = document.querySelector("#book-form")

    container.insertBefore(div, form)
    setTimeout(function () {
        document.querySelector(".alert").remove()
    }, 3000)
}
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove()
    }
}

// Event Listener
document.getElementById("book-form").addEventListener("submit", function (e) {
    let title = document.getElementById('title').value

    let author = document.getElementById('author').value

    let isbn = document.getElementById('isbn').value


    const book = new Book(title, author, isbn)

    const ui = new UI()

    // vlidate
    if (title === "" || author === "" || isbn === "") {

        ui.showAlert("plz fill details", "error")
    }
    else {
        ui.addBookToList(book)
        ui.showAlert("book Adede sucesfuly", "success")
        ui.clearFileds()
    }
    e.preventDefault();
})

// event lisnter to delete
document.getElementById("book-list").addEventListener("click", function (e) {
    const ui = new UI();
    ui.deleteBook(e.target)
    ui.showAlert("Book Removed succesfully", "success")
    e.preventDefault()
})