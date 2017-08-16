import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Table, Row, Col, Button, Popconfirm } from 'antd'
import { enums } from 'config'
const { EnumRoleTypeTextMap } = enums
import Modal from './Modal'
import lodash from 'lodash'

const Account = ({ location, dispatch, account, loading }) => {

  // 模态框传参
  const modalProps = {
    item: account.detail,
    visible: account.DetailModalVisible,
    maskClosable: true,
    confirmLoading: loading.effects['account/createOrUpdate'],
    title: account.detail.id ? '编辑账号信息' : '创建账号',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `account/createOrUpdate`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({ type: 'account/hideDetailModal' })
    }
  }

  const handleCreateOrEdit = ( record ) => {
    dispatch({ type: 'account/showDetailModal', payload: record })
  }

  const columns = [
    {
      title: '账号',
      dataIndex: 'name',
    }, {
      title: '使用者姓名',
      dataIndex: 'username',
    }, {
      title: '账号类型',
      dataIndex: 'roleTypeCode',
      render(text, record, index) {
        return EnumRoleTypeTextMap[ text ] || text
      }
    }, {
      title: '创建时间',
      dataIndex: 'registrationDate',
    }, {
      title: '操作',
      render: (text, record) => (
        <span>
          <a href="#" onClick={handleCreateOrEdit.bind(null, record)}>编辑</a>
        </span>
      ),
    }
  ]

  return (
    <div className="content-inner">
      <Row gutter={24}>
        <Col xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }} style={{marginBottom: 16}}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <div>
              <Button type="primary" size="large" className="margin-right" onClick={handleCreateOrEdit}>创建新账号</Button>
            </div>
          </div>
        </Col>
      </Row>
      <Table
        dataSource={account.list.resultSet}
        columns={columns}
        rowKey="id"
      />
      {account.DetailModalVisible && <Modal {...modalProps} />}
    </div>
  )
}

export default connect(({ account, loading }) => ({ account, loading }))(Account)
