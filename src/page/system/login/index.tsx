import { Row, Col, Tabs, Card } from 'antd';

import styles from './index.module.scss';
import intl from 'react-intl-universal';
import PasswordView from './view/password-view';
import CodeView from './view/code-view';
import ParticlesBg from 'particles-bg';

const PREFIX = 'login';
const { TabPane } = Tabs;
const LoginPage = () => {
  return (
    <div className={styles[PREFIX]}>
      <div className={styles[`${PREFIX}-bg`]}></div>
      <ParticlesBg color="#2B94AE" type="cobweb" bg={true} />
      <div className={styles[`${PREFIX}-content`]}>
        <Row align="middle" justify="center">
          <Col>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="" />
          </Col>
          <Col>
            <h1>{intl.get('platform_name')}</h1>
          </Col>
        </Row>
        <Row className={styles[`${PREFIX}-description`]} justify="center">
          {intl.get('platform_slogan')}
        </Row>
        <Card>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="密码登录" key="1">
              <PasswordView />
            </TabPane>
            <TabPane tab="验证码登录" key="2">
              <CodeView />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
