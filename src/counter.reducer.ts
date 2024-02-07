import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

export interface FeatureState {
  counter: number;
}

export const initialState = { counter: 0 };

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({ counter: state.counter + 1 })),
  on(decrement, (state) => ({ counter: state.counter + 1 })),
  on(reset, () => ({ counter: 0 }))
);
