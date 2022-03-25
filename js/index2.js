console.log("welcome to shiva's library");
//function constructor
function Book(Type, Author, BookName, BookId) {
  this.Type = Type;
  this.Author = Author;
  this.BookName = BookName;
  this.BookId = BookId;
}

//constructor
//  <th scope="row">${index+1}</th>
function Display() {}

Display.prototype.showbook = function () {
  let tableBody = document.getElementById("tableBody");
  let books = localStorage.getItem("books");
  if (books == null) {
    bookobj = [];
  } else {
    bookobj = JSON.parse(books);
  }

  let html = "";
  bookobj.forEach(function(element,index){
       html+= `
       <tr>
          
           <td>${element.Author}</td>
          <td>${element.BookName}</td>
           <td>${element.BookId}</td>
           <td>${element.Type}</td>
           <td> <button type="button" class="btn btn-danger" id="deletebook" onclick ="bookdeletion(${index})">Delete</button></td>
           
       </tr>
   `
  });

  tableBody.innerHTML = html;
};

let display = new Display();
display.showbook();
function bookdeletion(index){
  let tableBody = document.getElementById("tableBody");
  let books = localStorage.getItem("books");
  if (books == null) {
    bookobj = [];
  } else {
    bookobj = JSON.parse(books);
  }

  bookobj.splice(index,1);
  localStorage.setItem("books",JSON.stringify(bookobj));
  display.showbook();
}


Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

Display.prototype.show = function (type, displayMessage) {
  let message = document.getElementById("msg");
  message.innerHTML = `
                    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>Message : </strong> ${displayMessage}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                          `;

  setTimeout(function () {
    message.innerHTML = "";
  }, 2000);
};

Display.prototype.validate = function (book) {
  if (book.BookName.length < 2 || book.Author.length < 2) {
    return false;
  } else {
    return true;
  }
};

Display.prototype.add = function (book) {
  let tableBody = localStorage.getItem("tableBody");
  let books = localStorage.getItem("books");
  if (books == null) {
    bookobj = [];
  } else {
    bookobj = JSON.parse(books);
  }

  let myobj = {
    Author: book.Author,
    BookName: book.BookName,
    Type: book.Type,
    BookId: book.BookId,
  };

  bookobj.push(myobj);
  localStorage.setItem("books", JSON.stringify(bookobj));
  cnt++;
};



//add book
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);
function libraryFormSubmit(e) {
  e.preventDefault();
  let Author = document.getElementById("Author").value;
  let BookName = document.getElementById("BookName").value;
  let BookId = document.getElementById("BookId").value;
  let type;
  let Programming = document.getElementById("Programming");
  let Science = document.getElementById("Science");
  let Fiction = document.getElementById("Fiction");
  if (Programming.checked) {
    type = Programming.value;
  } else if (Science.checked) {
    type = Science.value;
  } else if (Fiction.checked) {
    type = Fiction.value;
  }

  let book = new Book(type, Author, BookName, BookId);
  let display = new Display();
  if (display.validate(book)) {
    display.add(book);
    display.showbook();
    display.clear();
    display.show("success", "Your Book has been added successfully.");
  } else {
    display.show("danger", "Sorry you can not add this book.");
  }

  console.log(book);
}
