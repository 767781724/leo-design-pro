import { FBaseListPage } from '@src/component';
import './index.less';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import intl from 'react-intl-universal';
import AddForm from './addForm';

const MenuPage = () => {
  const [visible, setVisible] = useState(false);
  return (
    <FBaseListPage
      queryApi="ddd"
      rowKey="id"
      leftNode={[
        <Button
          onClick={() => setVisible(true)}
          type="primary"
          icon={<PlusOutlined />}
        >
          {intl.get('add_menu')}
        </Button>,
      ]}
      columns={[
        {
          title: '菜单名称',
          dataIndex: 'name0',
        },
        {
          title: '菜单类型',
          dataIndex: 'name1',
        },
        {
          title: '图标',
          dataIndex: 'name2',
        },
        {
          title: '组件',
          dataIndex: 'name3',
        },
        {
          title: '路由地址',
          dataIndex: 'name3',
        },
        {
          title: '排序',
          dataIndex: 'name3',
        },
        {
          title: '操作',
          render: (value) => {
            return (
              <React.Fragment>
                <Button>{intl.get('edit')}</Button>
                <Button>{intl.get('delete')}</Button>
              </React.Fragment>
            );
          },
        },
      ]}
    >
      <AddForm onCancel={() => setVisible(false)} visible={visible}></AddForm>
    </FBaseListPage>
  );
};

export default MenuPage;
