import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { FFilter, FPage, FTableView } from '..';
import { IFFilterRef } from '../FFilter';
import { IBaseListPageProps, ITableQueryParams, ITableViewRef } from '@src/types/baseTypes';
import { Object2SearchString, SearchString2Object } from '@src/utils/router';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
import style from './index.module.scss';

const PREFIX = 'f-list-page';

const FBaseListPage = <T extends object = any>(props: IBaseListPageProps<T>) => {
  const location = useLocation();
  const filter = useRef<IFFilterRef>(null);
  const tableRef = useRef<ITableViewRef>(null);
  const { conditions, innerRef, children, ...rProps } = props;
  const queryParams = useRef<ITableQueryParams>({
    page: 1,
    size: 10,
    v: 0,
    conditions: {},
  });
  const pushQueryParams = (params: Partial<ITableQueryParams>) => {
    queryParams.current = _.extend({}, tableRef.current?.queryParams, params);
    // 修改table组件查询条件
    tableRef.current?.setQueryParams(queryParams.current);
    // 调用查询接口
    tableRef.current?.query();
    // 将查询数据添加到url
    window.history.pushState(
      null,
      '',
      location.pathname + Object2SearchString(queryParams.current)
    );
  };

  const handleSearch = (values: any) => {
    let p: Partial<ITableQueryParams> = {
      conditions: values,
      page: 1,
      v: new Date().getTime(),
    };
    pushQueryParams(p);
  };
  useImperativeHandle(
    innerRef,
    () => ({
      query: () => {
        tableRef.current?.query();
      },
    }),
    []
  );
  useEffect(() => {
    // 回写form筛选 首次调用查询
    if (filter.current && filter.current.form) {
      queryParams.current.conditions = filter.current.form.getFieldsValue();
      queryParams.current = SearchString2Object(location.search, queryParams.current);
      filter.current.form.setFieldsValue(queryParams.current.conditions);
      tableRef.current?.setQueryParams(queryParams.current);
    }
    if (tableRef.current) {
      tableRef.current.query();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onPageChange = (e: ITableQueryParams) => {
    queryParams.current = _.extend({}, tableRef.current?.queryParams, e);
    // 将查询数据添加到url
    window.history.pushState(
      null,
      '',
      location.pathname + Object2SearchString(queryParams.current)
    );
  };
  return (
    <div className={style[PREFIX]}>
      <FPage>
        <FFilter ref={filter} onSearch={handleSearch} items={conditions} />
        <FTableView
          innerRef={tableRef}
          {...rProps}
          firstQuery={false}
          onPageChange={onPageChange}
        />
        {props.children}
      </FPage>
    </div>
  );
};

export default FBaseListPage;
