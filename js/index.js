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

    let tasksArr = []
    dataText = localStorage.getItem('tasksArr')

    if(dataText == null){
        tasksArr = []
    }else{
        tasksArr = JSON.parse(dataText)
    }

    const tasksObj = createNewTask(task)

    tasksArr.push(tasksObj)

    const text = JSON.stringify(tasksArr)
    localStorage.setItem("tasksArr", text)
    
}

window.onload = function showTasksOnScreen() {

    dataText = localStorage.getItem('tasksArr')

    if(dataText == null){
        tasksArr = []
    }else{
        tasksArr = JSON.parse(dataText)
    }

    let dataToShow = "";
    let checkId = ""
    let count = 0

    for(var i = 0; i<tasksArr.length; i++){
        const t = tasksArr[i]
        count = count + 1
        let checkId = "checkId" + count.toString()
        dataToShow += `
        <div class="content">
            <input class="checkbox" type="checkbox" id="${checkId}" />
            <label for="${checkId}">${t.taskValue}</label>
            <button class="btn-outline">excluir</button>
        </div>  
        `
    }

    const screen = document.getElementById('incompleteSection')
    screen.innerHTML = dataToShow

}