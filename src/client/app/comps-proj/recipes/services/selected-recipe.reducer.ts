// ```
// selectUA-recipe.reducer.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// selected-recipe.reducer.js may be freely distributed under the MIT license
// ```
import { AppConfigService } from '../../../frameworks/app.framework/services/app-config.service';
// # Redux interface/reducer for `recipes`

// The `selected recipe` reducer handles the currently
// selectUA recipe
export const selectedRecipeReducer = (state: any = null, {type, payload}) => {

  // DEBUG
  console.log('Selected recipe reducer processing type: ', type);
  console.log('payload: ', payload);
  console.log('state: ', state);

  switch (type) {
    case 'CREATE_RECIPE':
    case 'UPDATE_RECIPE':
      return (AppConfigService.APPLICATION_OPTIONS.recipeDetailsFormInitsOnSubmit ? state : payload);
      // return payload;
    case 'SELECT_RECIPE':
      return payload;
    default:
      return state;
  }
}