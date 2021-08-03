import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { emailReducer, EmailState } from './email';

export interface State {
  email: EmailState;
}

export const reducers: ActionReducerMap<State> = {
  email: emailReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
