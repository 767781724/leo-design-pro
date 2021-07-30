import { Spin } from 'antd';
import React, { FC, Suspense, useMemo } from 'react';
import { Switch, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './index.module.scss';

const PREFIX = 'f-route';
type IFRouteViewProps = {
  animation?: boolean;
};
const FRouteView: FC<IFRouteViewProps> = ({ children, animation = false }) => {
  let location = useLocation();
  const suspenseSpin = useMemo(() => {
    return (
      <div className={styles['spin']}>
        <Spin>
          <div className={styles['spin-content']}></div>
        </Spin>
      </div>
    );
  }, []);
  if (!animation)
    return (
      <div className={styles[PREFIX]}>
        <Suspense fallback={suspenseSpin}>
          <Switch location={location}>{children}</Switch>
        </Suspense>
      </div>
    );
  return (
    <div className={styles[PREFIX]}>
      <TransitionGroup className={styles[`${PREFIX}-wrapper`]}>
        <CSSTransition key={location.pathname} timeout={200} classNames={styles['fade']}>
          <Suspense fallback={suspenseSpin}>
            <Switch location={location}>{children}</Switch>
          </Suspense>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default FRouteView;
