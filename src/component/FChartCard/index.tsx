import { Card } from 'antd';
import React, { FC } from 'react';
import style from './index.module.scss';

interface IFChartCardProps {
  name?: string;
  total?: string | number;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}
const PREFIX = 'f-chart-card';
const FChartCard: FC<IFChartCardProps> = ({ name, total, content, footer }) => {
  return (
    <Card>
      <div className={style[PREFIX]}>
        <div className={style[`${PREFIX}-name`]}>
          <span>{name}</span>
        </div>
        <div className={style[`${PREFIX}-total`]}>
          <span>{total}</span>
        </div>
        <div className={style[`${PREFIX}-content`]}>{content}</div>
        <div className={style[`${PREFIX}-footer`]}>{footer}</div>
      </div>
    </Card>
  );
};

export default FChartCard;
