import { FBaseListPage } from '@src/component';
import { Button, Divider, Space } from 'antd';
import intl from 'react-intl-universal';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import AddForm from './addForm';

const RolePage = () => {
  const [visible, setVisible] = useState(false);
  return (
    <FBaseListPage
      queryApi="/role/list"
      leftNode={[
        <Button onClick={() => setVisible(true)} icon={<PlusOutlined />} type="primary">
          {intl.get('add_role')}
        </Button>,
      ]}
      tableProps={{
        rowKey: 'id',
        columns: [
          {
            title: '角色名称',
            dataIndex: 'name',
          },
          {
            title: '角色描述',
            dataIndex: 'desc',
          },
          {
            title: '创建时间',
            dataIndex: 'time',
          },
          {
            title: '操作',
            render: (value) => {
              return (
                <Space split={<Divider type="vertical" />}>
                  <a href="###">{intl.get('edit')}</a>
                  <a href="###">{intl.get('delete')}</a>
                </Space>
              );
            },
          },
        ],
      }}
    >
      <AddForm onCancel={() => setVisible(false)} visible={visible}></AddForm>
    </FBaseListPage>
  );
};

export default RolePage;
