import {provideRouter, RouterConfig} from '@angular/router';

import {AboutRoutes} from '../about/about.routes';
import {HomeRoutes} from '../home/home.routes';
import {RecipesRoutes} from '../recipes/recipes.routes';

export const routes: RouterConfig = [
  //...HomeRoutes,
  //...AboutRoutes,
  ...RecipesRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
