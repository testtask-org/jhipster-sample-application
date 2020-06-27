import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipeSharedModule } from 'app/shared/shared.module';
import { IngredientComponent } from './ingredient.component';
import { IngredientDetailComponent } from './ingredient-detail.component';
import { IngredientUpdateComponent } from './ingredient-update.component';
import { IngredientDeleteDialogComponent } from './ingredient-delete-dialog.component';
import { ingredientRoute } from './ingredient.route';

@NgModule({
  imports: [RecipeSharedModule, RouterModule.forChild(ingredientRoute)],
  declarations: [IngredientComponent, IngredientDetailComponent, IngredientUpdateComponent, IngredientDeleteDialogComponent],
  entryComponents: [IngredientDeleteDialogComponent],
})
export class RecipeIngredientModule {}
