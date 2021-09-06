import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMenuConfigs, MenuListModal } from '@src/types/model/menu';
import { IUserModel } from '@src/types/model/user';

type IUserReducer = {
  info: Partial<IUserModel>;
  isLogin: boolean;
  infoNum: number;
  menus: IMenuConfigs[];
  auths: string[];
};
export const data2menu = (list: MenuListModal[]): IMenuConfigs[] => {
  return list.map((e) => ({
    id: e.authorityId,
    icon: e.icon,
    name: e.authorityName,
    path: e.url,
    type: e.menuType,
    sort: e.sort,
    show: !!e.status,
    component: e.frontComponents,
    children: e.children && e.children.length > 0 ? data2menu(e.children) : undefined,
  }));
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: {},
    menus: [],
    auths: [],
    infoNum: 0,
    isLogin: false,
  } as IUserReducer,
  reducers: {
    setUserInfo: (state, action: PayloadAction<Omit<IUserReducer, 'isLogin' | 'infoNum'>>) => {
      const { info, menus, auths } = action.payload;
      Object.assign(state, { info, menus, auths, isLogin: true });
    },
    setInfoNum: (state, action: PayloadAction<{ num: number }>) => {
      state.infoNum = action.payload.num;
    },
    signOut: (state) => {
      state.isLogin = false;
    },
  },
});
export const { setUserInfo, signOut, setInfoNum } = userSlice.actions;
export default userSlice.reducer;
