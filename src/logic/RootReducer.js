import { combineReducers } from 'redux';
import data from './data/reducer';
import location from './location/reducer'
import profile from './profile/reducer'
import auth from './auth/reducer'
import filter from './filter/reducer'
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    data,
    location,
    profile,
    auth,
    filter,
    form: formReducer
});