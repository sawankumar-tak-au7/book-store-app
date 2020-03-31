class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI {
    addBookToList(book) {
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
    showAlert(msg, classname) {

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

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove()
        }
    }
    clearFileds() {
        let title = document.getElementById('title').value = ""

        let author = document.getElementById('author').value = ""

        let isbn = document.getElementById('isbn').value = ""
    }

}
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books;
    }
    static displayBook() {
        const books = Store.getBooks()
        books.forEach(function (book) {
            const ui = new UI()
            ui.addBookToList(book)
        })

    }
    static deleteBook(isbn) {
        const books = Store.getBooks()
        books.forEach(function (book, index) {
            if (book.isbn == isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books))

    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book)

        localStorage.setItem('books', JSON.stringify(books))
    }
}


document.addEventListener("DOMContentLoaded", Store.displayBook())

document.getElementById("book-form").addEventListener("submit", function (e) {
    e.preventDefault();
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
        Store.addBook(book)
        ui.addBookToList(book)
        ui.showAlert("book Adede sucesfuly", "success")
        ui.clearFileds()
    }
})

// event lisnter to delete
document.getElementById("book-list").addEventListener("click", function (e) {
    const ui = new UI();
    ui.deleteBook(e.target)

    Store.deleteBook(e.target.parentElement.previousElementSibling.textContent)
    ui.showAlert("Book Removed succesfully", "success")
    e.preventDefault()
})