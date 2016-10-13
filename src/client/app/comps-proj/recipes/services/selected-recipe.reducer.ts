import {ActionReducer, Action} from '@ngrx/store';

import { AppConfig } from '../../../frameworks/sample/services/app-config';
// # Redux interface/reducer for `recipes`
import { RecipeI } from './recipe.store';

// The `selected recipe` reducer handles the currently
// selectUA recipe
export const selectedRecipeReducer : ActionReducer<RecipeI[]> = (state : RecipeI[] = [], action: Action) => {

  let type = action.type;
  let payload = action.payload;
  
  // DEBUG
  console.log('Selected recipe reducer processing type: ', type);
  console.log('payload: ', payload);
  console.log('state: ', state);

  switch (type) {
    case 'CREATE_RECIPE':
    case 'UPDATE_RECIPE':
      return (AppConfig.APPLICATION_OPTIONS.recipeDetailsFormInitsOnSubmit ? state : payload);
      // return payload;
    case 'SELECT_RECIPE':
      return payload;
    default:
      return state;
  }
};
