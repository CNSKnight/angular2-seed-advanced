// Import our `Recipe` store
import {RecipeI} from '../../recipes/services/recipe.store';

// We are dealing with a single object that has:
//   * An `recipes` collection
//   * A `selectedRecipe` property holding a single `Recipe`
export interface AppStore {

    recipes: RecipeI[];
    selectedRecipe: RecipeI;

    // If ever you were to desire more functionality, you
    // could expand the `store` with new `key, value` pairs
    // to accomodate the updated model
    //
    // . . .
    //
};
