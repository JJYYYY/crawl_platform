import axios from 'axios';
import * as utils from './utils'



const BASE_URL = ""
const instance = axios.create(({
    baseURL: BASE_URL,
    timeout:100000
}))

instance.interceptors.response.use((response)=>{
    const res=response.loginStatus
    if (res==="FAILED"){
        window.location.href="/login"
    }
    return response
}, utils.catchError)


export default instance