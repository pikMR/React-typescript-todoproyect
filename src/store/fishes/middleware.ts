import * as users from './actions';
import { Fish, FishState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import { Middleware } from 'redux';

export const fetchFishesMiddleware: Middleware<{}, FishState> = ({ getState }) => next => async (action: ActionType<typeof users>) => {
  next(action);

  if (action.type != getType(users.updateUsers)) {
    return;
  }

  next(users.fetchFishes.request());
  try {
    const response = await fetch('/data/fishes.json');
    const fishList: Fish[] = await response.json();
    next(users.fetchFishes.success(fishList));
  } catch (e) {
    next(users.fetchFishes.failure(e));
  }
};
