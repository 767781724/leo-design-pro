import { combineReducers } from 'redux';
import userReducer from './user/index';

const rootReducer = combineReducers({
  user: userReducer,
});
export type IRootSate = ReturnType<typeof rootReducer>;
export default rootReducer;
