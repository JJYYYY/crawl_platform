import {observable,action} from 'mobx'

export default class EditTable {
    @observable count=0

    @observable   dataSource=[]

    @action.bound changeCount= ()=>{
        this.count=this.count+1
    }

    @action.bound setCount=(val)=>{
        this.count=val
    }

    @action.bound addDataSource= (newData)=>{
        this.dataSource=[...this.dataSource,newData]
    }
    
    @action.bound changeDataSource=(newData)=>{
        this.dataSource=newData
    }


    @action.bound  handleAdd = () => {
        const newData = {
          key: this.count,
          name: 'title',
          type: 'varchar(64)',
          explain: '标题名'
        };
       this.changeDataSource(newData)
        this.changeCount()
      };
    
      @action.bound handleDelete=(key)=>{
        const dataSource = [...this.dataSource];
          this.dataSource=dataSource.filter(item => item.key !== key)
      }
      
}