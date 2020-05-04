import {observable,action} from 'mobx'

export default class Debug {
    @observable active=false

    @observable   text=""

    @action.bound changeActive= ()=>{
        this.active=!this.active
    }
    
    @action.bound changeText=(v)=>{
        this.text=v
    }


    
      
}