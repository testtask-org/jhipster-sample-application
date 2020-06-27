import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUnitofMeasure } from 'app/shared/model/unitof-measure.model';
import { UnitofMeasureService } from './unitof-measure.service';

@Component({
  templateUrl: './unitof-measure-delete-dialog.component.html',
})
export class UnitofMeasureDeleteDialogComponent {
  unitofMeasure?: IUnitofMeasure;

  constructor(
    protected unitofMeasureService: UnitofMeasureService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.unitofMeasureService.delete(id).subscribe(() => {
      this.eventManager.broadcast('unitofMeasureListModification');
      this.activeModal.close();
    });
  }
}
