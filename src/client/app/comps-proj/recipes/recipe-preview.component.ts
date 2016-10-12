// ```
// recipe-preview.component.js
// (c) Codename: Steeve Knight
// ```

// # Recipes Component

import { Store } from '@ngrx/store';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges
} from '@angular/core';
import { RecipeI } from './services/recipe.store';

declare var Materialize: { updateTextFields: Function };

@Component({
  moduleId: module.id,
  selector: 'recipe-preview',
  templateUrl: 'recipe-preview.html',
  // directives: [Rating]
})
export class RecipePreviewComponent implements OnInit, OnChanges {
  @Input('selectedRecipeR') recipe: RecipeI;

  // Allow the user to save/delete a `recipe or cancel the
  // operation. Flow events up from here.
  @Output() saveUA = new EventEmitter();
  @Output() cancelUA = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changed: any) {
  }

  ngAfterViewChecked() {
  }
}
