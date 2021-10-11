// Declaração de lista para armazenar as tasks 
let tasksArr = []

// Lê os valores do localstorage, valida e mostra na tela
window.onload = function renderOnScreen() {
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
                <button id="${t.ID}" onclick="deleteTask()" class="btn-outline delete">excluir</button>
            </div>  
            `
        }

        const span = formatDiffDate(t.diff)

        if (t.isCompleted === true) {
            dataToShowIfComplete += `
            <div class="content">
                <p>${t.taskValue}</p>
                <p class="span">${span}</p>
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
    let start = Date.now()
    var end
    var diff
    
    let tasks = {
        "ID": uid,
        "taskValue": task,
        "isCompleted": false,
        "dateStart": start,
        "dateEnd": end,
        "diff": diff
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

// Altera as propriedades da task ao completar 
function modifyObjTask(valueIndex) {
    end = Date.now()
    for(i=0; i < tasksArr.length; i++) {
        if (tasksArr[i].ID === valueIndex) {
            const y = tasksArr[i]
            y.isCompleted = true
            y.dateEnd = end
            diffDate = calcDiff(y.dateEnd, y.dateStart)
            y.diff = diffDate
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
    const taskToComplete = event.srcElement.value
    modifyObjTask(taskToComplete)
}

// Remove a task do localstorage
function deleteTaskOnLocalStorage(valueIndexToDelete) {
    for(i=0; i < tasksArr.length; i++) {
        if(tasksArr[i].ID === valueIndexToDelete) {
            tasksArr.pop(tasksArr[i])
            const text = JSON.stringify(tasksArr)
            localStorage.setItem("tasksArr", text)
            location.reload()
        }
    }
}

// Evento do user que exclui a task 
function deleteTask() {
    getArrOnLocalStorage()
    const taskToDelete = event.srcElement.id
    deleteTaskOnLocalStorage(taskToDelete)
}

// Metodo que calcula a difereça em milisegundos entre o tempo de inserção e conclusão
function calcDiff(start, end) {
    let diffBetweenDates = Math.abs(end - start)
    return diffBetweenDates
}


// Metodo que valida e formata a diferença de tempo e retona o texto ao user
function formatDiffDate(diffInMilliseconds) {

    let inSeconds, day, hours, minutes, seconds, span

    inSeconds = diffInMilliseconds / 1000
    day = parseInt(inSeconds / 86400)
    inSeconds = inSeconds % 86400
    hours = parseInt(inSeconds / 3600)
    inSeconds = inSeconds % 3600 
    minutes = parseInt(inSeconds / 60)
    seconds = parseInt(inSeconds % 60)

    span = `${day}d:${hours}h:${minutes}m:${seconds}s`

    return span 

}