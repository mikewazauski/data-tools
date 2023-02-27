import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/ui.actions';
import { Menu } from '../../models/models';

export interface State {
  isLoading: boolean;
  menus: Menu[];
}

const initialState: State = {
  isLoading: false,
  menus: [],
};

export const uiReducer = createReducer(
  initialState,
  on(actions.isLoading, (state) => ({ ...state, isLoading: true })),
  on(actions.stopLoading, (state) => ({ ...state, isLoading: false })),
  on(actions.setMenus, (state, { menus }) => ({ ...state, menus: [...menus] })),
  on(actions.clearMenus, (state) => ({ ...state, menus: [] }))
);
