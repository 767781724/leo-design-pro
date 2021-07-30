import { FPage } from '@src/component';
import React from 'react';
import { Link } from 'react-router-dom';
const LogPage = () => {
  return (
    <FPage>
      用户中心页面,前往<Link to="/center/setting">用户设置</Link>
    </FPage>
  );
};

export default LogPage;
