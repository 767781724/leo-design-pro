import { IRouteConfigs } from '../system';

export interface IMenuConfigs extends Partial<Omit<IRouteConfigs, 'children'>> {
  id: number | string;
  icon: string;
  name: string;
  type: number;
  sort: number;
  children?: IMenuConfigs[];
  show: boolean;
}
export interface MenuListModal {
  authorityId: number;
  authorityName: string;
  parentId: number;
  icon: string;
  url: string;
  authorityCode: string;
  status: number;
  sort: number;
  authorityType: number;
  showStatus: number;
  createTime: string;
  createBy: string;
  modifyTime: string;
  modifyBy: string;
  remark?: any;
  children: MenuListModal[];
  show?: any;
  redirect?: any;
  frontComponents?: any;
  menuType?: any;
}
