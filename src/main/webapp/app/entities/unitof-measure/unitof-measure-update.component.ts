import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUnitofMeasure, UnitofMeasure } from 'app/shared/model/unitof-measure.model';
import { UnitofMeasureService } from './unitof-measure.service';

@Component({
  selector: 'jhi-unitof-measure-update',
  templateUrl: './unitof-measure-update.component.html',
})
export class UnitofMeasureUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    uom: [],
  });

  constructor(protected unitofMeasureService: UnitofMeasureService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ unitofMeasure }) => {
      this.updateForm(unitofMeasure);
    });
  }

  updateForm(unitofMeasure: IUnitofMeasure): void {
    this.editForm.patchValue({
      id: unitofMeasure.id,
      uom: unitofMeasure.uom,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const unitofMeasure = this.createFromForm();
    if (unitofMeasure.id !== undefined) {
      this.subscribeToSaveResponse(this.unitofMeasureService.update(unitofMeasure));
    } else {
      this.subscribeToSaveResponse(this.unitofMeasureService.create(unitofMeasure));
    }
  }

  private createFromForm(): IUnitofMeasure {
    return {
      ...new UnitofMeasure(),
      id: this.editForm.get(['id'])!.value,
      uom: this.editForm.get(['uom'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUnitofMeasure>>): void {
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
