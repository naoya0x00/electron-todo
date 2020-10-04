const taskForm = document.getElementById("form");
const taskTable = document.getElementById("task_table") as HTMLTableElement;
const taskFormTask = document.getElementById("form_task") as HTMLInputElement;

const tasks: {[taskID:string]:Task} = {};
const taskCardTemplate = `
<td><input type="checkbox" name="cb:{{ task_id }}" onchange="changeTaskDone('{{ task_id }}')" value="1" {{ is_checked }}></td>
<td style="min-width: 200px; text-align: center;">{{ task }}</td>
<td><button onclick="delTask('{{ task_id }}')">DEL</button></td>
`;

interface Task {
    id: string;
    task: string;
    done: boolean;
}

function toggleTaskForm() {
    if (taskForm) {
        taskForm.hidden =  taskForm.hidden ? false : true;
    }
}

function saveTasks() {
    let tasksJSON = JSON.stringify(tasks).toString();
    document.cookie = tasksJSON;
}

function addTask() {
    if (!taskForm) {return;}

    let task:Task = {
        id: Math.random().toString(),
        task: taskFormTask.value,
        done: false,
    };
    tasks[task.id] = task;
    insertTaskCard(task);
    taskForm.hidden = true;
    taskFormTask.value = "";
}

function delTask(taskID:string) {
    delete tasks[taskID];
    let taskCard = document.getElementById(taskID);
    taskCard?.remove();
}

function delCheckedTask() {
    for (let taskID in tasks) {
        if (tasks[taskID].done) {
            delete tasks[taskID];
            let taskCard = document.getElementById(taskID);
            taskCard?.remove();
        }
    }
}

function changeTaskDone(taskID:string) {
    let cb = document.getElementsByName("cb:"+taskID)[0] as HTMLInputElement;
    tasks[taskID].done = cb.checked;
    console.log(tasks);
}

window.onload = () => {
    let cookieTasks = JSON.parse(document.cookie || "null") as {[taskID:string]:Task};
    for (let taskID in cookieTasks) {
        tasks[taskID] = cookieTasks[taskID];
        insertTaskCard(cookieTasks[taskID]);
    }
};

function insertTaskCard(task:Task, index:number=1): HTMLTableRowElement {
    let row = taskTable.insertRow(index);
    row.innerHTML = taskCardTemplate
        .replace("{{ task }}", task.task)
        .replace(/{{ task_id }}/g, task.id)
        .replace("{{ is_checked }}", task.done == true ? "checked" : "");
    row.id = task.id;
    return row;
}