function createNewTask(task) {
    let uid = Math.random().toString(12).slice(-5)
    task.toString()
    
    let tasks = {
        "ID": uid,
        "taskValue": task,
        "isCompleted": true
    }

    return tasks
}

let tasksArr = []

const getArrOnLocalStorage = () => {
    dataText = localStorage.getItem('tasksArr')

    if(dataText == null){
        tasksArr = []
    }else{
        tasksArr = JSON.parse(dataText)
    }

    return tasksArr
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
            <input class="checkbox" type="checkbox" id="${checkId}" />
            <label for="${checkId}">${t.taskValue}</label>
            <button class="btn-outline">excluir</button>
        </div>  
        `
    }

    const divScreen = document.getElementById('incompleteSection')
    divScreen.innerHTML = dataToShow

}