import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/ui.actions';


export interface State {
    isLoading: boolean;
};

const initialState: State = {
    isLoading: false
};

export const uiReducer = createReducer(
    initialState,
    on(
        actions.isLoading,
        (state) => ({ ...state, isLoading: true }),
    ),
    on(
        actions.stopLoading,
        (state) => ({ ...state, isLoading: false }),
    ),
);
