let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  const book = new Book(title, author, pages, read);
  myLibrary.push(book);

  displayBooks();
  resetForm();
}

function displayBooks() {
  const booksContainer = document.getElementById('books-container');
  booksContainer.innerHTML = '';

  if (myLibrary.length === 0) {
    booksContainer.innerHTML = '<p class="no-books">No books to display.</p>';
    return;
  }

  const table = document.createElement('table');

  // Table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['Title', 'Author', 'Pages', 'Read', 'Actions'];

  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Table body
  const tbody = document.createElement('tbody');

  myLibrary.forEach((book, index) => {
    const bookRow = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = book.title;
    bookRow.appendChild(titleCell);

    const authorCell = document.createElement('td');
    authorCell.textContent = book.author;
    bookRow.appendChild(authorCell);

    const pagesCell = document.createElement('td');
    pagesCell.textContent = book.pages;
    bookRow.appendChild(pagesCell);

    const readCell = document.createElement('td');
    readCell.textContent = book.read ? 'Yes' : 'No';
    bookRow.appendChild(readCell);

    const actionsCell = document.createElement('td');

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.setAttribute('data-index', index);
    removeButton.addEventListener('click', removeBook);
    actionsCell.appendChild(removeButton);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Read';
    toggleButton.setAttribute('data-index', index);
    toggleButton.addEventListener('click', toggleReadStatus);
    actionsCell.appendChild(toggleButton);

    bookRow.appendChild(actionsCell);

    tbody.appendChild(bookRow);
  });

  table.appendChild(tbody);
  booksContainer.appendChild(table);
}

function removeBook(event) {
  const index = event.target.getAttribute('data-index');
  myLibrary.splice(index, 1);
  displayBooks();
}

function toggleReadStatus(event) {
  const index = event.target.getAttribute('data-index');
  const book = myLibrary[index];
  book.read = !book.read;
  displayBooks();
}

function resetForm() {
  document.getElementById('book-form').reset();
}

document.getElementById('new-book-btn').addEventListener('click', function() {
  const form = document.getElementById('new-book-form');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('book-form').addEventListener('submit', function(event) {
  event.preventDefault();
  addBookToLibrary();
});

displayBooks();
