// select newTodo input and todos container
const newTodoInput = document.querySelector("#newTodo");
const todosList = document.querySelector(".todos");

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

    //create new cross img
    const newTodoCross = document.createElement("img");
    newTodoCross.src = "/images/icon-cross.svg";

    //append checkmark, span and cross to todo container
    newTodoElement.append(newTodoCheckmark);
    newTodoElement.append(newTodoSpan);
    newTodoElement.append(newTodoCross);

    //append todo container to todosList
    todosList.append(newTodoElement);

    //empty input value
    newTodoInput.value = "";
  }
});

//EventListener for click on todo span
//used to handle clicks on checkmark and cross
todosList.addEventListener("click", (e) => {
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

//EventListener for dblclick on todo span
//used to handle editing a todo
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
  }
});
