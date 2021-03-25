import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootSate } from './redux/reducers/index';
import { getUserData } from './redux/actions/user';

const App = () => {
  const name = useSelector((state: IRootSate) => state.user.name);
  const dispatch = useDispatch();
  const [num, setNum] = useState(0);
  return (
    <div>
      <p>{name}</p>
      <button
        onClick={() => {
          setNum((e) => e + 1);
          dispatch(getUserData({ name: `demo` + num }));
        }}
      >
        修改
      </button>
    </div>
  );
};

export default App;
