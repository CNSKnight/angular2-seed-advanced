// angular
import {ChangeDetectionStrategy} from '@angular/core';

// app
//import {RecipeService} from '../recipes/services/recipes/index';
import {NameListService} from '../../frameworks/app/index';
import {AnalyticsService} from '../../frameworks/analytics/index';
import {RouteComponent, PlatformDirective} from '../../frameworks/core/index';
import {LangSwitcherComponent} from '../../frameworks/i18n/index';
import {NavbarComponent} from '../shared/navbar.component';
import {ToolbarComponent} from '../shared/toolbar.component';
import {RecipeService} from '../recipes/services/recipe.service';

@RouteComponent({
  moduleId: module.id,
  selector: 'sd-app',
  viewProviders: [NameListService, RecipeService],
  templateUrl: 'app.component.html',
  directives: [LangSwitcherComponent, NavbarComponent, ToolbarComponent, PlatformDirective],
  changeDetection: ChangeDetectionStrategy.Default // Everything else uses OnPush
})
export class AppComponent {
  constructor(public analytics: AnalyticsService) {

  }
}
