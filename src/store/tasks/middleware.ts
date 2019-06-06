import * as locations from './actions';
import { Task, TaskState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import { Middleware } from 'redux';

export const fetchTasksMiddleware: Middleware<{}, TaskState> = ({ getState }) => next => async (action: ActionType<typeof locations>) => {
  next(action);

  if (action.type != getType(locations.updateTasks)) {
    return;
  }

  next(locations.fetchTasks.request());
  try {
    const response = await fetch('/data/tasks.json');
    const sessionList: Task[] = await response.json();
    next(locations.fetchTasks.success(sessionList));
  } catch (e) {
    next(locations.fetchTasks.failure(e));
  }
};
