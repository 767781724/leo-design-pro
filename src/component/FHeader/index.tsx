import React, { useMemo } from 'react';
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
import { logout } from '@src/redux/actions/user';
import { IRootState } from '../../redux/reducers/index';
import { setLogout } from '@src/apis/system/user';

interface IFHeaderProps {
  title?: string;
}
const PREFIX = 'f-header';
const FHeader = ({ title }: IFHeaderProps) => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state: IRootState) => state.user);
  const history = useHistory();
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
                return new Promise((resolve, reject) => {
                  setLogout().finally(() => {
                    resolve(null);
                    dispatch(logout());
                    history.push('/login');
                  });
                });
              },
            });
          }}
        >
          <span>退出登录</span>
        </Menu.Item>
      </Menu>
    ),
    [dispatch, history]
  );
  return (
    <div className={style[PREFIX]}>
      <Row justify="space-between">
        <Col span={12}>
          <h2 className={style[`${PREFIX}-title`]}>{title}</h2>
        </Col>
        <Col span={12}>
          <div className={style[`${PREFIX}-right`]}>
            <span className={style[`${PREFIX}-right-badge`]}>
              <Badge count={0}>
                <BellOutlined style={{ fontSize: 16 }} />
              </Badge>
            </span>

            <Dropdown overlay={menu} arrow placement="bottomCenter">
              <span className={style[`${PREFIX}-user`]}>
                <Avatar icon={<UserOutlined />} />
                <span className={style[`${PREFIX}-name`]}>{userName}</span>
              </span>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default FHeader;
