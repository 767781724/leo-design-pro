import { Table, TableProps } from 'antd';
import React from 'react';
/**
 *
 * @author Leo
 * @desc table进行二次封装
 * @date 2021-04-02 16:57:04
 */
interface IFTableProps<T = any> extends TableProps<T> {}
const FTable = (props: IFTableProps) => {
  return <Table {...props} />;
};

export default FTable;
