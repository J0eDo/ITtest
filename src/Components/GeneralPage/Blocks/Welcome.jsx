import React from 'react'
//Content
import imageProger from '../../../Content/img/programmer.jpg'
//Material UI
import Paper from '@material-ui/core/Paper'

export default function Welcome() {
    return (
        <Paper className='welcome'>
            <img src={imageProger} alt="IT-tasker" />
            <div>
                <h3>Welcome</h3>
                <p>Господа, приветствую вас на  IT-test! Даный сайт создан чтобы помочь вам оценить уровень
                    своих знаний. Портал сделан начинающим программистом. Рассчитан на тех кто только начал постигать
                    язык общения с компьютером. Важно знать пробелы в своих знаниях, и с этим вам помогут
                    наши тестовые задания. Тесты тематические , надеемся Вы найдете нужный. Тесты постоянно
                    пополняются.
            </p>
            </div>
        </Paper>
    )
}
