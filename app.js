class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  ///Add Book
  addBookToList(book){
      const li = document.getElementById('book-list');
      ///Create TR Element
      const row = document.createElement('tr');
      ///Instert COL
      row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>`;
      li.appendChild(row)
  }

  ///Show Alerts
  showAlert(message, className){
        ///create Div
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        ///Get Parent
        const container = document.querySelector('.container');
        const form = document.getElementById("book-form");
        ///Insert Alert
        container.insertBefore(div, form);
    
        ///Disappear
        setTimeout(function(){
          document.querySelector('.alert').remove();
        }, 3000);
  }

  ///Remove Book
  removeBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    } 
  }

  ///Clear Fields
  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

///Store Locally
class Store {
  ///fetch Books From Storage
  static getBooks(){
    let books;
    
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  ///Display BOoks from Storage
  static displayBooks(){
    const books = Store.getBooks();

    books.forEach(function(book){
        const ui = new UI;

        ui.addBookToList(book);
    });
  }

  ///Adds book to Storage
  static addBook(book){
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  ///Remove Book from Storage
  static removeBook(isbn){
      const books = Store.getBooks();

      books.forEach(function(book, index){
        if(book.isbn === isbn){
            books.splice(index, 1);
        }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

}
///DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

const ui = new UI();



///event listeners
document.getElementById('book-form').addEventListener("submit", function(e){
  ///Get Form Input
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  ///Create Book
  const book = new Book(title, author, isbn);
        
  ///Validate
      if(title === '' || author === '' || isbn === ''){
        ///If Empty
          ui.showAlert('Please dont leave the form blank', 'error');
      } else {
          ///Add Book to List
          ui.addBookToList(book);

          ///Add Book to Storage 
          Store.addBook(book);

          ///Show Success
          ui.showAlert('Book Added', 'success');
           ///Clear Fields
          ui.clearFields();
      }



  e.preventDefault();

 
});

///Event Listener to Delete
document.getElementById('book-list').addEventListener('click', function(e){
  ui.removeBook(e.target);  
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert('Book Removed', 'error');
  e.preventDefault();
})
