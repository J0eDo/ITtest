import {actions} from '../Admin/DataTable/ModeTable'

export default function(action){
    switch (action) {
        case actions.user.BANED:
            return{
                title:"Изменение уровня доступа",
                body:(id)=>`Вы уверены что хотите изменить уровень доступа пользователя ID ${id}`,
                handler:()=>console.log("Yes")
            }
        case actions.user.REMOVE:
            return{
                title:"Удаление пользователя!",
                body:(id)=>`Вы уверены что хотите УДАЛИТЬ пользователя ID ${id}`,
                handler:()=>console.log("Yes2")
            }
        default:
            break;
    }
}