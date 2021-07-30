import { IFTableProps } from '@src/types/baseTypes';
import { Table } from 'antd';
import React from 'react';
/**
 *
 * @author Leo
 * @desc table进行二次封装
 * @date 2021-04-02 16:57:04
 */
const FTable = <T extends object = any>(props: IFTableProps<T>) => {
  return <Table<T> {...props} />;
};

export default FTable;
