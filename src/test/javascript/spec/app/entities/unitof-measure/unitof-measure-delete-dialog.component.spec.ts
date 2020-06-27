import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RecipeTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { UnitofMeasureDeleteDialogComponent } from 'app/entities/unitof-measure/unitof-measure-delete-dialog.component';
import { UnitofMeasureService } from 'app/entities/unitof-measure/unitof-measure.service';

describe('Component Tests', () => {
  describe('UnitofMeasure Management Delete Component', () => {
    let comp: UnitofMeasureDeleteDialogComponent;
    let fixture: ComponentFixture<UnitofMeasureDeleteDialogComponent>;
    let service: UnitofMeasureService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipeTestModule],
        declarations: [UnitofMeasureDeleteDialogComponent],
      })
        .overrideTemplate(UnitofMeasureDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UnitofMeasureDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UnitofMeasureService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
