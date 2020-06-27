import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RecipeTestModule } from '../../../test.module';
import { NotesComponent } from 'app/entities/notes/notes.component';
import { NotesService } from 'app/entities/notes/notes.service';
import { Notes } from 'app/shared/model/notes.model';

describe('Component Tests', () => {
  describe('Notes Management Component', () => {
    let comp: NotesComponent;
    let fixture: ComponentFixture<NotesComponent>;
    let service: NotesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipeTestModule],
        declarations: [NotesComponent],
      })
        .overrideTemplate(NotesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NotesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NotesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Notes(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.notes && comp.notes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
