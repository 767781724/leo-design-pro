import { IUserAction } from '../../actions/user';
import { GET_USER_DATA, SET_USER_DATA } from '../../constants/userConstant';
import { IUserReducer } from './types';

const initState: IUserReducer = {
  name: '',
  loading: false,
};

const userReducer = (state = initState, action: IUserAction): IUserReducer => {
  switch (action.type) {
    case GET_USER_DATA:
      return Object.assign({}, state, { loading: true });
    case SET_USER_DATA:
      const obj = Object.assign({}, state, action.data, { loading: false });
      return obj;
    default:
      return state;
  }
};
export default userReducer;
