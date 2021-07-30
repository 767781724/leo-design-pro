import { FPage } from '@src/component';
import React from 'react';
import { useLocation } from 'react-router';

const LogPage = () => {
  const location = useLocation();
  console.log(location);
  return <FPage>用户设置页面</FPage>;
};

export default LogPage;
