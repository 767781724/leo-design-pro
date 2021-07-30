import HttpApi, { BaseHttpModel } from '@src/utils/https';
import { Select, SelectProps } from 'antd';
import _ from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
type IgetData = <T>(val: T) => T;
/**
 *
 * @author Leo
 * @desc 自动获取远程数据的select
 * @date 2021-04-29 15:07:17
 */
interface IFFormItemSelectProps {
  value?: string | number;
  onChange?: (e: string | number) => void;
  queryApi: ((data?: any) => Promise<any>) | string;
  options: {
    getData?: IgetData;
    name: string;
    value: string;
  };
  params?: {
    [key: string]: any;
  };
  placeholder?: string;
  selectState?: SelectProps<any>;
}
const FFormItemSelect = ({
  value,
  onChange,
  queryApi,
  params,
  options,
  selectState,
}: IFFormItemSelectProps) => {
  let isUnmount = useRef(false);
  const [data, setData] = useState<any>();
  useEffect(() => {
    let promise: Promise<BaseHttpModel<any>>;
    if (_.isFunction(queryApi)) {
      promise = queryApi(params);
    } else {
      promise = HttpApi.request({
        url: queryApi as string,
        params,
      });
    }
    promise.then((res) => {
      !isUnmount.current && setData(res.data);
      // const _d = options.getData ? options.getData(res.data) : res.data;
      // const first = _.isArray(_d) ? _d[0][options.value] : undefined;
      // console.log(first);
      // onChange && onChange(first);
    });
    return () => {
      isUnmount.current = true;
    };
  }, [queryApi, params]);

  const selectOptions = useMemo(() => {
    const _d = options.getData ? options.getData(data) : data;
    if (!!_d) {
      if (_.isArray(_d)) {
        return _d.map((item: any, index) => (
          <Select.Option key={_.uniqueId(`select_${index}`)} value={item[options.value]}>
            {item[options.name]}
          </Select.Option>
        ));
      }
      return null;
    }
    return null;
  }, [data, options]);
  return (
    <Select {...selectState} value={value} onChange={onChange} allowClear>
      {selectOptions}
    </Select>
  );
};

export default FFormItemSelect;
