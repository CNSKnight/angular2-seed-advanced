import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { RecipeI } from './services/recipe.store';
import { RecipeService } from './services/recipe.service';
import { recipesComps } from './recipes.comps';
import { recipesReducer } from './services/recipes.reducer';

import { MaterializeDirective } from "angular2-materialize";

export interface RecipesStoreI {
    recipes: RecipeI[];
    selectedRecipe: RecipeI;
}

@NgModule({
    imports: [
        CommonModule,
        StoreModule.provideStore({ recipeR: recipesReducer }),
        FormsModule
    ],
    declarations: [
        MaterializeDirective,
        ...recipesComps
    ],
    exports: [...recipesComps],
    providers: [RecipeService]
})

export class RecipesModule { }
