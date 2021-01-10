//Book Constructor
function Book (title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI () {}

//addBookToList function
UI.prototype.addBookToList = function(book){
  //list
  const list = document.getElementById('list-body');

  //create a new tr element
  const row = document.createElement('tr');

  //add the input values to the tr
  row.innerHTML = `
  <td> ${book.title} </td>
  <td> ${book.author} </td
  <td> ${book.isbn} </td>
  <td> <a href = "#" class = "delete">X</a></td>`

  //append row to the element
  list.appendChild(row);
}

//clearFields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

//Add an event listener to the function
document.getElementById('book-form').addEventListener('submit', function(e){
  //Input varriables
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  //Instantiate book
  const book = new Book(title, author, isbn);

  //Instantiate the UI
  const ui = new UI();

  //Add items to the UI;
  ui.addBookToList(book);

  //clear the input
  ui.clearFields(book)

  e.preventDefault();

})