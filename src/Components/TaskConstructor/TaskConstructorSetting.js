export const taskTypes = ["Test", "Drag and Drop"]
export const actions = {
    REMOVE_TASK: " REMOVE_TASK"
}

export function getInputsFields(_bodyTask) {
    let bodyTask = JSON.parse(JSON.stringify(_bodyTask))
    for (let key in bodyTask) {
        if (!Array.isArray(bodyTask[key])) {
            bodyTask[key] = document.getElementById(key).value
        } else {
            bodyTask[key].forEach((element, index) => {
                bodyTask[key][index] = document.getElementById(element).value
            });
        }
    }
    return bodyTask
}