const API = "http://localhost:8000/contactbook";
const list = document.querySelector(".main-list");
const search = document.querySelector("#search");

// //!=======================================================search
search.addEventListener("input", (e) => getTodos(e.target.value.trim()));
//вещаем событие на Search и вызываем getTodos и передаем значение инпута
//!====================================READ====================================
//функция для стягивания данных с json-server
async function getTodos(term = "") {
  //term мы получаем значение инпута
  try {
    //получаем данные с бекка
    let res = await fetch(API);

    //отбрабатывем ответ от сервера
    let todos = await res.json();

    //филтуру ем зависимости значение инпута
    const filtred = todos.filter((todo) =>
      todo.name.toLowerCase().includes(term.toLowerCase())
    );

    //вызываем функцию для отоброжения
    render(filtred);
    // searchElem(todos);
  } catch (error) {
    console.log(error);
  }
}
//функция отоброжения
function render(todos) {
  //очищаем все что было в list  для того чтобы не было дубликатов
  list.innerHTML = "";

  //перебираем данные полученные с сервера и на каждый обькт одрисовываем элемент li
  todos.forEach((item) => {
    list.innerHTML += `
      <div class="card" style="width: 17rem; margin: 2rem;text-align: center;background: transparent;    border: 1px solid white;">
      <img src=${item.photo} class="card-img-top" style="width: 125px;
      border-radius: 50%;     margin-left: 26%;
      height: 125px; object-fit: cover;" alt="...">
      <ul class="list-group list-group-flush">
        <li class="list-group-item" style="background: transparent;
        color: white;">${item.name}</li>
        <li class="list-group-item" style="background: transparent;
        color: white;">${item.surname}</li>
        <li class="list-group-item" style="background: transparent;
        color: white;">${item.number}</li>
        <li class="list-group-item" style="background: transparent;
        color: white;">${item.email}</li>
      </ul>
      <div class="card-body">
      <button onclick="deleteTodo(${item.id})" style="    background: transparent;
      color: white;
      border: 1px solid white;
      width: 72px;">
      Delete
    </button>
 
      </div>
    </div>
       `;
  });
}
getTodos(); //для при  первой загрузке страницы

// //!=======================================================delete
async function deleteTodo(id) {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    getTodos();
  } catch (error) {
    console.log(error);
  }
}

// const users = [
//   { name: "Emir", age: 23 },
//   { name: "AbaEs", age: 13 },
//   { name: "Nurma", age: 14 },
//   { name: "Erthhan", age: 20 },
// ];
// const us = users.filter((item) => {
//   return item.name.includes("Em");
// });
// console.log(us);
