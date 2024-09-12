import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { taskReducer } from '../reducers/taskReducer';
import { profileReducer } from '../reducers/profileReducer';
import { homeReducer } from '../reducers/homeReducer';



const reducers = combineReducers({
    stateHome: homeReducer,
    stateTasks: taskReducer,
    stateProfile: profileReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore( 
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);