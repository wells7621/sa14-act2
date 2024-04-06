const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskTitle = document.getElementById('taskTitle').value;
    const taskDetails = document.getElementById('taskDetails').value;

    if (taskTitle !== '') { 
        addTask(taskTitle, taskDetails);
        taskForm.reset();
    } else {
        alert('Please enter a task title.');
    }
});

function addTask(title, details) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${title}</span>
        ${details ? `<small>${details}</small>` : ''}
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
        <form style="display: none;">
            <h3>Edit Task</h3>
            <label for="editTitle">Title</label>
            <input type="text" id="editTitle" value="${title}"><br>
            <label for="editDetails">Details</label>
            <input type="text" id="editDetails" value="${details || ''}"><br>
            <button onclick="submitChanges(event)">Submit</button>
        </form>`;

    taskList.appendChild(li);
}

function editTask(button) {
    const li = button.parentElement;
    const form = li.querySelector('form');

    form.style.display = 'block';
}

function deleteTask(button) {
    const li = button.parentElement;
    taskList.removeChild(li);
}

function submitChanges(event) {
    event.preventDefault();
    
    const form = event.target.parentElement;
    const li = form.parentElement;
    const span = li.querySelector('span');
    const titleInput = form.querySelector('#editTitle');
    const detailsInput = form.querySelector('#editDetails');
    
    span.textContent = titleInput.value;
    
    const small = li.querySelector('small');
    if (detailsInput.value !== '') {
        if (small) {
            small.textContent = detailsInput.value;
        } else {
            const newSmall = document.createElement('small');
            newSmall.textContent = detailsInput.value;
            li.appendChild(newSmall);
        }
    } else if (small) {
        li.removeChild(small);
    }
    
    form.style.display = 'none';
}
