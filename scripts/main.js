import ToDoList from './todoList.js';

const todoList = new ToDoList();
const form = document.getElementById('task-form');
const taskListElement = document.getElementById('task-list');

form.addEventListener('submit', event => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    todoList.addTask(title, description, dueDate);
    renderTasks();
    form.reset();
});

document.getElementById('show-all').addEventListener('click', () => renderTasks());
document.getElementById('show-completed').addEventListener('click', () => renderTasks('completed'));
document.getElementById('show-incomplete').addEventListener('click', () => renderTasks('incomplete'));

function renderTasks(filter = 'all') {
    const tasks = todoList.filterTasks(filter);
    taskListElement.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
            <strong>${task.title}</strong>
            <p>${task.description}</p>
            <small>Due: ${task.dueDate}</small>
            <button data-index="${index}" class="edit">Edit</button>
            <button data-index="${index}" class="delete">Delete</button>
        `;
        taskListElement.appendChild(li);
    });
}

taskListElement.addEventListener('click', event => {
    const index = event.target.getAttribute('data-index');
    if (event.target.classList.contains('edit')) {
        // Handle edit logic
    } else if (event.target.classList.contains('delete')) {
        todoList.deleteTask(index);
        renderTasks();
    } else if (event.target.type === 'checkbox') {
        todoList.toggleTaskCompletion(index);
        renderTasks();
    }
});

renderTasks();
