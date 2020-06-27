import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RecipeTestModule } from '../../../test.module';
import { NotesDetailComponent } from 'app/entities/notes/notes-detail.component';
import { Notes } from 'app/shared/model/notes.model';

describe('Component Tests', () => {
  describe('Notes Management Detail Component', () => {
    let comp: NotesDetailComponent;
    let fixture: ComponentFixture<NotesDetailComponent>;
    const route = ({ data: of({ notes: new Notes(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipeTestModule],
        declarations: [NotesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NotesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NotesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load notes on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.notes).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
