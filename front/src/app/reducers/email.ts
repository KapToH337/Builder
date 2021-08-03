import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';

export const getEmail = createAction('[EMAIL] email', props<{ email?: string }>());

export interface EmailState {
  email?: string;
}

export const initialEmail: EmailState = {
  email: '',
};

export const emailReducer = createReducer(
  initialEmail,
  on(getEmail, (state, { email }) => ({
    ...state,
    email,
  })),
);

export const featureSelector = createFeatureSelector<EmailState>('email');
export const emailSelector = createSelector(featureSelector, (state) => state.email);
