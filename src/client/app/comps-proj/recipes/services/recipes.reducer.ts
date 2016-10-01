// ```
// recipes.reducer.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipes.reducer.js may be freely distributed under the MIT license
// ```

import {ActionReducer, Action} from "@ngrx/store";

// ** Import our `recipe` store
import { RecipeI } from './recipe.store';

// # redux reducer for `recipes`

// A traditional `reducer` is a function which takes a `state`
// object and an action to perform.

// `ngrx` reducers work differently:
//   * the second parameter is an object with the type of
//     action to perform and the payload for that action

// The `recipes` reducer performs actions on our list of `recipes`
// Notice that we set `state` to a default value to initialize
// smoothly
export const recipesReducer : ActionReducer<RecipeI[]> = (state : RecipeI[] = [], action: Action) => {

  let type = action.type;
  let payload = action.payload;

  // DEBUG
  console.log('Recipes reducer processing type: ', type);
  console.log('payload: ', payload);
  console.log('state: ', state);

  switch (type) {

    // `ADD_RECIPES` returns whatever collection passed in as a
    // new array
    case 'ADD_RECIPES':
      return payload;

    // `CREATE_RECIPE` returns a new array by concatenating the
    // existing recipe array with our new recipe
    case 'CREATE_RECIPE':
      return [...state, payload];

    // `UPDATE_RECIPE` returns a new array by mapping to the current
    // array, locating the recipe to update and cloning to create
    // a new object using `Object.assign`
    case 'UPDATE_RECIPE':
      return state.map((recipe: RecipeI) => {
        return recipe.id === payload.id
          ? Object.assign({}, recipe, payload) : recipe;
      });

    // `DELETE_RECIPE` returns a new array by filtering out the
    // `recipe` that we want to delete
    case 'DELETE_RECIPE':

      return state.filter((recipe: RecipeI) => {

        return recipe.id !== payload.id;
      });

    default:
      return state;
  }
};
