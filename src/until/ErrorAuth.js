export const showErrorRegistration = (error) => {
    const field = () => {
        switch (error.field) {
            case 'email':
                return 'email'
            case 'username':
                return 'никнейм'
            case 'password':
                return 'пароль'
            default: return null
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
    const _field = field()
    if (_field) {
        document.getElementById('errorReg').innerHTML = `${field()}:${validation()}`
    } else {
        document.getElementById('errorReg').innerHTML = ''
    }
}
export const showErrorLogin = () => {
    document.getElementById('errorLogin').innerHTML = `Неверный логин или пароль`
}