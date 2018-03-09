//Book Constructor
function Book(title, author, isbn){
  this.title = title
  this.author = author
  this.isbn = isbn
}


//UI Constructor

function UI(){}

//Add Book to List

UI.prototype.addBook = function(book){
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

  UI.prototype.showAlert = function(message, className){
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


  ///Delete BOok
  UI.prototype.removeBook = function(target) {
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    } 
  }


  UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  

 


const ui = new UI()

///event listeners
document.getElementById('book-form').addEventListener("submit", function(e){
  ///Get Form Input
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  ///Create Book
        const book = new Book(title, author, isbn)
  ///Add book
        
  ///Validate
      if(title === '' || author === '' || isbn === ''){
        ///If Empty
          ui.showError('Please dont leave the form blank', 'error');
      } else {
          ///Add Book to List
          ui.addBook(book);
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
  ui.showError('Book Removed', 'error');
  e.preventDefault();
})
