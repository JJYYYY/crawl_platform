import axios from 'axios'

axios.defaults.withCredentials= true//允许跨越时携带cookie并不是加上就能跨域

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const instance = axios.create({
    timeout: 5000, // 请求的超时时间
    //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
    headers: {
      'Content-Type': ''
    },
    withCredentials: false // 允许携带cookie
  })




export default function ajax(url,data={},type='GET'){
    axios.defaults.withCredentials = true
    return new Promise((resolve,reject)=>{
        let promise
        if (type==='GET'){//发送get请求
            promise = instance.get(url,{
                params:data
            })
        }else{//发送post请求
            promise=instance.post(url,data)
        }
        //如果成功了
        promise.then(Response=>{
            resolve(Response.data)
        //如果失败了,提示异常信息
        })
    })
}
