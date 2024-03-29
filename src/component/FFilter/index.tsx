import React, { ForwardedRef, forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { Button, Col, Form, FormInstance, Row, Space } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import style from './index.module.scss';
import { IFormItem } from '@src/types/baseTypes';

const defSpan = 24 / 4;
const threshold = 7;
const PREFIX = 'f-filter';
// const defLayout = { sm: { span: 24 }, md: { span: 5 } };
// const labelCol = {
//   flex: '100px',
// };
interface IFFilterProps {
  items?: IFormItem[];
  onSearch: (values: { [key: string]: any }) => void;
}
export interface IFFilterRef {
  form: FormInstance | null;
}

const Filter = ({ items, onSearch }: IFFilterProps, ref: ForwardedRef<IFFilterRef>) => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();
  const onExpand = () => {
    setExpand(!expand);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        form: items && items.length > 0 ? form : null,
      };
    },
    [form, items]
  );
  const getFields = useMemo(() => {
    if (!items) return [];
    const count = expand ? items.length : threshold;
    const children = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      children.push(
        <Col
          xl={item.span || defSpan}
          lg={8}
          sm={12}
          xs={24}
          key={i}
          style={{ display: i < count ? 'block' : 'none' }}
        >
          <Form.Item
            name={item.id}
            label={item.label}
            tooltip={item.tooltip}
            labelCol={item.labelCol}
            rules={item.rule}
            initialValue={item.initialValue}
          >
            {item._node}
          </Form.Item>
        </Col>
      );
    }
    return children;
  }, [expand, items]);
  const onFinish = (value: any) => {
    onSearch(value);
  };
  const handleReset = () => {
    form.resetFields();
    onSearch({});
  };
  if (items === undefined || items.length === 0) return null;
  return (
    <Form
      form={form}
      // labelCol={{ span: 6 }}
      className={style[PREFIX]}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        {getFields}
        <Col lg={defSpan} sm={24}>
          <Space style={{ marginBottom: 15 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button onClick={handleReset} type="default">
              重置
            </Button>
            {items && items.length > threshold && (
              <Button
                type="link"
                icon={expand ? <UpOutlined /> : <DownOutlined />}
                onClick={onExpand}
              >
                {expand ? '收起' : '展开'}
              </Button>
            )}
          </Space>
        </Col>
      </Row>
    </Form>
  );
};
const FFilter = forwardRef(Filter);
export default FFilter;
