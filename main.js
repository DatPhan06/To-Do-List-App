const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

function addTodo() {
    event.preventDefault();
    const todoText = todoInput.value.trim();

    if (todoText !== "") {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todoText;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
        saveLocalTodos(todoText);
        todoInput.value = "";
    }
}

// Hàm xử lý sự kiện khi người dùng nhấp vào danh sách công việc
function deleteCheck(e) {
    const item = e.target;
    const todo = item.parentElement;
    if (item.classList.contains("trash-btn")) {
        todo.classList.add("slide");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }
    else if (item.classList.contains("complete-btn")) {
        todo.classList.toggle("completed");
    }
}

// Hàm lưu công việc vào localStorage
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Hàm lấy danh sách công việc từ localStorage
function getLocalTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

// Hàm xóa công việc khỏi localStorage
function removeLocalTodos(todo) {
    let todos = getLocalTodos();
    const todoText = todo.querySelector(".todo-item").innerText;
    todos = todos.filter(item => item !== todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
}
