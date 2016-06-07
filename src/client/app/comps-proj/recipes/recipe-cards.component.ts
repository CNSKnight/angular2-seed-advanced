// ```
// recipe-list.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipe-list.component.js may be freely distributed under the MIT license
// ```

// # Recipe List Component

import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
 } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { RecipeService } from './services/recipe.service';
import { RecipeI } from './services/recipe.store';
// import { AppStore } from '../app/services/app.store';

import { Rating } from './rating.component';

@Component({
  moduleId: module.id,
  selector: 'recipe-cards',
  templateUrl: 'recipe-card.html',
  directives: [Rating]
 })

export class RecipeCardsComponent implements OnChanges { 
  // The RecipesComponent hands off `recipesS` (and `selectedRecipeS`)
  // via property bindings to its child components
  // Here we pick up the `recipesS` collection by annotating our local
  // `recipesS` property with `@Input()`
  @Input() recipesR:RecipeI[];

  // Two event outputs for when a recipe is selected or deleted
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();

  ngOnChanges(changed:any) {
  }
}
