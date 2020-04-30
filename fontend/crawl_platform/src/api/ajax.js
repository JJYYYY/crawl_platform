import axios from 'axios'


export default function ajax(url,data={},type="GET"){
    return new Promise((resolve,reject)=>{
        let promise
        if (type==="GET"){//发送get请求
            promise = axios.get(url,{
                params:data
            })
        }else{//发送post请求
            promise=axios.post(url,data)
        }
        //如果成功了
        promise.then(Response=>{
            resolve(Response.data)
        //如果失败了,提示异常信息
        })
    })
}