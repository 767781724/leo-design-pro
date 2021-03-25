import { SET_USER_DATA, GET_USER_DATA } from '../constants/userConstant';

export type ISetUserDataAction = {
  type: typeof SET_USER_DATA;
  data: IGetUserDataParams;
};
export type IGetUserDataAction = {
  type: typeof GET_USER_DATA;
  data: IGetUserDataParams;
};
export type IGetUserDataParams = {
  name: string;
};
export type IUserAction = ISetUserDataAction | IGetUserDataAction;

export const setUserData = (params: IGetUserDataParams): ISetUserDataAction => {
  return { type: SET_USER_DATA, data: params };
};

export const getUserData = (params: IGetUserDataParams): IGetUserDataAction => {
  return { type: GET_USER_DATA, data: params };
};
