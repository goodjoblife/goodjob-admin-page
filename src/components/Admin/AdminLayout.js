// @flow
import * as React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

type Props = {
  children: React.Node
};

const AdminLayout = ({ children }: Props) => (
  <Layout>
    <Content
      style={{
        background: '#fff',
        padding: '90px 24px 0 24px',
        margin: 0,
        minHeight: 'calc(100vh - 88px)'
      }}
    >
      {children}
    </Content>
  </Layout>
);

export default AdminLayout;
