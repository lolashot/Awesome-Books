let form = document.getElementById("form");
let textInput = document.getElementById("titleInput");
let dateInput = document.getElementById("authorInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let books = document.getElementById("books");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Title cannot be blank";
  } else {
    msg.innerHTML = "";
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

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createBooks();
};

let createBooks = () => {
  books.innerHTML = "";
  data.map((x, y) => {
    return (books.innerHTML += `
    <div id=${y}>
          <p>${x.text}</p>
          <p>${x.date}</p>

          <div class="options">
          <button class="" onClick ="deleteTask(this);createBooks()" class="">Remove
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
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createBooks();
})();
