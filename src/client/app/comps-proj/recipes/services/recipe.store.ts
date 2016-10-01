// ```
// recipes.store.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipes.store.js may be freely distributed under the MIT license
// ```

// # Redux store for `recipes`
export interface RecipeI {
  id: string; // mapped w/in loopback to _id: ObjectId
  creator: string;
  description: string;
  ingredients: {qty:string, unit:string, name:string, optional:boolean, preparation:string}[];
  method: {step:number, text:string}[];
  published: boolean;
  rating: number;
  subTitle: string;
  tags: {priority:number, text:string}[];
  title: string;
};

export const recipeModel:RecipeI = {
  id: undefined,
  creator: '',
  description: '',
  ingredients: [{qty:'', unit:'', name:'', optional:false, preparation:''}],
  method: [{step:0, text:''}],
  published: false,
  rating: 0,
  subTitle: '',
  tags: [{priority: 0, text: ''}],
  title: ''
};