import { createAction, createAsyncAction } from 'typesafe-actions';
import { Task } from './types';

export const fetchTasks = createAsyncAction(
  'tasks/FETCH_REQUEST',
  'tasks/FETCH_SUCCESS',
  'tasks/FETCH_FAILURE'
)<void, Task[], Error>();

export const updateTasks = createAction('locations/UPDATE_TASKS', resolve =>
  () => resolve()
);
