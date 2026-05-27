 let todoIndex =1;
 function addTodo() {
const element = document.getElementById("todoinput")
const todo =element.value;



const todoDiv = document.createElement("div");
todoDiv.setAttribute("id", "todo" + todoIndex);
const todospan = document.createElement("span")
todospan.innerHTML = todo;
todoDiv.appendChild(todospan)

const todoButton = document.createElement("button")
todoButton.innerHTML = "delete todo"
todoButton.setAttribute("onclick","deleteTodo("+ todoIndex + ")");
todoDiv.appendChild(todoButton)
document.getElementById("todos").appendChild(todoDiv)
todoIndex = todoIndex +1;
}
function  deleteTodo( index){


const divElement = document.getElementById("todo" + index);
divElement.parentElement.removeChild(divElement);
}
    
