import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INotes } from 'app/shared/model/notes.model';
import { NotesService } from './notes.service';
import { NotesDeleteDialogComponent } from './notes-delete-dialog.component';

@Component({
  selector: 'jhi-notes',
  templateUrl: './notes.component.html',
})
export class NotesComponent implements OnInit, OnDestroy {
  notes?: INotes[];
  eventSubscriber?: Subscription;

  constructor(protected notesService: NotesService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.notesService.query().subscribe((res: HttpResponse<INotes[]>) => (this.notes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNotes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INotes): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNotes(): void {
    this.eventSubscriber = this.eventManager.subscribe('notesListModification', () => this.loadAll());
  }

  delete(notes: INotes): void {
    const modalRef = this.modalService.open(NotesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.notes = notes;
  }
}
