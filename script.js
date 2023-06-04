const listItem=
    localStorage.getItem('tasks')? 
    JSON.parse(localStorage.getItem('tasks')):[];


document.getElementById('add').addEventListener('click',(e)=>{
    const taskName=document.getElementById('task-Name').value;
    const prior = document.getElementById('prio').value;
    createItem(taskName,prior);
})  
function createItem(taskName,prio){
    const task={
        taskName:taskName,
        Priority:prio,
    }
    listItem.push(task);
    localStorage.setItem('tasks', JSON.stringify(listItem));
    location.reload();
}
function displayItemToPage(){
    let task='';
    for(let i=0 ; i< listItem.length ; i++){
            task+=`
        <div class="task-content">
                <span>${i+1}</span>
            <input type="text" class='task-name' disabled='true' value="${listItem[i].taskName}"  >
            <input type="number" class='Priority'  disabled='true' value=${listItem[i].Priority} >
            <span class="update">
                <button class="save">Save</button>
                <button class="cancle">cancle</button>
            </span>
            <span class="action">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </span>
            </div>
        `
    }
    document.querySelector('.todo-body').innerHTML+=task;
    deleteTask();
    editTask();
    activateSaveBtn();
    activateCancleBtn();
    sortTasks();
    
}
function deleteTask (){
    const deleteBtn=document.querySelectorAll('.delete');
    deleteBtn.forEach((element,i) => {
        element.addEventListener('click',()=>{
            deletItem(i);
        })
    });
}
function deletItem (index){
    listItem.splice(index,1);
    //console.log(listItem.splice(index,1))
    localStorage.setItem('tasks', JSON.stringify(listItem));
    location.reload();
}
function editTask (){
    const editBtn=document.querySelectorAll('.edit');
    const updateDiv=document.querySelectorAll('.update');
    const taskNameInput= document.querySelectorAll('.task-name')
    const priorityInput= document.querySelectorAll('.Priority')
    editBtn.forEach((element,i)=>{
        element.addEventListener('click',(e)=>{
            updateDiv[i].style.display='inline-block';
            taskNameInput[i].disabled=false;
            priorityInput[i].disabled=false;
        })
    });
}
function activateSaveBtn(){
    const saveBtn=document.querySelectorAll('.save');
    const taskNameInput= document.querySelectorAll('.task-name');
    const priorityInput= document.querySelectorAll('.Priority');
    saveBtn.forEach((element,i)=>{
        element.addEventListener('click',()=>{
            updateTask(taskNameInput[i].value,priorityInput[i].value,i);
        })
    })
}
function updateTask(taskName,priority,index){
    listItem[index].taskName=taskName;
    listItem[index].Priority=priority;
    localStorage.setItem('tasks',JSON.stringify(listItem));
    location.reload();
}
function activateCancleBtn () {
    const cancleBtn=document.querySelectorAll('.cancle')
    const updateDiv=document.querySelectorAll('.update');
    const taskNameInput= document.querySelectorAll('.task-name')
    const priorityInput= document.querySelectorAll('.Priority')
    cancleBtn.forEach((element,i)=>{
        element.addEventListener('click',()=>{
            updateDiv[i].style.display='none';
            taskNameInput[i].disabled=true;
            priorityInput[i].disabled=true;

        })
    })           
}
function sortTasks (){
    const sortPriority=document.getElementById('Priority-item');
    sortPriority.addEventListener('click',(e)=>{
    const sortedList=listItem.sort((firstItem, secondItem) => firstItem.Priority - secondItem.Priority);
    localStorage.setItem('tasks',JSON.stringify(sortedList));

    location.reload();


    })
}

window.onload = function(){
    displayItemToPage();
}

