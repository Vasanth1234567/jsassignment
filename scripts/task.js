export default class Task {
    constructor(title, description = '', dueDate = '') {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = false;
    }

    toggleCompletion() {
        this.completed = !this.completed;
    }
}
