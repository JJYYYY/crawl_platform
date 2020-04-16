import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import { inject,observer} from 'mobx-react'
import 'braft-editor/dist/index.css'

@inject(
    stores=> ({
a:"123"
    })
)@observer

export default class Edit extends Component {
    state={
        editorState:BraftEditor.createEditorState(null)
    }
    //   handleHtmlChange = (rawContent) => {
    //     console.log(rawContent)
    //   }
      handleChange=(content) =>{
         this.setState({editorState:content})
      }
    render() {
        console.log(this.state.editorState.toHTML())
        const editorProps={
            value:this.state.editorState,
            height: 500,
            contentFormat: 'raw',
            initialContent: '<p>欢迎使用</p>',
            onChange:this.handleChange
        }
        return (
            <div className="content">
                <BraftEditor {...editorProps}/>
            </div>
        )
    }
}
