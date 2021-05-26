//Funciones

function adder(n) {
    container_tasks.innerHTML =
        `
        <div class="task" id="task-${n}">
            <div class="name">
                <h2 class="task-name">${input_name.value}</h2>
            </div>
                <div class="time-container">
                    <h2 class="time">Time: ${input_time.value}</h2> 
            </div>
            <div class="btn-container">
                <button class="btn btn-green" id="done-${n}">Done</button>
            </div>
        </div>
        `+container_tasks.innerHTML;
}
function setItemLocal(input_name,input_time){
    var task= {
        "name": "",
        "time": ""
    }
    task.name=input_name.value;
    task.time=input_time.value;
    tasks[`task-${cant_tasks}`]=task;
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
}

function setdeleters(i){
        deleters_tasks[i]=document.querySelector(`#done-${i+1}`);
        deleters_tasks[i].addEventListener('click',(e)=>{
            delete tasks[`task-${i+1}`];
            var taskas=document.querySelector(`#task-${i+1}`);
            taskas.style.display="none";
            cant_tasks--;
            window.localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        
}

//Declaración de variables

let taskslocal = JSON.parse(window.localStorage.getItem('tasks'));
if(taskslocal!=null){
    var tasks = taskslocal;
}else{
    var tasks= {};
}
let cant_tasks = Object.keys(tasks).length;
const main = document.getElementsByTagName('main');
const container_form = document.querySelector('#form-container');
const form = document.querySelector('#form-task');
const container_tasks= document.querySelector('#all-tasks');
const add_btn = document.querySelector('#add-btn');
const add_container = document.querySelector('#add-btn-container');
const delete_btn = document.querySelector('#delete');
const remove_all = document.querySelector('#remove-all');
var deleters_tasks = [];
var input_name = document.querySelector('#input_name');
var input_time = document.querySelector('#input_time');

//Relleno de la página proveniente del Local Storage

for(var i=1; i<cant_tasks+1;i++){
    var auxtask=`task-${i}`;
    container_tasks.innerHTML=
    `
        <div class="task" id="task-${i}">
            <div class="name">
                <h2 class="task-name">${tasks[auxtask].name}</h2>
            </div>
            <div class="time-container">
                <h2 class="time">Time: ${tasks[auxtask].time} </h2>
            </div>
            <div class="btn-container">
                <input type="submit" class="btn btn-green" id="done-${i}" value="Done">
            </div>
        </div>
    `+container_tasks.innerHTML;

}

//Seteo que los deleters de cada task

for(var i=0;i<cant_tasks;i++){
    setdeleters(i);
}
add_btn.addEventListener('click', (e)=>{
    container_form.style.display = "flex";
    input_name.value="";
    input_time.value="";
});

//Submit del form de las task

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    adder(cant_tasks+1);
    cant_tasks++;
    container_form.style.display = "none";
    console.log(tasks);
    for(var i=0;i<cant_tasks;i++){
        setdeleters(i);
    }
    setItemLocal(input_name, input_time);   
});

//delete del form de las task

delete_btn.addEventListener('click', (e)=>{
    container_form.style.display = "none";
})

remove_all.addEventListener('click', (e)=>{
    window.localStorage.clear();
    container_tasks.innerHTML="";
})
