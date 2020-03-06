import React from 'react'
import imageProger from '../../../Content/img/programmer2.jpg'
import Paper from '@material-ui/core/Paper'

export default function UserConstructorTask() {
    return (
        <Paper className='userConstructorBlock'>
            <img src={imageProger} alt="IT-tasker" />
            <h3>Хочешь нам помочь?</h3>
            <p>Если у Вас есть идея для вопроса, вы можете легко его реализовать
                в нашем <a href='/task-constructor/new'>конструкторе заданий</a>, и мы обязательно отправим Вам 
                письмо с результатом модерации. Вы не только поможете сайту,
                но и другим пользователям.  

            </p>
            
        </Paper>
    )
}
