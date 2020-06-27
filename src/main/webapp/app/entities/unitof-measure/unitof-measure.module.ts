import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipeSharedModule } from 'app/shared/shared.module';
import { UnitofMeasureComponent } from './unitof-measure.component';
import { UnitofMeasureDetailComponent } from './unitof-measure-detail.component';
import { UnitofMeasureUpdateComponent } from './unitof-measure-update.component';
import { UnitofMeasureDeleteDialogComponent } from './unitof-measure-delete-dialog.component';
import { unitofMeasureRoute } from './unitof-measure.route';

@NgModule({
  imports: [RecipeSharedModule, RouterModule.forChild(unitofMeasureRoute)],
  declarations: [UnitofMeasureComponent, UnitofMeasureDetailComponent, UnitofMeasureUpdateComponent, UnitofMeasureDeleteDialogComponent],
  entryComponents: [UnitofMeasureDeleteDialogComponent],
})
export class RecipeUnitofMeasureModule {}
