import ajax from './ajax'


const BASE='/api'

export const createTable=(name,dataSource, method)=>{
    if (dataSource){
        console.log("123456");
        console.log(method);
    return ajax(BASE+'/table',{name,dataSource},method )
}
else{
    return ajax(BASE+'/table',{name},method )
}
}

export const getTable=(name)=>{
    return ajax(BASE+'/table',{name},'GET' )
}

export const debug=(type,data)=>{
    return ajax(BASE+'/debug',{type,data},'POST')
}


export const getData=(name)=>{
    return ajax(BASE+'/data',{name},'POST')
}