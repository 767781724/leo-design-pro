import { Col, Row } from 'antd';
import styles from './index.module.scss';
import { ReactNode } from 'react';

const PREFIX = 'f-toolbar';

interface IFToolBarProp {
  leftNode: ReactNode;
  rightNode: ReactNode;
}
const FToolBar = ({ leftNode, rightNode }: IFToolBarProp) => {
  if (!leftNode && !rightNode) return null;
  return (
    <Row className={styles[PREFIX]}>
      <Col className={styles[`${PREFIX}-left`]} span={12}>
        {leftNode}
      </Col>
      <Col className={styles[`${PREFIX}-right`]} span={12}>
        {rightNode}
      </Col>
    </Row>
  );
};

export default FToolBar;
