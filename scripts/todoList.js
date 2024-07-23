import Task from './task.js';

export default class ToDoList {
    constructor() {
        this.tasks = this.loadTasks();
    }

    addTask(title, description, dueDate) {
        const newTask = new Task(title, description, dueDate);
        this.tasks.push(newTask);
        this.saveTasks();
    }

    editTask(index, title, description, dueDate) {
        if (this.tasks[index]) {
            this.tasks[index] = new Task(title, description, dueDate);
            this.saveTasks();
        }
    }

    deleteTask(index) {
        if (this.tasks[index]) {
            this.tasks.splice(index, 1);
            this.saveTasks();
        }
    }

    toggleTaskCompletion(index) {
        if (this.tasks[index]) {
            this.tasks[index].toggleCompletion();
            this.saveTasks();
        }
    }

    filterTasks(status) {
        return this.tasks.filter(task => {
            if (status === 'completed') return task.completed;
            if (status === 'incomplete') return !task.completed;
            return true;
        });
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        return tasks ? tasks.map(task => Object.assign(new Task(), task)) : [];
    }
}
