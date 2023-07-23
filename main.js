window.onload = function () {
    const todos = getLocalTodos();
    todos.forEach(todo => {
      createTodoElement(todo);
    });
}; 

// Lấy tham chiếu tới các phần tử trên trang web bằng id
const todoInput = document.getElementById("todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.getElementById("todo-list");
const clearButton = document.querySelector(".clear-btn");

// Gắn sự kiện click cho nút "Add"
todoButton.addEventListener("click", addTodo);

// Gắn sự kiện click cho danh sách công việc
todoList.addEventListener("click", deleteCheck);
clearButton.addEventListener("click", clearAllList);


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


// Hàm xử lý sự kiện khi người dùng nhấp vào nút "Clear All List"
function clearAllList() {
    const todoItems = document.querySelectorAll(".todo");
    todoItems.forEach(todo => {
        todo.classList.add("slide");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    });
}

// Hàm tạo phần tử công việc và hiển thị nó trên trang web
function createTodoElement(todoText) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Thêm thuộc tính "draggable" cho phần tử công việc
    todoDiv.draggable = true;


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
  
function update() {
    localStorage.setItem("data",todoList.innerHTML);
}

const sortable = new Sortable(todoList, {
    animation: 150,
    onUpdate: function (event) {
        saveLocalTodos();
    },
});

