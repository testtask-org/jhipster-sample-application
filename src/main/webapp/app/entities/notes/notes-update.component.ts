import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { INotes, Notes } from 'app/shared/model/notes.model';
import { NotesService } from './notes.service';

@Component({
  selector: 'jhi-notes-update',
  templateUrl: './notes-update.component.html',
})
export class NotesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    notes: [],
  });

  constructor(protected notesService: NotesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ notes }) => {
      this.updateForm(notes);
    });
  }

  updateForm(notes: INotes): void {
    this.editForm.patchValue({
      id: notes.id,
      notes: notes.notes,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const notes = this.createFromForm();
    if (notes.id !== undefined) {
      this.subscribeToSaveResponse(this.notesService.update(notes));
    } else {
      this.subscribeToSaveResponse(this.notesService.create(notes));
    }
  }

  private createFromForm(): INotes {
    return {
      ...new Notes(),
      id: this.editForm.get(['id'])!.value,
      notes: this.editForm.get(['notes'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INotes>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
