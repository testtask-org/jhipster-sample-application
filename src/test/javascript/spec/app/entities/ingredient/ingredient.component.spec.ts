import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RecipeTestModule } from '../../../test.module';
import { IngredientComponent } from 'app/entities/ingredient/ingredient.component';
import { IngredientService } from 'app/entities/ingredient/ingredient.service';
import { Ingredient } from 'app/shared/model/ingredient.model';

describe('Component Tests', () => {
  describe('Ingredient Management Component', () => {
    let comp: IngredientComponent;
    let fixture: ComponentFixture<IngredientComponent>;
    let service: IngredientService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipeTestModule],
        declarations: [IngredientComponent],
      })
        .overrideTemplate(IngredientComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IngredientComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IngredientService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Ingredient(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ingredients && comp.ingredients[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
