import React, { Component } from 'react'
import { inject,observer} from 'mobx-react'


export default 

@inject(
    stores=> ({
a:"123"
    })
)@observer

class Detail extends Component {
    render() {
        return (
            <div className="content">
                123
            </div>
        )
    }
}
