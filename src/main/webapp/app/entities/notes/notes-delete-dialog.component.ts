import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INotes } from 'app/shared/model/notes.model';
import { NotesService } from './notes.service';

@Component({
  templateUrl: './notes-delete-dialog.component.html',
})
export class NotesDeleteDialogComponent {
  notes?: INotes;

  constructor(protected notesService: NotesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.notesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('notesListModification');
      this.activeModal.close();
    });
  }
}
