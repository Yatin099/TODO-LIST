document.addEventListener("DOMContentLoaded", () => {
    const storageTask = JSON.parse(localStorage.getItem("tasks"));
    if (storageTask) {
    storageTask.forEach((task) => tasks.push(task));
    updateTask();
    updateStatus();
}
})

const tasks = [];


const saveTask = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
const addTask = ()=>{
    const taskInput = document.getElementById("taskInput");


    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTask();

        updateStatus();
        saveTask();
    }





}

const toogleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    console.log({ tasks })
    updateTask();
    updateStatus();
    saveTask();
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTask();
    updateStatus();
    saveTask();
}

const editTask = (index) => {
    const editValue = document.getElementById("taskInput");

    editValue.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTask()
    updateStatus();
    saveTask();
}

const updateStatus = () => {
    const completeTask = tasks.filter(task => task.completed).length;

    const totalTask = tasks.length;
    const progress = (completeTask / totalTask) * 100;


    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;
    progressBar.style.height = "10px";
    console.log("Tasklenght=" + tasks.length);
    console.log("Completed lenght=" + completeTask)
    console.log("Toatal task="+totalTask)

    const number = document.getElementById("number").innerText = `${completeTask }/ ${totalTask}`;

    if (tasks.length && completeTask === totalTask) {
        backConfitt();
        console.log("Hello world ")
    }
}


const updateTask = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";  // Clear the task list before adding updated tasks

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <div class="taksItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./icons8-bin-50.png" onClick="deleteTask(${index})" />
    
                    <img src="./icons8-edit-50.png"  onClick="editTask(${index})" />
                </div>
            </div>
        `;

        const checkbox = listItem.querySelector(".checkbox");
        checkbox.addEventListener("change", () => {
            toogleTaskComplete(index);  // Toggle the task completion state
        });

        taskList.appendChild(listItem);
    });
};

document.getElementById("taskBtn").addEventListener('click',function(e) {
    e.preventDefault();
    addTask();

})


const backConfitt = () => {}
  var end = Date.now() + (15 * 1000);

// go Buckeyes!
var colors = ['#bb0000', '#ffffff'];

(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors
  });
  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}());
