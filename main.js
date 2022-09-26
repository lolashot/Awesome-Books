const form = document.getElementById('form');
const textInput = document.getElementById('titleInput');
const dateInput = document.getElementById('authorInput');
const msg = document.getElementById('msg');
const books = document.getElementById('books');
const add = document.getElementById('add');

let data = [{}];

const resetForm = () => {
  textInput.value = '';
  dateInput.value = '';
};

const createBooks = () => {
  books.innerHTML = '';
  data.forEach((x, y) => {
    (books.innerHTML += `
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

const acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
  });

  localStorage.setItem('data', JSON.stringify(data));
  createBooks();
};

const formValidation = () => {
  if (textInput.value === '') {
    msg.innerHTML = 'Title cannot be blank';
  } else {
    msg.innerHTML = '';
    acceptData();
    add.click();
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formValidation();
});

const deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem('data', JSON.stringify(data));
};

(() => {
  data = JSON.parse(localStorage.getItem('data')) || [];
  createBooks();
  deleteTask({});
})();

