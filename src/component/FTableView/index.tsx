import { ITableQueryParams, IPageRes, ITableViewProps, IFToolBarBtns } from '@src/types/baseTypes';
import HttpApi, { BaseHttpModel } from '@src/utils/https';
import { Alert } from 'antd';
import _ from 'lodash';
import React, { useCallback, useEffect, useImperativeHandle, useReducer, useRef } from 'react';
import FTable from '../FTable';
import { TableViewReducer } from './reducer';
import styles from './index.module.scss';
import { FToolBar } from '..';
/**
 * @author Leo
 * @desc table表格view 封装分页请求等
 * @date 2021-04-02 16:57:04
 */
const PREFIX = 'f-table-view';
const FTableView = <T extends object = any>(props: ITableViewProps<T>) => {
  const queryParams = useRef<ITableQueryParams>({
    page: 1,
    size: 10,
    v: 0,
    conditions: {},
  });

  const onPageChange = (page: number, pageSize?: number) => {
    let obj: any = {
      page: page,
    };
    if (pageSize) {
      obj.size = pageSize;
    }
    queryParams.current = _.extend({}, queryParams.current, obj);
    if (props.onPageChange) {
      props.onPageChange(queryParams.current);
    }
    query();
  };
  const onPageShowSizeChange = (page: number, pageSize: number) => {
    onPageChange(1, pageSize);
  };
  // const handleTableChange: IFTableProps['onChange'] = (val) => {
  //   console.log(val);
  // };
  // 状态
  const [state, dispatch] = useReducer(
    TableViewReducer,
    {
      pagination: {
        current: 1,
        pageSize: 10,
        showTotal: (total: number, range: [number, number]) =>
          `共 ${total} 项, 当前 ${range[0]}-${range[1]}`,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '40', '60', '100', '150', '200'],
        onChange: onPageChange,
        onShowSizeChange: onPageShowSizeChange,
      },
      dataSource: [],
      tableProps: {},
    },
    (e) => {
      // 添加选择
      if (props.rightNode || props.leftNode) {
        e.rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
            if (state.rowSelection) {
              state.rowSelection.selectedRowKeys = selectedRowKeys;
            }
            dispatch({
              selectedRowKeys,
              selectedRows,
              rowSelection: state.rowSelection,
            });
          },
        };
      }
      return e;
    }
  );
  // 数据查询
  const query = useCallback(() => {
    if (state.rowSelection && state.selectedRowKeys && state.selectedRowKeys.length > 0) {
      state.rowSelection.selectedRowKeys = [];
      dispatch({
        rowSelection: state.rowSelection,
        selectedRows: [],
        selectedRowKeys: [],
      });
    }
    dispatch({ querying: true });
    const getQueryParams = () => {
      const { size, page, conditions } = queryParams.current;
      if (state.pagination) {
        return {
          ...props.initalParams,
          pageSize: size,
          pageNum: page,
          ...conditions,
        };
      } else {
        return {
          ...props.initalParams,
          ...conditions,
        };
      }
    };
    let promise: Promise<BaseHttpModel<IPageRes>>;
    if (_.isFunction(props.queryApi)) {
      promise = props.queryApi(getQueryParams());
    } else {
      promise = HttpApi.request<IPageRes>({
        url: props.queryApi as string,
        params: getQueryParams(),
      });
    }
    promise
      .then((res) => {
        dispatch({
          dataSource: state.pagination === false ? res.data : res.data.content,
          pagination: state.pagination
            ? {
                ...state.pagination,
                current: res.data.pageNum,
                pageSize: res.data.pageSize,
                total: res.data.totalElements,
              }
            : false,
          querying: false,
        });
      })
      .catch((err) => {
        dispatch({ querying: false });
      });
  }, [state, queryParams, props]);
  useEffect(() => {
    if (props.firstQuery) query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setQueryParams = (e: ITableQueryParams) => {
    queryParams.current = _.assign({}, queryParams.current, e);
  };

  useImperativeHandle(
    props.innerRef,
    () => ({
      query,
      queryParams: queryParams.current,
      setQueryParams,
    }),
    [query]
  );
  const buildToolbarBtns = useCallback(
    (btns?: IFToolBarBtns) => {
      if (Array.isArray(btns) && btns.length > 0) {
        let nodes = [];
        for (const btn of btns) {
          let Btn: any = null;
          if (_.isFunction(btn)) {
            Btn = btn(state.selectedRowKeys || [], state.selectedRows || []);
          } else {
            Btn = btn;
          }
          nodes.push(React.cloneElement(Btn, { key: _.uniqueId('btn_') }));
        }
        return nodes;
      }
      return null;
    },
    [state.selectedRowKeys, state.selectedRows]
  );

  return (
    <>
      <FToolBar
        leftNode={buildToolbarBtns(props.leftNode)}
        rightNode={buildToolbarBtns(props.rightNode)}
      />
      {state.selectedRowKeys && state.selectedRowKeys.length > 0 && (
        <Alert
          className={styles[`${PREFIX}-alert`]}
          message={
            <span>
              已选择<strong>{state.selectedRowKeys.length}</strong>项
            </span>
          }
          type="info"
        />
      )}
      <FTable<T>
        loading={state.querying}
        size={'small'}
        dataSource={state.dataSource}
        pagination={state.pagination}
        rowSelection={state.rowSelection}
        // onChange={handleTableChange}
        {...props.tableProps}
      />
    </>
  );
};
FTableView.defaultProps = {
  firstQuery: true,
};
export default FTableView;
