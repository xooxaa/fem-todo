// select newTodo input and todos container
const newTodoInput = document.querySelector("#newTodo");
const todosList = document.querySelector(".todos");
const todosHeading = document.querySelector(".todo-heading");

//select todo counter and menu buttons
const counter = document.querySelector(".count");
const filterAll = document.querySelector(".filterAll");
const filterActive = document.querySelector(".filterActive");
const filterCompleted = document.querySelector(".filterCompleted");
const clearCompleted = document.querySelector(".clearCompleted");

//function to update the todo counter
function updateCounter() {
  //initialize counter to 0
  let count = 0;
  //loop over all existing todos
  for (let todo of todosList.children) {
    //check if its an actual todo
    if (todo.children[1]) {
      //check of it is not checked
      if (!todo.classList.contains("checked")) {
        //increase count by 1
        count++;
      }
    }
  }
  //set the counter to represent number of active todos
  if (count === 1) {
    counter.innerText = `${count} todo left`;
  } else {
    counter.innerText = `${count} todos left`;
  }
}

//function to store current todosList in local storage
function updateLocalStorage() {
  //array to hold todo objects
  let todos = [];

  //loop over all existing todos
  for (let todo of todosList.children) {
    //check if its an actual todo
    if (todo.children[1]) {
      //add object to the todos array holding todo text and checked state
      todos.push({
        todo: todo.children[1].innerText,
        checked: todo.classList.contains("checked"),
      });
    }
  }
  //safe todos into local storage using JSON stringify
  localStorage.setItem("todos", JSON.stringify(todos));
  //todos = JSON.parse(localStorage.getItem('todos')
}

//function to recall todosList from local storage
function readFromLocalStorage() {
  //array to hold todo objects
  let todos = [];

  //fill todos array from local storage using JSON parse
  todos = JSON.parse(localStorage.getItem("todos"));

  //loop over all entries of the todos array
  for (let todo of todos) {
    //create new todo container
    const newTodoElement = document.createElement("div");
    newTodoElement.classList.add("todo");
    //see if todo needs to be marked as checked
    if (todo.checked === true) {
      newTodoElement.classList.add("checked");
    }

    //create new checkmark img
    const newTodoCheckmark = document.createElement("img");
    newTodoCheckmark.src = "/images/icon-check.svg";

    //create new todo span
    const newTodoSpan = document.createElement("span");
    newTodoSpan.innerText = todo.todo;
    newTodoSpan.setAttribute("draggable", "true");

    //create new cross img
    const newTodoCross = document.createElement("img");
    newTodoCross.src = "/images/icon-cross.svg";

    //append checkmark, span and cross to todo container
    newTodoElement.append(newTodoCheckmark);
    newTodoElement.append(newTodoSpan);
    newTodoElement.append(newTodoCross);

    //append todo container to todosList
    todosList.append(newTodoElement);
  }

  updateCounter();
}

// EventListener for new todo entry
//used to handle adding new todos
newTodoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    //create new todo container
    const newTodoElement = document.createElement("div");
    newTodoElement.classList.add("todo");

    //create new checkmark img
    const newTodoCheckmark = document.createElement("img");
    newTodoCheckmark.src = "/images/icon-check.svg";

    //create new todo span
    const newTodoSpan = document.createElement("span");
    newTodoSpan.innerText = newTodoInput.value;
    newTodoSpan.setAttribute("draggable", "true");

    //create new cross img
    const newTodoCross = document.createElement("img");
    newTodoCross.src = "/images/icon-cross.svg";

    //append checkmark, span and cross to todo container
    newTodoElement.append(newTodoCheckmark);
    newTodoElement.append(newTodoSpan);
    newTodoElement.append(newTodoCross);

    //append todo container to todosList
    todosList.append(newTodoElement);

    //update Local storage
    updateLocalStorage();
    updateCounter();

    //empty input value
    newTodoInput.value = "";
  }
});

todosHeading.addEventListener("click", () => {
  newTodoInput.focus();
});

//EventListener for click on todo span
//used to handle clicks on checkmark and cross
todosList.addEventListener("click", (e) => {
  //check if e.target has a src (hence is an img)
  if (e.target.src) {
    //check if e.target is checkmark img
    if (e.target.src.indexOf("icon-check.svg") > 0) {
      e.target.parentElement.classList.toggle("checked");
      updateLocalStorage();
      updateCounter();
    }
    //check if e.target is cross img
    if (e.target.src.indexOf("icon-cross.svg") > 0) {
      e.target.parentElement.remove();
      updateLocalStorage();
      updateCounter();
    }
  }
});

//EventListener for dblclick on todo span
//used to handle editing a todo
todosList.addEventListener("dblclick", (e) => {
  //check if clicked element was span
  if (
    e.target.tagName == "SPAN" &&
    !e.target.parentElement.classList.contains("todo-heading")
  ) {
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
          newTodoSpan.setAttribute("draggable", "true");

          //add span after the input
          e.target.after(newTodoSpan);
          //remove input
          e.target.remove();

          updateLocalStorage();
          updateCounter();
        }
      })
    );

    //add input after the span
    e.target.after(newTodoInput);
    //put focus on new input
    e.target.nextSibling.focus();
    //remove span
    e.target.remove();
  }
});

filterAll.addEventListener("click", () => {
  //loop over all existing todos
  for (let todo of todosList.children) {
    //check if its an actual todo
    if (todo.children[1]) {
      todo.classList.remove("hide");
    }
  }

  //set the filterAll button as active
  filterAll.classList.add("active");
  filterActive.classList.remove("active");
  filterCompleted.classList.remove("active");
});

filterActive.addEventListener("click", () => {
  //loop over all existing todos
  for (let todo of todosList.children) {
    //check if its an actual todo
    if (todo.children[1]) {
      if (todo.classList.contains("checked")) {
        todo.classList.add("hide");
      } else {
        todo.classList.remove("hide");
      }
    }
  }

  //set the filterActive button as active
  filterAll.classList.remove("active");
  filterActive.classList.add("active");
  filterCompleted.classList.remove("active");
});

filterCompleted.addEventListener("click", () => {
  //loop over all existing todos
  for (let todo of todosList.children) {
    //check if its an actual todo
    if (todo.children[1]) {
      if (!todo.classList.contains("checked")) {
        todo.classList.add("hide");
      } else {
        todo.classList.remove("hide");
      }
    }
  }

  //set the filterCompleted button as active
  filterAll.classList.remove("active");
  filterActive.classList.remove("active");
  filterCompleted.classList.add("active");
});

clearCompleted.addEventListener("click", () => {
  //loop over all existing todos
  for (let todo of todosList.children) {
    //check if its an actual todo
    if (todo.children[1]) {
      if (todo.classList.contains("checked")) {
        todo.remove();
        updateLocalStorage();
      }
    }
  }
});

readFromLocalStorage();

const debug1 = document.querySelector(".debug1");
const debug2 = document.querySelector(".debug2");
const debug3 = document.querySelector(".debug3");
const debug4 = document.querySelector(".debug4");

//used to initiate drag and store information about the dragged element
document.addEventListener("dragstart", function (event) {
  //update target id and store id to dataTransfer
  event.target.id = "draggedElement";
  event.dataTransfer.setData("Text", event.target.id);

  debug1.innerHTML = "dragstart traget id: " + event.target.id;
});

//fires permanently and is used to identify where the dragged element is currently dragged over
document.addEventListener("dragover", function (event) {
  event.preventDefault();

  debug4.innerHTML =
    "dragover target: " +
    event.target.nodeName +
    " / " +
    event.target.innerText;
});

//used to register a change in the targeted node
document.addEventListener("dragleave", function (event) {
  // console.log(event);
});

//fired by the target area when drag ends
document.addEventListener("drop", function (event) {
  event.preventDefault();

  debug3.innerHTML =
    "drop target: " + event.target.nodeName + " / " + event.target.innerText;

  document
    .querySelector(`#${event.dataTransfer.getData("Text")}`)
    .removeAttribute("id");
});

//fired by the dragged element when drag ends
document.addEventListener("dragend", function (event) {
  console.log(event);
  event.target.removeAttribute("id");
});

// dragstart: Sobald Sie ein Element mit gedrückter Maus ziehen, wird der dragstart-Event gefeuert.
//            Er übergibt dem dataTransfer-Objekt die nötigen Informationen.
// drag: feuert, solange Sie ein Element oder eine Textauswahl ziehen.
//       Das mit event.Target ermittelte Target ist das bewegte Element.
// dragover: löst aus, wenn Sie ein Element oder eine Textauswahl auf/über ein gewünschtes Ziel gezogen haben.
//           Das mit event.Target ermittelte Target ist das Element, über dem man gerade mit dem bewegten Element schwebt.

// dragenter: löst aus, wenn Sie ein Element oder eine Textauswahl zum gewünschten Ziel gezogen haben.
// dragleave: dragleave feuert, wenn Sie ein Element oder eine Textauswahl wieder vom gewünschten Ziel wegziehen.
// drop: löst aus, wenn Sie ein Element oder eine Textauswahl abgelegt haben.
// dragend: wird ausgelöst, wenn der Ziehvorgang vorzeitig abgebrochen wird.
