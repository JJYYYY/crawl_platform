import React  from 'react'
import {  Form } from 'antd';
import {EditableContext} from './TableContext'

export const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form component={false}
          form={form}
      >
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };