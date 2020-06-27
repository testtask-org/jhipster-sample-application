import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RecipeTestModule } from '../../../test.module';
import { NotesUpdateComponent } from 'app/entities/notes/notes-update.component';
import { NotesService } from 'app/entities/notes/notes.service';
import { Notes } from 'app/shared/model/notes.model';

describe('Component Tests', () => {
  describe('Notes Management Update Component', () => {
    let comp: NotesUpdateComponent;
    let fixture: ComponentFixture<NotesUpdateComponent>;
    let service: NotesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipeTestModule],
        declarations: [NotesUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NotesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NotesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NotesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Notes(123);
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
        const entity = new Notes();
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
