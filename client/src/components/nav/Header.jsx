import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');

  const handleClick = e => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode='horizontal'
      style={{ display: 'block' }}
      className=''
    >
      <Menu.Item key='home' icon={<AppstoreOutlined />}>
        Home
      </Menu.Item>
      <SubMenu key='SubMenu' icon={<SettingOutlined />} title='Username'>
        <Menu.Item key='setting:1'>Option 1</Menu.Item>
        <Menu.Item key='setting:2'>Option 2</Menu.Item>
      </SubMenu>

      <Menu.Item key='login' icon={<UserOutlined />} className='float-end'>
        Log in
      </Menu.Item>
      <Menu.Item key='signup' icon={<UserAddOutlined />} className='float-end'>
        Sign up
      </Menu.Item>
    </Menu>
  );
};

export default Header;
