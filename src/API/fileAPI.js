import {
    axios,
    UPLOAD_PIC,
    GET_IMG,
} from './Axios'


export const uploadPicture = (file, name) => {
    const formData = new FormData();
    formData.append('file', file)
    formData.append('fileName', name)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post(UPLOAD_PIC, formData, config)
        .then((response) => {
            console.log(response);
        })
        .catch(() => {

        })
}

export const downloadPicture = (handler, fileName) => {
    return axios.get(GET_IMG,{params:{fileName}})
        .then((response) => {
            handler(response.data, fileName);
        })
        .catch(() => {

        })
}
