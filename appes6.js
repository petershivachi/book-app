class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    //list
  const list = document.getElementById('list-body');

  //create a new tr element
  const row = document.createElement('tr');

  //add the input values to the tr
  row.innerHTML = `
  <td> ${book.title} </td>
  <td> ${book.author} </td
  <td> ${book.isbn} </td>
  <td> <a href="#" class="delete">X</a></td>`

  //append row to the element
  list.appendChild(row);
  }

  clearFields() {
   document.getElementById('title').value = '';
   document.getElementById('author').value = '';
   document.getElementById('isbn').value = '';
  }

  showAlert(message, className) {
    //create a div
  const div = document.createElement('div');

  //add a className
  div.className = `alert ${className}`;

  //create a textnode
  div.appendChild(document.createTextNode(message));

  //Get parent element
  const container = document.querySelector('.container');

  const form = document.querySelector('#book-form');

  //insert div
  container.insertBefore(div, form)

  //setTimeout
  setTimeout(function () {
    document.querySelector('.alert').remove()
  }, 3000)
  }

  deleteBook(target) {
    if (target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }
}

//Persist Book to Local Storage
class Store {
  static getBooks(){
    let books;
    if (localStorage.getItem('books') === null){
      books = [];
    }else {
      books = JSON.parse(localStorage.getItem('books'))
    }

    return books
  }

  static displayBooks(){
    const books = Store.getBooks();

    books.forEach(function(book){
      //Instantiate UI
      const ui = new UI;

       //Add items to the UI;
      ui.addBookToList(book);

    })

  }

  static addBook(book){
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(isbn){
    const books = Store.getBooks();

    books.forEach(function(book, index){
      if (book.isbn === isbn){
        books.slice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));

  }
}


//Load events to the UI listener
document.addEventListener('DOMContentLoaded', Store.displayBooks);

document.getElementById('book-form').addEventListener('submit', function(e){
  //Input varriables
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  //Instantiate book
  const book = new Book(title, author, isbn);

  //Instantiate the UI
  const ui = new UI();

  if ( title === '' || author === '' || isbn === ''){
    //show an error alert
    ui.showAlert('Please make sure to fill in all fields', 'danger')
  }else {
    //Add items to the UI;
  ui.addBookToList(book);

  //persist book to local storage
  Store.addBook(book);

  //show success alert
  ui.showAlert('Book added to the list succesfully', 'success')

  //clear the input
  ui.clearFields(book);
  }

  e.preventDefault();

})

//Remove book from the list
document.getElementById('list-body').addEventListener('click', function(e){
  
  //Instantiate the UI
  const ui = new UI;

  //deleteBook
  ui.deleteBook(e.target);

  //deleteBook from local storage
 Store.removeBook(e.target.parentElement.previousElementSibling.
    textContent);

  //showAlert
  ui.showAlert('Book Deleted', 'success');

  e.preventDefault() 
})