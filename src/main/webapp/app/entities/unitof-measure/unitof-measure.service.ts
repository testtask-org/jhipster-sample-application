import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUnitofMeasure } from 'app/shared/model/unitof-measure.model';

type EntityResponseType = HttpResponse<IUnitofMeasure>;
type EntityArrayResponseType = HttpResponse<IUnitofMeasure[]>;

@Injectable({ providedIn: 'root' })
export class UnitofMeasureService {
  public resourceUrl = SERVER_API_URL + 'api/unitof-measures';

  constructor(protected http: HttpClient) {}

  create(unitofMeasure: IUnitofMeasure): Observable<EntityResponseType> {
    return this.http.post<IUnitofMeasure>(this.resourceUrl, unitofMeasure, { observe: 'response' });
  }

  update(unitofMeasure: IUnitofMeasure): Observable<EntityResponseType> {
    return this.http.put<IUnitofMeasure>(this.resourceUrl, unitofMeasure, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUnitofMeasure>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUnitofMeasure[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
