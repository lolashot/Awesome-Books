const form = document.getElementById('form');
const textInput = document.getElementById('titleInput');
const dateInput = document.getElementById('authorInput');
const msg = document.getElementById('msg');
const books = document.getElementById('books');
const add = document.getElementById('add');

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === '') {
    msg.innerHTML = 'Title cannot be blank';
  } else {
    msg.innerHTML = '';
    acceptData();
    add.click();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
  });

  localStorage.setItem('data', JSON.stringify(data));
  createBooks();
};

let createBooks = () => {
  books.innerHTML = '';
  data.map((x, y) => {
    return (books.innerHTML += `
    <div id=${y}>
          <p>${x.text}</p>
          <p>${x.date}</p>

          <div class='options'>
          <button class='' onClick ='deleteTask(this);createBooks()' class=''>Remove
          </button>
          </div>
          <hr/>
        </div>
    `);
  });

  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem('data', JSON.stringify(data));
};

let resetForm = () => {
  textInput.value = '';
  dateInput.value = '';
};

(() => {
  data = JSON.parse(localStorage.getItem('data')) || []
  console.log(data);
  createBooks();
})();
