import { createStore, combineReducers } from 'redux';
import SettingReducer from '../reducers/SettingReducer';
import ProfileReducer from '../reducers/ProfileReducer';

const store = createStore(combineReducers(
    { 
        SettingReducer,
        ProfileReducer
    }
));

export default store;
