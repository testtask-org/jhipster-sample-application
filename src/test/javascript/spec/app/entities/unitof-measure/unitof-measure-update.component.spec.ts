import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RecipeTestModule } from '../../../test.module';
import { UnitofMeasureUpdateComponent } from 'app/entities/unitof-measure/unitof-measure-update.component';
import { UnitofMeasureService } from 'app/entities/unitof-measure/unitof-measure.service';
import { UnitofMeasure } from 'app/shared/model/unitof-measure.model';

describe('Component Tests', () => {
  describe('UnitofMeasure Management Update Component', () => {
    let comp: UnitofMeasureUpdateComponent;
    let fixture: ComponentFixture<UnitofMeasureUpdateComponent>;
    let service: UnitofMeasureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipeTestModule],
        declarations: [UnitofMeasureUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UnitofMeasureUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UnitofMeasureUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UnitofMeasureService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UnitofMeasure(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new UnitofMeasure();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
