class Book {
    constructor(bookID, bookName, bookAuthor, bookTopic, bookPublishing, bookLocation) {
        this.bookID = bookID;
        this.bookName = bookName;
        this.bookAuthor = bookAuthor;
        this.bookTopic = bookTopic;
        this.bookPublishing = bookPublishing;
        this.bookLocation = bookLocation;
    }
}

var books = [];
const key_data = "book_data";
const key_enter = 13;


function init() {
    if (getData(key_data) == null) {
        books = [
            new Book("PR-20161", "The Pragmatic Programmer", "Andy Hunt, Dave Thomas", "Program", 1999, "A-2-5"),
            new Book("PR-20187", "The Clean Coder: A Code of Conduct for Professional Programmers", "Robert Martin", "Program", 1998, "B-1-3"),
            new Book("PR-20156", "Code Complete: A Practical Handbook of Software Construction", "Steve McConnell", "Program", 1993, "C-1-6"),
            new Book("PC-20173", "How to Win Friends and Influence People", "Dale Carnegie", "Psychology", 1936, "B-3-6"),
            new Book("AS-20198", "Life of Pi", "Yann Martel", "Adventure story", 2001, "C-2-5"),
        ]
        setData(key_data, books);
    }
    else {
        books = getData(key_data);
    }
}

function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}
function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
function renderBooks(data) {
    let tableBook = document.querySelector('.table>tbody');
    let htmls = data.map(function (book, index) {
        return `
            <tr id="tr_${index}">
                <td style="text-align: center">${index + 1}</td>
                <td>${book.bookID}</td>
                <td>${book.bookName}</td>
                <td>${book.bookAuthor}</td>
                <td>${book.bookTopic}</td>
                <td style="text-align: right">${book.bookPublishing}</td>
                <td style="text-align: right">${book.bookLocation}</td>
                <td id="action_${index}" style="text-align: center">
                    <button class="btn-change" onclick="change(${index})"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-remove" onclick="remove(${index})"><i class="fa-solid fa-trash"></i></button>
                    <button class="btn-updata d-none" onclick="updata(${index})"><i class="fa-solid fa-circle-check"></i></button>
                    <button class="btn-cancel d-none" onclick="cancel(${index})"><i class="fa-solid fa-rotate-left"></i></button>
                </td>
            </tr>
        `;
    })
    tableBook.innerHTML = htmls.join("");
    setData(key_data, books);
}
// Thêm thuộc tính status:
/* <td>
    <form>
        <label for="lent_${index}"><input type="radio" id="lent_${index}" value="Lent" name="status">Lent</label>
        <label for="exist_${index}"><input type="radio" id="exist_${index}" value="Exist" name="status">Exist</label>
    </form>
</td> */

// Add book
function manager() {
    document.querySelector('.info').classList.remove('d-none');
    document.querySelector('.precept').classList.add('d-none');
}
function addBook() {
    let bookID = document.querySelector('#bookID').value;
    if (!validation(bookID)) {
        document.querySelector('#warningID').innerHTML = '<span id="warn">Please enter ID!</span>';
        document.querySelector("#bookID").focus();
        return;
    }
    let bookName = document.querySelector('#bookName').value;
    let bookAuthor = document.querySelector('#bookAuthor').value;
    let bookTopic = document.querySelector('#bookTopic').value;
    let bookPublishing = Number(document.querySelector('#bookPublishing').value);
    let bookLocation = document.querySelector('#bookLocation').value;
    let newBook = new Book(bookID, bookName, bookAuthor, bookTopic, bookPublishing, bookLocation);

    books.unshift(newBook);
    setData(key_data, books);
    renderBooks(books);
    countBooks(books);
    resetForm();
}
// Đếm tổng số sách
function countBooks(books) {
    return document.querySelector("#countBook").innerHTML = `${books.length} Books`;
}


function pressEnter(e) {
    if (e.keyCode == key_enter) {
        addBook();
    }
}

function resetForm() {
    document.querySelector('#bookID').value = "";
    document.querySelector('#bookName').value = "";
    document.querySelector('#bookAuthor').value = "";
    document.querySelector('#bookTopic').value = "";
    document.querySelector('#bookPublishing').value = "";
    document.querySelector('#bookLocation').value = "";
    document.querySelector('#warningID').innerHTML = "";
}

function validation(field) {
    return field != null && field.trim() != '';
}

// Xóa sách
function remove(index) {
    let confirmed = window.confirm("Are you definitely want to remove " + books[index].bookID + "!");
    if (confirmed) {
        books.splice(index, 1);
        setData(key_data, books);
        renderBooks(books);
    }

}

// Chỉnh sửa sách đã có trong danh mục
function change(index) {
    let tr = document.getElementById(`tr_${index}`);
    tr.children[1].innerHTML = `<input class='form-control${index}0' id="form-control0" type='text' value='${books[index].bookID}'/><i class="fa-solid fa-eraser cleared-icon" onclick="cleared(${index} ,0)"></i>`;
    tr.children[2].innerHTML = `<input class='form-control${index}1' id="form-control1" type='text' value='${books[index].bookName}'/><i class="fa-solid fa-eraser cleared-icon" onclick="cleared(${index}, 1)"></i>`;
    tr.children[3].innerHTML = `<input class='form-control${index}2' id="form-control2" type='text' value='${books[index].bookAuthor}'/><i class="fa-solid fa-eraser cleared-icon" onclick="cleared(${index} ,2)"></i>`;
    tr.children[4].innerHTML = `<input class='form-control${index}3' id="form-control3" type='text' value='${books[index].bookTopic}'/><i class="fa-solid fa-eraser cleared-icon" onclick="cleared(${index} ,3)"></i>`;
    tr.children[5].innerHTML = `<input class='form-control${index}4' id="form-control4" type='number' value='${books[index].bookPublishing}'/><i class="fa-solid fa-eraser cleared-icon" onclick="cleared(${index} ,4)"></i>`;
    tr.children[6].innerHTML = `<input class='form-control${index}5' id="form-control5" type='text' value='${books[index].bookLocation}'/><i class="fa-solid fa-eraser cleared-icon" onclick="cleared(${index} ,5)"></i>`;

    let action = tr.children[7];
    action.children[0].classList.add('d-none');
    action.children[1].classList.add('d-none');
    action.children[2].classList.remove('d-none');
    action.children[3].classList.remove('d-none');
    setData(key_data, books);
}
function cancel(index) {
    let tr = document.getElementById(`tr_${index}`);
    tr.children[1].innerHTML = books[index].bookID;
    tr.children[2].innerHTML = books[index].bookName;
    tr.children[3].innerHTML = books[index].bookAuthor;
    tr.children[4].innerHTML = books[index].bookTopic;
    tr.children[5].innerHTML = books[index].bookPublishing;
    tr.children[6].innerHTML = books[index].bookLocation;

    let action = tr.children[7];
    action.children[0].classList.remove('d-none');
    action.children[1].classList.remove('d-none');
    action.children[2].classList.add('d-none');
    action.children[3].classList.add('d-none');
}

// Cập nhật thông tin đã sửa
function updata(index) {
    let tr = document.getElementById(`tr_${index}`);
    let book = books[index];
    let newBookID = tr.children[1].children[0].value;
    let newBookName = tr.children[2].children[0].value;
    let newBookAuthor = tr.children[3].children[0].value;
    let newBookTopic = tr.children[4].children[0].value;
    let newBookPublishing = Number(tr.children[5].children[0].value);
    let newBookLocation = tr.children[6].children[0].value;
    book.bookID = newBookID;
    book.bookName = newBookName;
    book.bookAuthor = newBookAuthor;
    book.bookTopic = newBookTopic;
    book.bookPublishing = newBookPublishing;
    book.bookLocation = newBookLocation;

    setData(key_data, books);
    cancel(index);
}

function cleared(index, i) {
    return document.querySelector(`.form-control${index}${i}`).value = "";
}

// Tìm bằng ID
function searchID() {
    document.querySelector('#countBook').classList.add('d-none');
    document.querySelector('#searchID').innerHTML = `<input type="search" placeholder="Enter ID" style="width: 90px" id="keywork" oninput="fromKeyboarID(event)"><i class="fa-solid fa-arrow-rotate-left" onclick="reload()"></i>`;
}
function fromKeyboarID(e) {
    let keywork = e.target.value;
    var resultID = books.filter(function (book) {
        return book.bookID.toLowerCase().indexOf(keywork.toLowerCase()) != -1;
    })
    setData(key_data, books);
    renderBooks(resultID);
}

// // Tìm kiếm nhiều thuộc tính
function searchName() {
    document.querySelector('#countBook').classList.add('d-none');
    document.querySelector('#searchName').innerHTML = `<input type="search" placeholder="Enter Name" style="width: 380px" id="keywork" oninput="fromKeyboarName(event)"><i class="fa-solid fa-arrow-rotate-left" onclick="reload()"></i>`;
}
function fromKeyboarName(e) {
    let keywork = e.target.value;
    var resultName = books.filter(function (book) {
        return book.bookName.toLowerCase().indexOf(keywork.toLowerCase()) != -1;
    })
    setData(books);
    renderBooks(resultName);;
}


function searchAuthor() {
    document.querySelector('#countBook').classList.add('d-none');
    document.querySelector('#searchAuthor').innerHTML = `<input type="search" placeholder="Enter Author" id="keywork" oninput="fromKeyboarAuthor(event)"><i class="fa-solid fa-arrow-rotate-left" onclick="reload()"></i>`;
}
function fromKeyboarAuthor(e) {
    let keywork = e.target.value;
    var resultAuthor = books.filter(function (book) {
        return book.bookAuthor.toLowerCase().indexOf(keywork.toLowerCase()) != -1;
    })
    setData(books);
    renderBooks(resultAuthor);
}

// function searchTopic() {
//     document.querySelector('#countBook').classList.add('d-none');
//     document.querySelector('#searchTopic').innerHTML = `<input type="search" placeholder="Enter Top" id="keywork" oninput="fromKeyboarTopic(event)"><i class="fa-solid fa-arrow-rotate-left" onclick="reload()"></i>`;
// }
// function fromKeyboarTopic(e) {
//     let keywork = e.target.value;
//     var resultTopic = books.filter(function (book) {
//         return book.bookTopic.toLowerCase().indexOf(keywork.toLowerCase()) != -1;
//     })
//     setData(books);
//     renderBooks(resultTopic);   
// }

function searchLocation() {
    document.querySelector('#countBook').classList.add('d-none');
    document.querySelector('#searchLocation').innerHTML = `<input type="search" placeholder="Enter Location" id="keywork" oninput="fromKeyboarLocation(event)"><i class="fa-solid fa-arrow-rotate-left" onclick="reload()"></i>`;
}
function fromKeyboarLocation(e) {
    let keywork = e.target.value;
    let resultLocation = books.filter(function (book) {
        return book.bookLocation.toLowerCase().indexOf(keywork.toLowerCase()) != -1;
    })
    setData(books);
    renderBooks(resultLocation);
}

function sort(direction) {
    if (direction == 'asc') {
        books.sort(function (book1, book2) {
            return book2.bookPublishing - book1.bookPublishing;
        })
    }
    else {
        books.reverse();
    }
    renderBooks(books);
}

function reload() {
    return location.reload();
}
function ready() {
    init();
    renderBooks(books);
    countBooks(books);
}

ready();


// Back to top
window.onscroll = function () { scrollFunction() };
function scrollFunction() {

    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

document.getElementById('myBtn').addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});