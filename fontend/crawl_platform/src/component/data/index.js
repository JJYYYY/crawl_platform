import React, { Component } from 'react'
import WrapperSelect from '../../common/wrapperSelect'
import { Table } from 'antd';
import {getTable,getData} from '../../api'

export default class Data extends Component {
  state={
    data:[],
    selectVal:"",
    columns:[],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading:false
  }


  componentDidMount(){
    getTable().then(
      res=>{
          this.setState({
              data:res.data
          },
          ()=>{
            if (this.state.data.length>0){
            getTable(this.state.data[0].value).then(
                res=>{
                    this.setState({
                        selectVal:this.state.data[0].value
                    })
                }
            )}}
          )
  }
  )
}

handleChange=(val)=>{
  this.setState({
    selectVal:val
},()=>{
    getTable(this.state.selectVal).then(
        res=>{
          let columns=[]  
          JSON.parse(res.data).map(
            item=>{
            columns.push({
              title:item.name,
              dataIndex:item.name
            })
            this.setState({
              columns
            })
            return item
          }
          )
        }
    )
})
getData(this.state.selectVal).then(
  res=>{
    console.log(res)
  }
)
}



  render() {
    const { columns,data, pagination, loading } = this.state;
    return (
      <div className='data'>
         <WrapperSelect
                     data={this.state.data}
                     value={this.state.selectVal}
                     onChange={(value)=>this.handleChange(value)}
                     width="80"
                 />
                 <Table columns={columns} dataSource={data}   pagination={pagination}
        loading={loading} />,
      </div>
    )
  }
}
