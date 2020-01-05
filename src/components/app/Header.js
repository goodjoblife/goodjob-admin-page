// @flow
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter, type Location } from 'react-router';

const { Header: HeaderAnt } = Layout;

type Prop = {
  location: Location
};

const Header = ({ location: { pathname } }: Prop) => (
  <HeaderAnt
    className="header"
    style={{ position: 'fixed', zIndex: 1, width: '100%', color: 'white' }}
  >
    <span className="logo" style={{ float: 'left', marginRight: '20px' }}>
      GoodJob Admin Page
    </span>
    <Menu
      selectedKeys={[pathname]}
      mode="horizontal"
      style={{ lineHeight: '64px', border: 'none' }}
      theme="dark"
    >
      <Menu.Item key="/time-and-salary">
        <Link to="/time-and-salary">工時薪資</Link>
      </Menu.Item>
      <Menu.Item key="/work-experience">
        <Link to="/work-experience">工作經驗</Link>
      </Menu.Item>
      <Menu.Item key="/interview">
        <Link to="/interview">面試經驗</Link>
      </Menu.Item>
    </Menu>
  </HeaderAnt>
);

export default withRouter(Header);
