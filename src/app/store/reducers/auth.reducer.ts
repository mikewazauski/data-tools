import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/models';
import * as actions from '../actions/auth.actions';

export interface State {
    user?: User | null;
}

const initialState: State = {
    user: null,
};

export const authReducer = createReducer(
    initialState,
    on(actions.setUser, (state, { user }) => ({ ...state, user: { ...user } })),
    on(actions.unsetUser, (state) => ({ ...state, user: null }))
);
