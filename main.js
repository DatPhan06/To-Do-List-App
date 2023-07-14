// Chờ cho trang web được tải hoàn toàn trước khi gọi hàm
window.onload = function () {
    const todos = getLocalTodos();
    todos.forEach(todo => {
        createTodoElement(todo);
    });
};

// Lấy tham chiếu tới các phần tử trên trang web
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");


// Gắn sự kiện click cho nút "Add"
todoButton.addEventListener("click", addTodo);

// Gắn sự kiện click cho danh sách công việc
todoList.addEventListener("click", deleteCheck);


// Hàm xử lý sự kiện khi người dùng nhấp vào nút "Add"
function addTodo() {
    event.preventDefault();
    const todoText = todoInput.value.trim();

    if (todoText == "") {
        alert('Please enter a task!');
    } else {
        // Tạo phần tử công việc và hiển thị nó trên trang web
        createTodoElement(todoText);
        // Lưu công việc vào localStorage
        saveLocalTodos(todoText);
        // Xóa nội dung trong input
        todoInput.value = "";
    }
}

// Hàm tạo phần tử công việc và hiển thị nó trên trang web
function createTodoElement(todoText) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const upButton = document.createElement("button");
    upButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    upButton.classList.add("up-btn");
    todoDiv.appendChild(upButton);

    const downButton = document.createElement("button");
    downButton.innerHTML = '<i class="fas fa-chevron-down"></i>';
    downButton.classList.add("down-btn");
    todoDiv.appendChild(downButton);

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

    // Thêm phần tử công việc vào danh sách công việc
    todoList.appendChild(todoDiv);
}

// Hàm xử lý sự kiện khi người dùng nhấp vào nút 
function deleteCheck(e) {
    const item = e.target;
    const todo = item.parentElement;
    if (item.classList.contains("trash-btn")) {
        // Thêm hiệu ứng "slide" trước khi xóa công việc
        todo.classList.add("slide");
        // Xóa công việc khỏi localStorage
        removeLocalTodos(todo);
        // Chờ cho hiệu ứng "slide" hoàn thành rồi mới xóa phần tử công việc
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    } else if (item.classList.contains("complete-btn")) {
        // Chuyển đổi trạng thái hoàn thành của công việc
        todo.classList.toggle("completed");
    } else if (item.classList.contains("up-btn")) {
        const previousTodo = todo.previousElementSibling;
        if (previousTodo) {
            todoList.insertBefore(todo, previousTodo);
        }
    } else if (item.classList.contains("down-btn")) {
        const nextTodo = todo.nextElementSibling;
        if (nextTodo) {
            todoList.insertBefore(nextTodo, todo);
        }
    }
}


// Hàm lưu công việc vào localStorage
function saveLocalTodos(todo) {
    let todos = getLocalTodos();
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

