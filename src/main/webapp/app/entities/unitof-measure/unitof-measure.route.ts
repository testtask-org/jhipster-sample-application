import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUnitofMeasure, UnitofMeasure } from 'app/shared/model/unitof-measure.model';
import { UnitofMeasureService } from './unitof-measure.service';
import { UnitofMeasureComponent } from './unitof-measure.component';
import { UnitofMeasureDetailComponent } from './unitof-measure-detail.component';
import { UnitofMeasureUpdateComponent } from './unitof-measure-update.component';

@Injectable({ providedIn: 'root' })
export class UnitofMeasureResolve implements Resolve<IUnitofMeasure> {
  constructor(private service: UnitofMeasureService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUnitofMeasure> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((unitofMeasure: HttpResponse<UnitofMeasure>) => {
          if (unitofMeasure.body) {
            return of(unitofMeasure.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UnitofMeasure());
  }
}

export const unitofMeasureRoute: Routes = [
  {
    path: '',
    component: UnitofMeasureComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'recipeApp.unitofMeasure.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UnitofMeasureDetailComponent,
    resolve: {
      unitofMeasure: UnitofMeasureResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'recipeApp.unitofMeasure.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UnitofMeasureUpdateComponent,
    resolve: {
      unitofMeasure: UnitofMeasureResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'recipeApp.unitofMeasure.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UnitofMeasureUpdateComponent,
    resolve: {
      unitofMeasure: UnitofMeasureResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'recipeApp.unitofMeasure.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
