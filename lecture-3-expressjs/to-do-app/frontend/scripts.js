document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    const apiUrl = 'http://localhost:8080/tasks';

    const fetchTasks = async () => {
        const response = await fetch(apiUrl);
        const tasks = await response.json();
        renderTasks(tasks);
    };

    const renderTasks = (tasks) => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.dataset.id = task.id;
            li.innerHTML = `
                <span>${task.text}</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            `;
            taskList.appendChild(li);
        });
    };

    const createTask = async (text) => {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, myCustomProperty: 'Hello my dear server' })
        });
        const newTask = await response.json();
        fetchTasks();
    };

    const editTask = async (id, text) => {
        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        fetchTasks();
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (text) {
            createTask(text);
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        const id = e.target.parentElement.dataset.id;
        if (e.target.classList.contains('edit')) {
            const newText = prompt('Edit task:', e.target.previousElementSibling.textContent);
            if (newText !== null) {
                editTask(id, newText);
            }
        } else if (e.target.classList.contains('delete')) {
            if (confirm('Are you sure you want to delete this task?')) {
                deleteTask(id);
            }
        }
    });

    fetchTasks();
});
