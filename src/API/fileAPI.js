import {
    axios,
    POST_FILE, GET_IMG,
} from './Axios'


export const downloadPicture = async (handler, pathFile, fileName) => {
    return axios.get(GET_IMG, { params: { pathFile, fileName } })
        .then((response) => {
            handler(response.data.file);
        }).catch(() => console.log('WTF man -_-?'))

}


export const uploadFile = async (file, pathFile, fileName) => {
    const formData = new FormData();
    formData.append('file', file)
    formData.append('pathFile', pathFile)
    formData.append('fileName', fileName)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    await axios.post(POST_FILE, formData, config)
}
