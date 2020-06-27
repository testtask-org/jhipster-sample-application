import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RecipeTestModule } from '../../../test.module';
import { UnitofMeasureComponent } from 'app/entities/unitof-measure/unitof-measure.component';
import { UnitofMeasureService } from 'app/entities/unitof-measure/unitof-measure.service';
import { UnitofMeasure } from 'app/shared/model/unitof-measure.model';

describe('Component Tests', () => {
  describe('UnitofMeasure Management Component', () => {
    let comp: UnitofMeasureComponent;
    let fixture: ComponentFixture<UnitofMeasureComponent>;
    let service: UnitofMeasureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipeTestModule],
        declarations: [UnitofMeasureComponent],
      })
        .overrideTemplate(UnitofMeasureComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UnitofMeasureComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UnitofMeasureService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UnitofMeasure(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.unitofMeasures && comp.unitofMeasures[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
