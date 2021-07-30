import { TableProps, TooltipProps } from 'antd';
import { Rule } from 'antd/lib/form';
import { TablePaginationConfig } from 'antd/lib/table';
import { TableRowSelection } from 'antd/lib/table/interface';
import { ReactNode } from 'react';

export interface IFTableProps<T extends object = any> extends TableProps<T> {}

export interface ITableQueryParams {
  page: number;
  size: number;
  conditions?: {
    [key: string]: any;
  };
  v: number;
}

export interface ITableViewRef {
  query: () => void;
  queryParams: ITableQueryParams;
  setQueryParams: (e: ITableQueryParams) => void;
}

export interface ITableViewState<T = any> {
  querying?: boolean;
  pagination?: TablePaginationConfig;
  selectedRowKeys?: React.Key[]; // table 表格勾选  id集合
  selectedRows?: T[]; // table 表格勾选  数据
  dataSource?: T[];
  rowSelection?: TableRowSelection<T>;
}

export interface ITableViewProps<T extends object = any> extends IFToolBarProps<T> {
  queryApi: ((data: any) => Promise<any>) | string;
  querying?: boolean;
  initalParams?: { [key: string]: any }; // 自定义初始查询数据
  tableProps?: IFTableProps<T>;
  firstQuery?: boolean;
  onPageChange?: (v: ITableQueryParams) => void;
  innerRef?: React.Ref<ITableViewRef>;
}

export interface IBaseListPageProps<T extends object = any>
  extends Omit<ITableViewProps<T>, 'firstQuery' | 'innerRef'> {
  conditions?: IFormItem[];
  children?: React.ReactNode;
  innerRef?: React.Ref<IBaseListPageRef>;
}

export interface IBaseListPageRef {
  query: () => void;
}
export type IFToolBarBtns<T = any> = (ReactNode | ((keys: React.Key[], rows: T[]) => ReactNode))[];
export interface IFToolBarProps<T = any> {
  leftNode?: IFToolBarBtns<T>;
  rightNode?: IFToolBarBtns<T>;
}

export interface IPageRes<T = any> {
  content: T[];
  pageNum: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
}

export interface IFormItem {
  id: string;
  label: React.ReactNode;
  tooltip?: React.ReactNode | (TooltipProps & { icon: React.ReactNode });
  initialValue?: any;
  span?: number;
  rule?: Rule[];
  labelCol?: Object;
  _node?: React.ReactNode;
  onChange?(value: any): void;
}
export interface DataNode {
  value?: string | number;
  title?: React.ReactNode;
  label?: React.ReactNode;
  key?: string | number;
  disabled?: boolean;
  disableCheckbox?: boolean;
  checkable?: boolean;
  children?: DataNode[];
  /** Customize data info */
  [prop: string]: any;
}
