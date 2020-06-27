import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipeSharedModule } from 'app/shared/shared.module';
import { NotesComponent } from './notes.component';
import { NotesDetailComponent } from './notes-detail.component';
import { NotesUpdateComponent } from './notes-update.component';
import { NotesDeleteDialogComponent } from './notes-delete-dialog.component';
import { notesRoute } from './notes.route';

@NgModule({
  imports: [RecipeSharedModule, RouterModule.forChild(notesRoute)],
  declarations: [NotesComponent, NotesDetailComponent, NotesUpdateComponent, NotesDeleteDialogComponent],
  entryComponents: [NotesDeleteDialogComponent],
})
export class RecipeNotesModule {}
