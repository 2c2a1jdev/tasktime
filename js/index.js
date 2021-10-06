// Declaração de lista para armazenar as tasks 
let tasksArr = []

// Lê os valores do localstorage, valida e mostra na tela
window.onload = function showTasksOnScreen() {
    getArrOnLocalStorage()

    let dataToShowIfIncomplete = ""
    let dataToShowIfComplete = ""
    let checkId = ""
    let count = 0

    for(var i = 0; i<tasksArr.length; i++){
        const t = tasksArr[i]
        count = count + 1
        checkId = "check" + count.toString()

        if (t.isCompleted === false) {
            dataToShowIfIncomplete += `
            <div class="content">
                <input class="checkbox" type="checkbox" id="${checkId}" name="taskName" value="${t.ID}" onclick="completeTask()"/>
                <label for="${checkId}">${t.taskValue}</label>
                <button class="btn-outline">excluir</button>
            </div>  
            `
        }

        if (t.isCompleted === true) {
            dataToShowIfComplete += `
            <div class="content">
                <p>${t.taskValue}</p>
                <p class="span">50 minutos</p>
            </div>
            `
        }
    }

    const divScreenIncomplete = document.getElementById('incompleteSection')
    const divScreenComplete = document.getElementById('completeSection')
    divScreenIncomplete.innerHTML = dataToShowIfIncomplete
    divScreenComplete.innerHTML = dataToShowIfComplete

}

// Resgata os valores salvos no localstorage
function getArrOnLocalStorage() {
    dataText = localStorage.getItem('tasksArr')

    if(dataText == null){
        tasksArr = []
    }else{
        tasksArr = JSON.parse(dataText)
    }

    return tasksArr
}

// Fabrica de criar tasks 
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

// Resgata o valor do input do user e salva no localstorage 
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

// Resgata qual a tarefa que o user completou
function getValueOfInputChecked(inputs) {
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].checked === true) {
            const valueID = inputs[i].value
            return valueID
        }
    }
}

// Altera a propriedade isComplete de uma task de false para true
function modifyStatusTask(valueIndex) {
    for(i=0; i < tasksArr.length; i++) {
        if (tasksArr[i].ID === valueIndex) {
            const y = tasksArr[i]
            y.isCompleted = true
            localStorage.clear()
            const text = JSON.stringify(tasksArr)
            localStorage.setItem("tasksArr", text)
            location.reload()
        }
    }
}

// Evento do user que completa a task 
function completeTask() {
    getArrOnLocalStorage()
    const checkboxElements = document.getElementsByClassName('checkbox')
    const idTaskChecked = getValueOfInputChecked(checkboxElements)
    modifyStatusTask(idTaskChecked)
}