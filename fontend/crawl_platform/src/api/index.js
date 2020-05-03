import ajax from './ajax'

const BASE='/api'

export const createTable=(name,dataSource, method)=>{
    return ajax(BASE+'/table',{name,dataSource},method )
}

export const getTable=(name)=>{
    return ajax(BASE+'/table',{name},'GET' )
}

export const debug=(type)=>{
    return ajax(BASE+'/debug',{type},'GET')
}