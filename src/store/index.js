import { createStore } from 'redux';
import SettingReducer from '../reducers/SettingReducer';

const store = createStore(SettingReducer);

export default store;
