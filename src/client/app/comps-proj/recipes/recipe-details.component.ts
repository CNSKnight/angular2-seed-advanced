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
import {
  FormBuilder,
  Validators,
  Control,
  ControlGroup,
  FORM_DIRECTIVES
} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { RecipeService } from './services/recipe.service';
import { RecipeI } from './services/recipe.store';
// import { AppStore } from '../app/services/app.store';

import { Rating } from './rating.component';

import { MaterializeDirective } from "angular2-materialize";

@Component({
  moduleId: module.id,
  selector: 'recipe-detail',
  templateUrl: 'recipe-details.html',
  // directives: [Rating]
  directives: [MaterializeDirective, Rating]
 })
export class RecipeDetailsComponent implements OnInit, OnChanges {

  originalTitle: string;
  selectedRecipeR:RecipeI; // binder matches inherited property
  recipe:RecipeI;
  test:RecipeI;

  form: ControlGroup;
  title: Control;

  // Assign our `recipe` to a locally scoped property
  // Perform additional logic on every update via ES6 setter
  // Create a copy of `_recipe` and assign it to `this.selectedRecipe`
  // to which we will use to bind our form
  @Input('test') selectedRecipeR:RecipeI;
  @Input('selectedRecipeR')
  set _selectedRecipeR(val:RecipeI) {
    val && (this.originalTitle = val.title);
    this.recipe = Object.assign({}, val || {});

    // DEBUG
    console.log('RecipeDetailsComponent.recipe: ', this.selectedRecipeR);
   }

  // Allow the user to save/delete a `recipe or cancel the
  // operation. Flow events up from here.
  @Output() saveUA = new EventEmitter();
  @Output() cancelUA = new EventEmitter();

  constructor(private builder: FormBuilder) {
    this.title = new Control('', Validators.required);
    this.form = builder.group({
      title:  this.title
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changed:any) {
  }

  // get textarea ID
  getTAID(id:number, idx:number) {
    let label = (id !== undefined ? id : 'newID');
    let count = (idx+1);
    return label.toString().concat('-rTA-', count.toString());
  }

  getTALabel(idx:number) {
    return 'Step #'.concat((idx+1).toString().padStart(2, 0));
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
    this.recipe.tags || (this.recipe.tags = []);

    this.recipe.tags.push(tag);
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
    if (!this.recipe.ingredients)
      this.recipe.ingredients = [];

    this.recipe.ingredients.push(ingredient);
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
    if (!this.recipe.method)
      this.recipe.method = [];

    this.recipe.method.push(method);
   }

  onChangeRate(value: number) {
    // Set the value of the selectUA recipe's rating to the
    // value passed up from the `rating` component
    this.recipe.rating = value;
   }

  deleteTag(tag:{name: string}) {
    // loop through all of the `tags` in the `selectedRecipe`
    for (let i = 0; i < this.recipe.tags.length; i++) {
      // if the `tag` at the current index matches that of the one
      // the user is trying to delete
      if (this.recipe.tags[i] === tag) {
        // delete the `tag` at the current index
        this.recipe.tags.splice(i, 1);
       }
     }
   }

  deleteIngredient(ingredient: number) {
    // loop through all of the `ingredients` in the `selectedRecipe`
    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      // if the `ingredient` at the current index matches that of the one
      // the user is trying to delete
      if (this.recipe.ingredients[i] === ingredient) {
        // delete the `ingredient` at the current index
        this.recipe.ingredients.splice(i, 1);
       }
     }
   }

  deleteMethod(step: number) {
    // loop through all of the `method` in the `selectedRecipe`
    for (let i = 0; i < this.recipe.method.length; i++) {
      // if the `method` at the current index matches that of the one
      // the user is trying to delete
      if (this.recipe.method[i] === step) {
        // delete the `method` at the current index
        this.recipe.method.splice(i, 1);
       }
     }
   }

  /*
  * @todo remove empty or blacklisted tags or blacklisted chars
  */
  onSubmit(recipe:RecipeI, next) {
    // validate submitted tags
    if (recipe.tags && recipe.tags.length) {
      let fTags = recipe.tags.filter((item, idx, ary) => {
        return !! item.name.trim().length;
      });

      recipe.tags = fTags;
    }

    next && next.emit && next.emit(recipe);
  }

 }
