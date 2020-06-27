import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RecipeTestModule } from '../../../test.module';
import { UnitofMeasureDetailComponent } from 'app/entities/unitof-measure/unitof-measure-detail.component';
import { UnitofMeasure } from 'app/shared/model/unitof-measure.model';

describe('Component Tests', () => {
  describe('UnitofMeasure Management Detail Component', () => {
    let comp: UnitofMeasureDetailComponent;
    let fixture: ComponentFixture<UnitofMeasureDetailComponent>;
    const route = ({ data: of({ unitofMeasure: new UnitofMeasure(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipeTestModule],
        declarations: [UnitofMeasureDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UnitofMeasureDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UnitofMeasureDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load unitofMeasure on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.unitofMeasure).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
