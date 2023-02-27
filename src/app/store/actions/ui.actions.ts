import { createAction, props } from '@ngrx/store';
import { Menu } from '../../models/models';

export const isLoading = createAction('[UI Component] isLoading');
export const stopLoading = createAction('[UI Component] stopLoading');
export const setMenus = createAction(
  '[UI Component] setMenus',
  props<{ menus: Menu[] }>()
);
export const clearMenus = createAction('[UI Component] clearMenus');
