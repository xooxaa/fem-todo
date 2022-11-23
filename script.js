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

<<<<<<< HEAD
//event listener for dblclick on todo span
todosList.addEventListener("dblclick", (e) => {
  //check if clicked element was span
  if (e.target.tagName == "SPAN") {
    //create new input to replace span
    const newTodoInput = document.createElement("input");
    //set value of new input to match span text
    newTodoInput.value = e.target.innerText;

    //add event listeners fro leaving the input
    ["blur", "keypress"].forEach((evt) =>
      newTodoInput.addEventListener(evt, (e) => {
        //check if no key was pressed (blur) or Enter was pressed
        if (!e.key || e.key === "Enter") {
          //create new span to replace input
          const newTodoSpan = document.createElement("span");
          //set innerText of new span to match input value
          newTodoSpan.innerText = e.target.value;

          //add span after the input
          e.target.after(newTodoSpan);
          //remove input
          e.target.remove();
        }
      })
    );

    //add input after the span
    e.target.after(newTodoInput);
    //put focus on new input
    e.target.nextSibling.focus();
    //remove span
    e.target.remove();
=======
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
>>>>>>> ebaa72356dddbe49d0e4563cbe0824cff8b74aa8
  }
});
