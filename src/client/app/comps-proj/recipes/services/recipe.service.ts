// ```
// recipe.service.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipe.service.js may be freely distributed under the MIT license
// ```

// # Recipe Service

import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RecipeI } from './recipe.store';
// import { AppStore } from '../../app/services/app.store';
import { AppStoreI } from '../../../frameworks/app/index';

// idk what I'm doing here yet, but this should work :|
// import 'acapFPkg';

const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

// Service to pull recipes from the AppStore
// enables potential pre-reducer processing
@Injectable()
export class RecipeService {
  recipesR: Observable<RecipeI[]>;
  apiBase: string;

  // Inject the `AppStore` into the constructor with a type of `AppStore`
  constructor(private http: Http,
              private store: Store<AppStoreI>) {

    // Bind an observable of our `recipes` to `RecipeService`
    // Since this is essentially a `key, value` system, we can
    // set our `recipes` by calling `store.select('recipes')`
    this.recipesR = store.select('recipesR');
    this.apiBase = '//localhost:3000/api/recipe';
  }

  // used outside of listing context to load a single
  loadRecipe(_id?:number) {
    // acap.ADMIN_TAPPADS.contUnitsMgr.getId()
    return false; // temp
  }

  // used w/in listing context to load all
  loadRecipes() {
    this.http.get(this.apiBase)
      // map the `HTTP` response from `raw` to `JSON` format
      // using `RxJs`
      // Reference: https://github.com/Reactive-Extensions/RxJS
      .map((res:Response) => res.json())
      // call `map` again to create the object we want to dispatch
      // to our reducer
      // This combo of `map` method calls is an observable sequence
      // in that every result gets passed through this sequence of
      // operations
      .map(payload => ({ type: 'ADD_RECIPES', payload }))
      // Subscribe to this sequence and hand off control to the
      // reducer by dispatching the transformed results
      .subscribe(action => this.store.dispatch(action));
  }

  saveRecipe(recipe:RecipeI) {
    (recipe._id) ? this.updateRecipe(recipe) : this.createRecipe(recipe);
  }

  createRecipe(recipe:RecipeI) {
    this.http.post(this.apiBase, JSON.stringify(recipe), HEADER)
      .map(res => res.json())
      .map(payload => ({ type: 'CREATE_RECIPE', payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  updateRecipe(recipe:RecipeI) {
    this.http.put(`${this.apiBase}/${recipe._id}`, JSON.stringify(recipe), HEADER)
      // Dispatch action to reducer in subscribe block here
      .subscribe(action => this.store.dispatch({ type: 'UPDATE_RECIPE', payload: recipe }));
  }

  deleteRecipe(recipe:RecipeI) {
    this.http.delete(`${this.apiBase}/${recipe._id}`)
      .subscribe(action => this.store.dispatch({ type: 'DELETE_RECIPE', payload: recipe }));
  }
}
