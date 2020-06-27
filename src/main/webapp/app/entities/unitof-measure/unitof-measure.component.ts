import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUnitofMeasure } from 'app/shared/model/unitof-measure.model';
import { UnitofMeasureService } from './unitof-measure.service';
import { UnitofMeasureDeleteDialogComponent } from './unitof-measure-delete-dialog.component';

@Component({
  selector: 'jhi-unitof-measure',
  templateUrl: './unitof-measure.component.html',
})
export class UnitofMeasureComponent implements OnInit, OnDestroy {
  unitofMeasures?: IUnitofMeasure[];
  eventSubscriber?: Subscription;

  constructor(
    protected unitofMeasureService: UnitofMeasureService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.unitofMeasureService.query().subscribe((res: HttpResponse<IUnitofMeasure[]>) => (this.unitofMeasures = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUnitofMeasures();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUnitofMeasure): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUnitofMeasures(): void {
    this.eventSubscriber = this.eventManager.subscribe('unitofMeasureListModification', () => this.loadAll());
  }

  delete(unitofMeasure: IUnitofMeasure): void {
    const modalRef = this.modalService.open(UnitofMeasureDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.unitofMeasure = unitofMeasure;
  }
}
