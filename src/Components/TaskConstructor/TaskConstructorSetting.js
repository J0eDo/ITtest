export const taskTypes = ["Test", "Drag and Drop"]

export function getInputsFields(_bodyTask) {
    let bodyTask = JSON.parse(JSON.stringify(_bodyTask))
    for (let key in bodyTask) {
        if (!Array.isArray(bodyTask[key])) {
            bodyTask[key] = document.getElementById(key).value
        } else {
            bodyTask[key].forEach((element,index) => {
               bodyTask[key][index] = document.getElementById(element).value   
            });
        }
    }
    return bodyTask
}