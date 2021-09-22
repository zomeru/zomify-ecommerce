import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = e => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });

    history.push('/login');
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
        <Item icon={<LogoutOutlined />} key='setting:2' onClick={handleLogout}>
          Logout
        </Item>
      </SubMenu>

      <Item key='signup' icon={<UserAddOutlined />} className='float-end'>
        <Link to='/signup'>Sign up</Link>
      </Item>
      <Item key='login' icon={<UserOutlined />} className='float-end'>
        <Link to='/login'>Log in</Link>
      </Item>
    </Menu>
  );
};

export default Header;
