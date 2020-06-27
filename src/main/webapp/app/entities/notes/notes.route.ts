import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INotes, Notes } from 'app/shared/model/notes.model';
import { NotesService } from './notes.service';
import { NotesComponent } from './notes.component';
import { NotesDetailComponent } from './notes-detail.component';
import { NotesUpdateComponent } from './notes-update.component';

@Injectable({ providedIn: 'root' })
export class NotesResolve implements Resolve<INotes> {
  constructor(private service: NotesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INotes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((notes: HttpResponse<Notes>) => {
          if (notes.body) {
            return of(notes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Notes());
  }
}

export const notesRoute: Routes = [
  {
    path: '',
    component: NotesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'recipeApp.notes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NotesDetailComponent,
    resolve: {
      notes: NotesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'recipeApp.notes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NotesUpdateComponent,
    resolve: {
      notes: NotesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'recipeApp.notes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NotesUpdateComponent,
    resolve: {
      notes: NotesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'recipeApp.notes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
