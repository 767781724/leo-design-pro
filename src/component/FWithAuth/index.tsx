import React from 'react';

interface IFWithAuthProp {
  auth: { [key: string]: string };
  authKey: string;
}
export const FWithAuth = <P extends object>(BaseComponent: React.ComponentType<P>) => (
  props: IFWithAuthProp & P
) => {
  const { auth, authKey, ...others } = props;
  if (!auth || !authKey) return null;
  return auth[authKey] ? <BaseComponent {...(others as P)} /> : null; // 过滤掉 auth与authKey
};
