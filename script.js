let todos = new Array();

const newTodoInput = document.querySelector("#newTodo");
const todosList = document.querySelector(".todos");
const todoTemp = document.querySelector(".todo-temp");

function max(arr) {
  let maximum = 0;
  for (value of arr) {
    if (value > maximum) {
      maximum = value;
    }
  }
  return maximum;
}

newTodoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    console.log("Adding new ToDo: " + newTodoInput.value);

    let newIndex = 1;
    if (todos.length === 0) {
      todoTemp.classList.add("hide");
    } else {
      newIndex = max([todos.length, todos[todos.length - 1].index]) + 1;
    }

    const newTodo = {
      text: newTodoInput.value,
      done: false,
      num: newIndex,
    };

    todos.push(newTodo);
    // console.log(todos);

    const newTodoElement = document.createElement("div");
    newTodoElement.classList.add("todo");

    const newTodoCheckmark = document.createElement("img");
    newTodoCheckmark.src = "/images/icon-check.svg";

    const newTodoSpan = document.createElement("span");
    newTodoSpan.innerText = newTodoInput.value;

    const newTodoCross = document.createElement("img");
    newTodoCross.src = "/images/icon-cross.svg";

    newTodoElement.append(newTodoCheckmark);
    newTodoElement.append(newTodoSpan);
    newTodoElement.append(newTodoCross);

    todosList.append(newTodoElement);

    // console.dir(newTodoElement);

    newTodoInput.value = "";
  }
});

todosList.addEventListener("click", (e) => {
  // console.log(e.target);

  //check if e.target has a src (hence is an img)
  if (e.target.src) {
    //check if e.target is checkmark img
    if (e.target.src.indexOf("icon-check.svg") > 0) {
      e.target.parentElement.classList.toggle("checked");
      console.log(e.target.nextSibling.innerText + " has been un/checked");
    }
    //check if e.target is cross img
    if (e.target.src.indexOf("icon-cross.svg") > 0) {
      e.target.parentElement.remove();
      console.log(e.target.previousSibling.innerText + " has been deleted");
    }
  }
});
