import { IMenuConfigs } from '@src/types/system';
export type IUserReducer = {
  userName: string;
  loading: boolean;
  login: boolean;
  menus: IMenuConfigs[];
  error?: {
    code: number;
    msg: string;
  };
};
