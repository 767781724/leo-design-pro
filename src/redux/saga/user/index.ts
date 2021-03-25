import { delay, put, takeLatest } from 'redux-saga/effects';
import { IGetUserDataAction } from '../../actions/user';
import { SET_USER_DATA, GET_USER_DATA } from '../../constants/userConstant';

function* asyncGetUserData(params: IGetUserDataAction) {
  console.log(params);
  yield delay(3000);
  yield put({ type: SET_USER_DATA, data: { name: params.data.name } });
}

const rootUser = [takeLatest(GET_USER_DATA, asyncGetUserData)];
export default rootUser;
