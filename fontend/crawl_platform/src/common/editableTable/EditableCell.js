import React, { useContext, useState, useEffect, useRef } from 'react';
import { Input, Form } from 'antd';
import {EditableContext} from './TableContext'

export  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex]
      });
    };

    const save = async e => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
            name={dataIndex}
            rules={[
            {
              required: true,
              message: `${title} is required.`
            }
          ]}
            style={{
            margin: 0
          }}
        >
          <Input onBlur={save}
              onPressEnter={save}
              ref={inputRef}
          />
        </Form.Item>
      ) : (
        <div
            className="editable-cell-value-wrap"
            onClick={toggleEdit}
            style={{
            paddingRight: 24
          }}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };