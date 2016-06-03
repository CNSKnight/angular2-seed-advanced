// angular
import {ChangeDetectionStrategy} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';

// app
//import {RecipeService} from '../recipes/services/recipes.framework/index';
import {RecipeService} from '../recipes/services/recipe.service';
import {AnalyticsService} from '../../frameworks/analytics.framework/index';
import {RouteComponent, PlatformDirective} from '../../frameworks/core.framework/index';
import {LangSwitcherComponent} from '../../frameworks/i18n.framework/index';
import {NavbarComponent} from '../shared/navbar.component';
import {ToolbarComponent} from '../shared/toolbar.component';
import {RecipesComponent} from '../recipes/recipes.component';

@RouteComponent({
  selector: 'sd-app',
  viewProviders: [RecipeService],
  templateUrl: './app/comps-proj/app/app.component.html',
  directives: [LangSwitcherComponent, NavbarComponent, ToolbarComponent, PlatformDirective],
  changeDetection: ChangeDetectionStrategy.Default // Everything else uses OnPush
})
@RouteConfig([
  {
    path: '/',
    component: RecipesComponent,
    name: 'Recipes'
  }
])
export class AppComponent {
  constructor(public analytics: AnalyticsService) {

  }
}
