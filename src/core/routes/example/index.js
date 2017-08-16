import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'

const Example = ({ location, dispatch, exampleModel, loading }) => {

  return (
    <div className="content-inner">
      Hello World
    </div>
  )
}

export default connect(({ exampleModel, loading }) => ({ exampleModel, loading }))(Example)
