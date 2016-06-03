// ```
// recipes.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipes.component.js may be freely distributed under the MIT license
// ```

// # Recipes Component

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges
 } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { RecipeService } from './services/recipe.service';
import { RecipeI } from './services/recipe.store';
// import { AppStore } from '../app/services/app.store';

import { Rating } from './rating.component';

@Component({
  moduleId: module.id,
  selector: 'recipe-detail',
  templateUrl: 'recipe-details.html',
  styleUrls: ['recipe-details.component.css'],
  directives: [Rating]
 })
export class RecipeDetailsComponent implements OnInit, OnChanges {

  originalTitle: string;
  selectedRecipeR: RecipeI; // binder matches inherited property

  // Assign our `recipe` to a locally scoped property
  // Perform additional logic on every update via ES6 setter
  // Create a copy of `_recipe` and assign it to `this.selectedRecipe`
  // to which we will use to bind our form
  @Input('selectedRecipeR')
  set _selectedRecipeR(val:RecipeI) {
    debugger;
    val && (this.originalTitle = val.title);
    this.selectedRecipeR = Object.assign({}, val || {});

    // DEBUG
    console.log('RecipeDetailsComponent.recipe: ', this.selectedRecipeR);
   }

  // Allow the user to save/delete a `recipe or cancel the
  // operation. Flow events up from here.
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges(changed:any) {
  }

  // Whenever the user needs to add a new `tag`, push an
  // empty `tag` object to the `tags` array on the
  // `selectedRecipe`
  newTag() {

    // blank `tag` object
    let tag = {
      name: ''
     };

    // Check to see if the `tags` array exists before
    // attempting to push a `tag` to it
    if (!this.selectedRecipeR.tags)
      this.selectedRecipeR.tags = [];

    this.selectedRecipeR.tags.push(tag);
   }

  // Whenever the user needs to add a new `ingredient`, push an
  // empty `ingredient` object to the `ingredient` array on the
  // `selectedRecipe`
  newIngredient() {

    // blank `ingredient` object
    let ingredient = {
      qty: '',
      unit: '',
      name: ''
     };

    // Check to see if the `ingredients` array exists before
    // attempting to push an `ingredient` to it
    if (!this.selectedRecipeR.ingredients)
      this.selectedRecipeR.ingredients = [];

    this.selectedRecipeR.ingredients.push(ingredient);
   }

  // Whenever the user needs to add a new `method`, push an
  // empty `method` object to the `method` array on the
  // `selectedRecipe`
  newMethod() {

    // blank `method` object
    let method = {
      step: ''
     };

    // Check to see if the `method` array exists before
    // attempting to push a `method` to it
    if (!this.selectedRecipeR.method)
      this.selectedRecipeR.method = [];

    this.selectedRecipeR.method.push(method);
   }

  onUpdate(value: number) {

    // Set the value of the selected recipe's rating to the
    // value passed up from the `rating` component
    this.selectedRecipeR.rating = value;
   }

  deleteTag(tag: string) {
    // loop through all of the `tags` in the `selectedRecipe`
    for (let i = 0; i < this.selectedRecipeR.tags.length; i++) {
      // if the `tag` at the current index matches that of the one
      // the user is trying to delete
      if (this.selectedRecipeR.tags[i] === tag) {
        // delete the `tag` at the current index
        this.selectedRecipeR.tags.splice(i, 1);
       }
     }
   }

  deleteIngredient(ingredient: number) {
    // loop through all of the `ingredients` in the `selectedRecipe`
    for (let i = 0; i < this.selectedRecipeR.ingredients.length; i++) {
      // if the `ingredient` at the current index matches that of the one
      // the user is trying to delete
      if (this.selectedRecipeR.ingredients[i] === ingredient) {
        // delete the `ingredient` at the current index
        this.selectedRecipeR.ingredients.splice(i, 1);
       }
     }
   }

  deleteMethod(step: number) {
    // loop through all of the `method` in the `selectedRecipe`
    for (let i = 0; i < this.selectedRecipeR.method.length; i++) {
      // if the `method` at the current index matches that of the one
      // the user is trying to delete
      if (this.selectedRecipeR.method[i] === step) {
        // delete the `method` at the current index
        this.selectedRecipeR.method.splice(i, 1);
       }
     }
   }
 }
