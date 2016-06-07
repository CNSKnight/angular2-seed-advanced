// libs
import {provideStore} from '@ngrx/store';

// app
import {HTTP_PROVIDERS} from '@angular/http';
import {nameListReducer} from './services/name-list.service';
import {MULTILINGUAL_PROVIDERS, MultilingualStateI, multilingualReducer} from '../i18n.framework/index';

// app local
import { RecipeI } from '../../comps-proj/recipes/services/recipe.store';
import { RecipeService } from '../../comps-proj/recipes/services/recipe.service';
import { recipesReducer } from '../../comps-proj/recipes/services/recipes.reducer';
import { selectedRecipeReducer } from '../../comps-proj/recipes/services/selected-recipe.reducer';

import "angular2-materialize";

// state definition
export interface AppStoreI {
  i18n: MultilingualStateI;
  names: Array<string>;
  recipesR: RecipeI[];
  selectedRecipeR: RecipeI;
};

export const APP_PROVIDERS: any[] = [
  MULTILINGUAL_PROVIDERS,
  RecipeService,
  HTTP_PROVIDERS,
  provideStore({ 
    i18n: multilingualReducer,
    names: nameListReducer,
    recipesR: recipesReducer,
    selectedRecipeR: selectedRecipeReducer
  })
];

// services
export * from './services/app-config.service';
export * from './services/name-list.service';

// services local
export { RecipeService } from '../../comps-proj/recipes/services/recipe.service';
export { recipesReducer } from '../../comps-proj/recipes/services/recipes.reducer';
//export { selectedRecipeReducer } from '../../comps-proj/recipes/services/selected-recipe.reducer';