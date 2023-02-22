//!===========================================================================================
const API = "  http://localhost:8000/contactbook";
const inputAll = document.querySelectorAll(".input-class");
const btnAdd = document.querySelector(".btnAdd");
const homeBtn = document.getElementById("path-home");

const newObj = {};

function focusOutFunction(e) {
  if (e.value.length > 0) {
    let nameLabel = document.querySelectorAll("#name-label");
    nameLabel.forEach((item) => {
      item.style.top = "-19px";
      item.style.left = "-19px";
    });
  }
}

//!============================вешаю слушатель событий всем инпутам============================
inputAll.forEach((item) => {
  item.addEventListener("input", (e) => {
    newObj[e.target.name] = e.target.value;
  });
});

//!=====================================функция добавления============================
async function addTodo() {
  //обарачиваем в try catch для отлавливания ошибок
  try {
    //отправляем POST запрос в который поместили обьект
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newObj), //тело запроса конкретно то что отправляется
    });
  } catch (error) {
    console.log(error);
  }

  //очищаем инпут

  inputAll.forEach((input) => (input.value = ""));
  homeBtn.click();
  //вызыаем функцию для отоброжения актуальных данных после добавления
  // getTodos();
}
//!==================навешиваем слушатель событий на кнопку добавления==================

btnAdd.addEventListener("click", addTodo);
