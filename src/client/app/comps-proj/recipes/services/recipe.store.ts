// ```
// recipes.store.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipes.store.js may be freely distributed under the MIT license
// ```

// # Redux store for `recipes`

export interface RecipeI {
  _id: number;
  creator: string;
  description: string;
  ingredients: Array<Object>;
  method: Array<Object>;
  published: boolean;
  rating: number;
  tags: Array<Object>;
  title: string;
};
