import { combineReducers } from 'redux'
import TasksReducer from 'mrticktock/app/reducers/reducerTasks'
import ActiveTaskReducer from 'mrticktock/app/reducers/activeTaskReducer'
import TaskShowReducer from 'mrticktock/app/reducers/taskShowReducer'
import LoginReducer from 'mrticktock/app/reducers/reducerLogin'

const rootReducer = combineReducers({
  tasks: TasksReducer,
  taskShow: TaskShowReducer,
  activeTask: ActiveTaskReducer,
  login: LoginReducer
});

export default rootReducer;
