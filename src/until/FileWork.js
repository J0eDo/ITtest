export const textShower = (file,setter) =>{
    fetch(file)
    .then(response=>response.text())
    .then(text=>{setter(text)})
}