export const showErrorRegistration = (error) => {
    const field = () => {
        switch (error.field) {
            case 'email':
                return 'email'
            case 'username':
                return 'никнейм'
            case 'password':
                return 'пароль'
        }
    }
    const validation = () => {
        switch (error.validation) {
            case 'min':
                return 'слишком короткий'
            case 'max':
                return 'слишком длинный'
            case 'unique':
                return 'уже занят'
            default:
                return 'некоректен'
        }
    }
   document.getElementById('errorReg').innerHTML= `${field()}:${validation()}`
}

export const showErrorLogin = () => {
   document.getElementById('errorLogin').innerHTML= `Неверный логин или пароль`
}