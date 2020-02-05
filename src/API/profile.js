import { axios, REGISTR } from './Axios'

export const registrated = props => dispatch => {
    const { password, username, email } = props
    axios.get(REGISTR, {
        params: {
            password, username, email
        }
    })
        .then((res) => {
            alert("OK")
            if (res.data.accessToken) {
                const token = 'Bearer ' + res.data.accessToken.token
                axios.defaults.headers.common["Authorization"] = token
                localStorage.setItem("TOKEN", token)
                localStorage.setItem("WS_TOKEN", res.data.accessToken.token)
                dispatch({ type: "LOGIN", token: token })
            } else {
                const { field, validation } = res.data[0] || res.data
                dispatch({ type: "ERROR_REGISTRATED", errorReg: { field, validation } })
            }
        }).catch(() => {
            alert("False")
        })
}