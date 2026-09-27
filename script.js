const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const feedback = document.querySelector('#feedback');
const taskCount = document.querySelector('#task-count');

let tasks = loadTasks();

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks === null) {
        return [];
    }
    
    return JSON.parse(savedTasks);    
}


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function addTask(taskText) {
    const newTask = {
        text: taskText,
        done: false
    };

    tasks.push(newTask);
    saveTasks();
}

function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length ===0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "No tasks yet. Add one above!";
        taskList.append(emptyMessage);

        updateTaskCount();
        return;
    }

    tasks.forEach(function(task,index) {
        const listItem = document.createElement('li');

        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        if (task.done === true) {
            taskText.classList.add('completed');
        }

        const completeButton = document.createElement('button');

        if (task.done === true) {
            completeButton.textContent = 'Undo';
        } else {
            completeButton.textContent = 'Complete';
        }

        completeButton.addEventListener('click', function() {
            toggleTask(index);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', function() {
            deleteTask(index);
        });

        listItem.append(taskText);
        listItem.append(completeButton);
        listItem.append(deleteButton);


        taskList.append(listItem);
    });

    updateTaskCount();
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;

    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks = tasks.filter(function(task, taskIndex) {
        return taskIndex !== index;
    });

    saveTasks();
    renderTasks();
}

function updateTaskCount() {
    if (tasks.length === 1) {
        taskCount.textContent = '1 task';
    } else {
        taskCount.textContent= tasks.length + ' tasks';
    }
}
    
function handleFormSubmit(event) {
    event.preventDefault();
    
    const taskText = taskInput.value.trim();
        
    if (taskText === '') {
        feedback.textContent = 'Please enter a task.';
        return;
    }
        
    feedback.textContent = '';

    addTask(taskText);
    renderTasks();
        
    taskInput.value = '';
}

taskForm.addEventListener('submit', handleFormSubmit);

renderTasks();


