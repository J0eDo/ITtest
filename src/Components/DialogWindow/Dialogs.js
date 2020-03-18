import React from 'react'
import { createPortal } from 'react-dom'
//Until
import { actions as actionsTable } from '../Admin/DataTable/ModeTable'
//API
import { userBaned, userRemove, removeDataByID } from '../../API/adminisrator'
//Components
import DialogWindow from './DialogWindow'

export const dialogWindow = (openState, setOpenState, data) => {
    if (openState) {
        return createPortal(<DialogWindow data={data} closed={() => setOpenState(false)} />,
            document.getElementById('second'))
    } else {
        return createPortal(null, document.getElementById('second'))
    }
}

export default function (action) {
    switch (action) {
        case actionsTable.user.BANED:
            return {
                title: "Изменение уровня доступа",
                body: (id) => `Вы уверены что хотите изменить уровень доступа пользователя ID ${id}`,
                handler: function (dispatch, id) {
                    userBaned(id, dispatch)
                }
            }
        case actionsTable.user.REMOVE:
            return {
                title: "Удаление пользователя!",
                body: (id) => `Вы уверены что хотите УДАЛИТЬ пользователя ID ${id}`,
                handler: function (dispatch, id) {
                    userRemove(dispatch, id)
                }
            }
        case actionsTable.theTasks.REMOVE:
            return {
                title: "Удаление задачи!",
                body: (id) => `Вы уверены что хотите УДАЛИТЬ задание ID ${id}`,
                handler: function (dispatch, id, dataName) {
                    removeDataByID(dispatch, id, dataName)
                }
            }
        case actionsTable.test.REMOVE:
            return {
                title: "Удаление теста!",
                body: (id) => `Вы уверены что хотите УДАЛИТЬ тест ID ${id}`,
                handler: function (dispatch, id, dataName) {
                    removeDataByID(dispatch, id, dataName)
                }
            }
        case 'CHANGE_TASK_TYPE_CONSTRUCTOR':
            return {
                title: "Данные могут быть утеряны!",
                body: (id) => `Вы уверены что хотите сменить тип задания?`,
            }
        default:
            break;
    }
}