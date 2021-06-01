//Funciones
// Funcion para añadir una nueva tarea
function adder(n) {
    container_tasks.innerHTML =
        `
        <div class="task" id="task-${n}">
            <div class="name">
                <h2 class="task-name" id="task-name-${n}">${input_name.value}</h2>
            </div>
                <div class="time-container">
                    <h2 class="time" id="task-time-${n}">Time: ${input_time.value}</h2> 
            </div>
            <div class="btn-container">
                <button class="btn btn-green" id="edit-${n}">Edit</button>
                <button class="btn btn-green" id="done-${n}">Done</button>
            </div>
            
        </div>
        <form class="form-container" id="form-task-edit-${n}" style="display:none;">
                <div class="name">
                    <input id="input_name-edit-${n}" type="text" class="task-name" placeholder="Enter task name" maxlength="50" required>
                </div>
                <div class="time-container">
                    <input id="input_time-edit-${n}" type="time" class="time" required> 
                </div>
                <div class="btn-container">
                    <input type="submit" class="btn btn-green" id="ok-edit-${n}" value="Ok">
                    <button class="btn btn-red" id="cancel-edit-${n}">Cancel</button>
                </div>
        </form>
        
        `+container_tasks.innerHTML;
}

// Funcion que crea un objeto y lo añade a la Local Storage
function setItemLocal(input_name,input_time, task_num){
    var task= {
        "name": "",
        "time": ""
    }
    task.name=input_name.value;
    task.time=input_time.value;
    tasks[`task-${task_num}`]=task;
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Funcion que realiza el addEventListener de todos los done de las tasks

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

function setEditers(i){
        editers_tasks[i]=document.querySelector(`#edit-${i+1}`);
        forms_edit_task[i]=document.querySelector(`#form-task-edit-${i+1}`);
        var task = document.querySelector(`#task-${i+1}`);
        var cancel = document.querySelector(`#cancel-edit-${i+1}`);
        var input_name_edit = document.querySelector(`#input_name-edit-${i+1}`);
        var input_time_edit = document.querySelector(`#input_time-edit-${i+1}`);
        var new_name = document.querySelector(`#task-name-${i+1}`);
        var new_time = document.querySelector(`#task-time-${i+1}`);
        console.log(forms_edit_task[i]);
        editers_tasks[i].addEventListener('click',(e)=>{
            task.style.display="none";
            forms_edit_task[i].style.display="flex";
            input_name_edit.value=new_name.innerText;
            input_time_edit.value=new_time.innerText;
        });
        forms_edit_task[i].addEventListener('submit',(e)=>{
            e.preventDefault();
            new_name.innerHTML=input_name_edit.value;
            new_time.innerHTML=input_time_edit.value;
            task.style.display="flex";
            forms_edit_task[i].style.display="none";
            console.log("paso por aqui");
            setItemLocal(input_name_edit,input_time_edit,i+1);
            container_tasks.innerHTML="";
            fillPageAndSet();
        });
        cancel.addEventListener('click', (e)=>{
            task.style.display="flex";
            forms_edit_task[i].style.display="none";
            input_name_edit.value="";
            input_time_edit.value="";
        });
}

function fillPageAndSet(){
    for(var i=1; i<cant_tasks+1;i++){
        var auxtask=`task-${i}`;
        container_tasks.innerHTML=
        `
            <div class="task" id="task-${i}">
                <div class="name">
                    <h2 class="task-name" id="task-name-${i}">${tasks[auxtask].name}</h2>
                </div>
                <div class="time-container">
                    <h2 class="time" id="task-time-${i}">Time: ${tasks[auxtask].time} </h2>
                </div>
                <div class="btn-container">
                    <button class="btn btn-green" id="edit-${i}">Edit</button>
                    <button class="btn btn-green" id="done-${i}">Done</button>
                </div>
            </div>
            <form class="form-container" id="form-task-edit-${i}" style="display:none;">
                <div class="name">
                    <input id="input_name-edit-${i}" type="text" class="task-name" placeholder="Enter task name" maxlength="50" required>
                </div>
                <div class="time-container">
                    <input id="input_time-edit-${i}" type="time" class="time" required> 
                </div>
                <div class="btn-container">
                    <input type="submit" class="btn btn-green" id="ok-edit-${i}" value="Ok">
                    <button class="btn btn-red" id="cancel-edit-${i}">Cancel</button>
                </div>
            </form>
        `+container_tasks.innerHTML;
    
    }
    for(var i=0;i<cant_tasks;i++){
        setdeleters(i);
        setEditers(i);
    }
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
const container_form = document.querySelector('.form-container');
const form = document.querySelector('#form-task');
const container_tasks= document.querySelector('#all-tasks');
const add_btn = document.querySelector('#add-btn');
const add_container = document.querySelector('#add-btn-container');
const delete_btn = document.querySelector('#delete');
const remove_all = document.querySelector('#remove-all');
var deleters_tasks = [];
var editers_tasks=[];
var forms_edit_task = [];
var input_name = document.querySelector('#input_name');
var input_time = document.querySelector('#input_time');


//Relleno de la página proveniente del Local Storage

fillPageAndSet();

//Seteo que los deleters de cada task

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
        setEditers(i);
    }
    setItemLocal(input_name, input_time, cant_tasks);   
});

//delete del form de las task

delete_btn.addEventListener('click', (e)=>{
    container_form.style.display = "none";
})

remove_all.addEventListener('click', (e)=>{
    window.localStorage.clear();
    container_tasks.innerHTML="";
    cant_tasks=0;
})
