import { createAction, props } from '@ngrx/store';
import { User } from '../../models/models';

export const setUser = createAction('[User component] setUser', props<{ user: User }>());
export const unsetUser = createAction('[User component] unsetUser');
