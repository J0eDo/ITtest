import { actions } from '../Admin/DataTable/ModeTable'
import { userBaned, userRemove } from '../../API/adminisrator'

export default function (action) {
    switch (action) {
        case actions.user.BANED:
            return {
                title: "Изменение уровня доступа",
                body: (id) => `Вы уверены что хотите изменить уровень доступа пользователя ID ${id}`,
                handler: function (dispatch, id) {
                    userBaned(id, dispatch)
                }
            }
        case actions.user.REMOVE:
            return {
                title: "Удаление пользователя!",
                body: (id) => `Вы уверены что хотите УДАЛИТЬ пользователя ID ${id}`,
                handler: function (dispatch, id) {
                    userRemove( id)
                }
            }
        default:
            break;
    }
}