import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
/**
 *
 * @author Leo
 * @desc 基础模板页面
 * @date 2021-04-09 14:09:05
 */
interface IFPageProp {
  className?: string;
  style?: React.CSSProperties;
}

const PREFIX = 'f-page';
const FPage: FC<IFPageProp> = ({ className, style, children }) => {
  return (
    <div style={style} className={classNames(styles[PREFIX], className)}>
      {children}
    </div>
  );
};
export default FPage;
