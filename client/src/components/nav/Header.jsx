import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu, Item } = Menu;

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
      <Item key='home' icon={<AppstoreOutlined />}>
        <Link to='/'>Home</Link>
      </Item>
      <SubMenu key='SubMenu' icon={<SettingOutlined />} title='Username'>
        <Item key='setting:1'>Option 1</Item>
        <Item key='setting:2'>Option 2</Item>
      </SubMenu>

      <Item key='login' icon={<UserOutlined />} className='float-end'>
        <Link to='/login'>Log in</Link>
      </Item>
      <Item key='signup' icon={<UserAddOutlined />} className='float-end'>
        <Link to='/signup'>Sign up</Link>
      </Item>
    </Menu>
  );
};

export default Header;
