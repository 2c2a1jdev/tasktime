let tasksArr = []

window.onload = function showTasksOnScreen() {

    getArrOnLocalStorage()

    let dataToShow = "";
    let checkId = ""
    let count = 0

    for(var i = 0; i<tasksArr.length; i++){
        const t = tasksArr[i]
        count = count + 1
        checkId = "check" + count.toString()
        dataToShow += `
        <div class="content">
            <input class="checkbox" type="checkbox" id="${checkId}" name="taskName" value="${t.ID}" onclick="completeTask()"/>
            <label for="${checkId}">${t.taskValue}</label>
            <button class="btn-outline">excluir</button>
        </div>  
        `
    }

    const divScreen = document.getElementById('incompleteSection')
    divScreen.innerHTML = dataToShow

}

function getArrOnLocalStorage() {
    dataText = localStorage.getItem('tasksArr')

    if(dataText == null){
        tasksArr = []
    }else{
        tasksArr = JSON.parse(dataText)
    }

    return tasksArr
}

function createNewTask(task) {
    let uid = Math.random().toString(12).slice(-5)
    task.toString()
    
    let tasks = {
        "ID": uid,
        "taskValue": task,
        "isCompleted": false
    }

    return tasks
}


function saveOnLocalStorage() {
    const task = document.getElementById('inputNewTask').value

    if(task == null || task == undefined || task === ""){
        alert("Por favor, digite uma tarefa...")
    }else{
        getArrOnLocalStorage()
        const tasksObj = createNewTask(task)
        tasksArr.push(tasksObj)
        const text = JSON.stringify(tasksArr)
        localStorage.setItem("tasksArr", text)
    }
}


function getValueOfInputChecked(inputs) {
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].checked === true) {
            const valueID = inputs[i].value
            return valueID
        }
    }
}

// TODO alterar a propriedade isComplete de uma task de false para true

function modifyStatusTask(valueIndex) {
    for(i=0; i < tasksArr.length; i++) {
        if (tasksArr[i].ID === valueIndex) {
            tasksArr[i].isCompleted = true
            console.log(tasksArr[i])
        }
    }
}

function completeTask() {
    getArrOnLocalStorage()
    const checkboxElements = document.getElementsByClassName('checkbox')
    const idTaskChecked = getValueOfInputChecked(checkboxElements)
    modifyStatusTask(idTaskChecked)
}