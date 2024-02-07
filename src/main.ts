import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  createFeatureSelector,
  createSelector,
  provideStore,
  Store,
} from '@ngrx/store';
import { counterReducer, FeatureState } from './counter.reducer';
import { createOrderDoesNotMatterSelector } from './order.does.not.matter.selector.factory';

const featureSelector = createFeatureSelector<FeatureState>('count');
const countSelector = createSelector(featureSelector, (state) => state.counter);

const countSelectorOrderDoesntMatter = createOrderDoesNotMatterSelector(
  featureSelector,
  (state) => state.counter
);

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular 
    </a>
  `,
})
export class App {
  constructor(private store: Store<{}>) {}
  name = 'Angular';

  count$ = this.store.select(countSelector);
}

bootstrapApplication(App, {
  providers: [provideStore({ count: counterReducer })],
});
