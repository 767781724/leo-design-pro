import React, { useMemo, useState } from 'react';
import { Avatar, Badge, Col, Dropdown, Menu, Modal, Row } from 'antd';
import {
  UserOutlined,
  // TeamOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
  BellOutlined,
} from '@ant-design/icons';
import style from './index.module.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '@src/apis/system/user';
import { useInterval } from 'ahooks';
import { signOut } from '@src/store/user';
import { RootState } from '@src/store';

interface IFHeaderProps {
  title?: string;
}
const PREFIX = 'f-header';
const FHeader = ({ title }: IFHeaderProps) => {
  const dispatch = useDispatch();
  const { info, infoNum } = useSelector((state: RootState) => state.user);

  const history = useHistory();
  const [interval] = useState(1000 * 60 * 30);

  useInterval(() => {}, interval, { immediate: true });
  const menu = useMemo(
    () => (
      <Menu className={style[`${PREFIX}-menu`]}>
        {/* <Menu.Item
          className={`${PREFIX}-menu-item`}
          icon={<TeamOutlined className={`${PREFIX}-menu-item-icon`} />}
        >
          <Link to="/account-center">用户中心</Link>
        </Menu.Item> */}
        <Menu.Item
          className={style[`${PREFIX}-menu-item`]}
          icon={<LogoutOutlined className={style[`${PREFIX}-menu-item-icon`]} />}
          onClick={() => {
            Modal.confirm({
              title: '注销',
              icon: <ExclamationCircleOutlined />,
              content: '确定退出此账号么',
              onOk() {
                return setLogout().finally(() => {
                  dispatch(signOut());
                  // history.push('/login');
                });
              },
            });
          }}
        >
          <span>退出登录</span>
        </Menu.Item>
      </Menu>
    ),
    [dispatch]
  );
  return (
    <div className={style[PREFIX]}>
      <Row justify="space-between">
        <Col span={12}>
          <h2 className={style[`${PREFIX}-title`]}>{title}</h2>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <div className={style[`${PREFIX}-box`]}>
            <Badge count={infoNum}>
              <BellOutlined onClick={() => history.push('/info')} style={{ fontSize: 22 }} />
            </Badge>
            <span style={{ marginLeft: 15 }}>
              <Dropdown overlay={menu} arrow placement="bottomRight">
                <div className={style[`${PREFIX}-user`]}>
                  <Avatar icon={<UserOutlined />} />
                  <span className={style[`${PREFIX}-name`]}>{info.userName}</span>
                </div>
              </Dropdown>
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default FHeader;
