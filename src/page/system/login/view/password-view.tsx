import { Alert, Form, Input, Checkbox, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { useLocalStorage } from './hook';
import { login } from '@src/apis/system/user';
import { getMenuTree } from '@src/apis/system/menu';
import { setUserInfo } from '@src/store/user';
import { RootState } from '@src/store';
import { useHistory } from 'react-router';

const PasswordView = () => {
  const { isLogin } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [account, setAccount, removeAccount] = useLocalStorage('USER_ACCOUNT');
  const history = useHistory();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    const { workNo, password, remember } = values;
    if (remember) {
      setAccount(workNo);
    } else {
      removeAccount();
    }
    try {
      setLoading(true);
      const user = await login({ workNo, password });
      const menu = await getMenuTree({ token: user.data.token });
      dispatch(setUserInfo({ info: user.data, menus: menu.data, auths: [] }));
    } catch (error) {
      setError(error.msg);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isLogin) history.push('/');
  }, [isLogin, history]);
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      {error && <Alert style={{ marginBottom: 24 }} message={error} type="error" closable />}
      <Form
        size="large"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="workNo"
          initialValue={account}
          rules={[{ required: true, message: '请输入工单号' }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: '#1890FF' }} />}
            placeholder={intl.get('username')}
          />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: intl.get('rule_password') }]}>
          <Input.Password
            prefix={<LockOutlined style={{ color: '#1890FF' }} />}
            placeholder={intl.get('password')}
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>{intl.get('remember_me')}</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button loading={loading} block type="primary" htmlType="submit">
            {intl.get('login')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PasswordView;
