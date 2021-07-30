import { FPage } from '@src/component';
import React, { FC, Suspense } from 'react';
import { Switch } from 'react-router-dom';

type IAccountPageProp = {};

const AccountPage: FC<IAccountPageProp> = ({ children }) => {
  return (
    <FPage>
      <Suspense fallback={<span></span>}>
        <Switch>{children}</Switch>
      </Suspense>
    </FPage>
  );
};

export default AccountPage;
