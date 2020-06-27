import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'recipe',
        loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeRecipeModule),
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.RecipeCategoryModule),
      },
      {
        path: 'ingredient',
        loadChildren: () => import('./ingredient/ingredient.module').then(m => m.RecipeIngredientModule),
      },
      {
        path: 'unitof-measure',
        loadChildren: () => import('./unitof-measure/unitof-measure.module').then(m => m.RecipeUnitofMeasureModule),
      },
      {
        path: 'notes',
        loadChildren: () => import('./notes/notes.module').then(m => m.RecipeNotesModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class RecipeEntityModule {}
