import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUnitofMeasure } from 'app/shared/model/unitof-measure.model';

@Component({
  selector: 'jhi-unitof-measure-detail',
  templateUrl: './unitof-measure-detail.component.html',
})
export class UnitofMeasureDetailComponent implements OnInit {
  unitofMeasure: IUnitofMeasure | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ unitofMeasure }) => (this.unitofMeasure = unitofMeasure));
  }

  previousState(): void {
    window.history.back();
  }
}
