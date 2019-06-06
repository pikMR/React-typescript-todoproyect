import * as tasks from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { TaskState } from "./types";

const defaultState: TaskState = {
  tasks: []
}

export type TaskAction = ActionType<typeof tasks>;

export default (state = defaultState, action: TaskAction): TaskState => {
  switch (action.type) {
    case getType(tasks.fetchTasks.success):
      return {
        ...state,
        tasks: action.payload
      }
    default:
      return state;
  }
};
