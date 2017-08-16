import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'

const FormItem = Form.Item

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  modalProps.onOk = handleOk

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  }

  return (
    <Modal {...modalProps}>
      <Form layout="horizontal">
        <FormItem label="用户名" {...formItemLayout}>
          {getFieldDecorator('username', {
            initialValue: item.username,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="密码" {...formItemLayout}>
          {getFieldDecorator('password', {
            initialValue: item.password,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="password" />)}
        </FormItem>
        <FormItem label="确认密码" {...formItemLayout}>
          {getFieldDecorator('password', {
            initialValue: item.password,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="password" />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(modal)
