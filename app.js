// Select elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const filterInput = document.getElementById('filter-input');

// Load tasks from LocalStorage or initialize empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Save to LocalStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Render tasks
function renderTodos(list = todos) {
    todoList.innerHTML = '';
    list.forEach((todo, index) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = todo;
        li.appendChild(span);

        const btnContainer = document.createElement('div');

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => editTodo(index));
        btnContainer.appendChild(editBtn);

        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => deleteTodo(index));
        btnContainer.appendChild(delBtn);

        li.appendChild(btnContainer);
        todoList.appendChild(li);
    });
}

// Add task
addBtn.addEventListener('click', () => {
    const task = todoInput.value.trim();
    if(task) {
        todos.push(task);
        saveTodos();
        renderTodos();
        todoInput.value = '';
    }
});

// Edit task
function editTodo(index) {
    const newTask = prompt('Edit your task:', todos[index]);
    if(newTask !== null) {
        todos[index] = newTask.trim();
        saveTodos();
        renderTodos();
    }
}

// Delete task
function deleteTodo(index) {
    if(confirm('Are you sure you want to delete this task?')) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }
}

// Filter tasks
filterInput.addEventListener('input', () => {
    const query = filterInput.value.toLowerCase();
    const filtered = todos.filter(todo => todo.toLowerCase().includes(query));
    renderTodos(filtered);
});

// Initial render
renderTodos();