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
import { RecipesStoreI } from '../recipes.module';

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
  recipesR: Observable<any>;
  apiBase: string;

  // Inject the `AppStore` into the constructor with a type of `AppStore`
  constructor(private http: Http,
    private store: Store<RecipesStoreI>) {

    // Bind an observable of our `recipes` to `RecipeService`
    // Since this is essentially a `key, value` system, we can
    // set our `recipes` by calling `store.select('recipes')`
    this.recipesR = store.select('recipesR');
    //this.apiBase = '//localhost:3000/api/recipe';
    this.apiBase = 'https://vegrds.dharmiweb.net/api/recipes';
  }

  // used outside of listing context to load a single
  loadRecipe(id?: number) {
    // acap.ADMIN_TAPPADS.contUnitsMgr.getId()
    return false; // temp
  }

  // used w/in listing context to load all
  loadRecipes() {
    return this.http.get(this.apiBase)
      // map the `HTTP` response from `raw` to `JSON` format
      // using `RxJs`
      // Reference: https://github.com/Reactive-Extensions/RxJS
      .map((res: Response) => res.json())
      // call `map` again to create the object we want to dispatch to the reducer
      // This combo of `map` method calls is an observable sequence in that
      // every result gets passed through this sequence of operations
      .map(payload => ({type: 'ADD_RECIPES', payload}))
      // Subscribe to this sequence and hand off control to the
      // reducer by dispatching the transformed results
      .subscribe(action => this.store.dispatch(action));
  }

  saveRecipe(recipe: RecipeI) {
    (recipe.id) ? this.updateRecipe(recipe) : this.createRecipe(recipe);
  }

  createRecipe(recipe: RecipeI) {
    recipe.id && delete recipe.id;
    this.http.post(this.apiBase, JSON.stringify(recipe), HEADER)
      .map(res => res.json())
      .map(payload => ({type: 'CREATE_RECIPE', payload}))
      .subscribe(action => this.store.dispatch(action));
  }

  updateRecipe(recipe: RecipeI) {
    if (! recipe.id) this.store.dispatch({type: 'ERROR', payload: recipe});
    let url  = `${this.apiBase}/${recipe.id}`;
    delete recipe.id;
    this.http.put(url, JSON.stringify(recipe), HEADER)
      .map(res => res.json())
      .map(payload => ({type: 'UPDATE_RECIPE', payload}))
      .subscribe(action => this.store.dispatch(action));
  }

  deleteRecipe(recipe: RecipeI) {
    this.http.delete(`${this.apiBase}/${recipe.id}`)
      .subscribe(action => this.store.dispatch({type: 'DELETE_RECIPE', payload: recipe}));
  }
}
