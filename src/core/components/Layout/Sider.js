import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Switch } from 'antd'
import { config } from 'utils'
import styles from './Layout.less'
import Menus from './Menu'

const Sider = ({
  menuTree,
  currentMenuItem,
  currentMenuStack,
  isSiderCollapsed,
  isSiderThemeDark,
  onSideMenuItemSelected,
}) => {
  const menusProps = {
    menuTree,
    currentMenuItem,
    currentMenuStack,
    isSiderCollapsed,
    isThemeDark: isSiderThemeDark,
    onMenuItemSelected: onSideMenuItemSelected,
  }
  return (
    <div>
      <div className={styles.logo}>
        <img alt={'logo'} src={config.logo} />
        {isSiderCollapsed ? '' : <span>{config.name}</span>}
      </div>
      <Menus {...menusProps} />
    </div>
  )
}

Sider.propTypes = {
  menuTree: PropTypes.array,
  currentMenuItem: PropTypes.object,
  currentMenuStack: PropTypes.array,
  isSiderCollapsed: PropTypes.bool,
  isSiderThemeDark: PropTypes.bool,
  onSideMenuItemSelected: PropTypes.func,
}

export default Sider
