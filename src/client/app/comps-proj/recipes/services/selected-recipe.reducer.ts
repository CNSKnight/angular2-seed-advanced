// ```
// selectUA-recipe.reducer.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// selectUA-recipe.reducer.js may be freely distributed under the MIT license
// ```

// # Redux interface/reducer for `recipes`

// The `selectUA recipe` reducer handles the currently
// selectUA recipe
export const selectedRecipeReducer = (state: any = null, {type, payload}) => {

  // DEBUG
  console.log('Selected recipe reducer processing type: ', type);
  console.log('payload: ', payload);
  console.log('state: ', state);

  switch (type) {

    // When an `event` from our store is dispatched with an action
    // type of `SELECT_RECIPE`, it will hit this switch case
    case 'SELECT_RECIPE':
    case 'UPDATE_RECIPE'
      return payload;
      break;
    default:
      return state;
  }
};
