export interface IRouteConfigs {
  path: string;
  component: string;
  exact: boolean;
  auth: boolean;
  children?: IRouteConfigs[];
  redirect?: string;
}
