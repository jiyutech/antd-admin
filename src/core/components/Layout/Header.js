import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover } from 'antd'
import classnames from 'classnames'
import styles from './Header.less'
import Menus from './Menu'

const SubMenu = Menu.SubMenu

const Header = ( layoutProps ) => {

  const {
    loginInfo,
    menuTree,
    currentMenuItem,
    currentMenuStack,
    isSiderCollapsed,
    isSiderThemeDark,
    onSideMenuItemSelected,
    isMobileNavbarMode,
    isMobileMenuPopoverVisible,
    onLogout,
    onToggleFoldSider,
    onToggleMobileMenuPopoverVisible
  } = layoutProps

  let handleClickMenu = e => e.key === 'logout' && onLogout()

  const menusProps = {
    menuTree,
    currentMenuItem,
    currentMenuStack,
    isSiderCollapsed,
    isThemeDark: isSiderThemeDark,
    onMenuItemSelected: onSideMenuItemSelected,
  }

  console.error(loginInfo);

  return (
    <div className={styles.header}>
      {isMobileNavbarMode
        ? <Popover placement="bottomLeft" onVisibleChange={onToggleMobileMenuPopoverVisible} visible={isMobileMenuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
          <div className={styles.button}>
            <Icon type="bars" />
          </div>
        </Popover>
        : <div
          className={styles.button}
          onClick={onToggleFoldSider}
        >
          <Icon type={classnames({ 'menu-unfold': isSiderCollapsed, 'menu-fold': !isSiderCollapsed })} />
        </div>}
      <div className={styles.rightWarpper}>
        <div className={styles.button}>
          <Icon type="mail" />
        </div>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu
            style={{
              float: 'right',
            }}
            title={<span>
              <Icon type="user" />
              {loginInfo.username}
            </span>}
          >
            <Menu.Item key="logout">
              退出登录
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
}

export default Header
