import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INotes } from 'app/shared/model/notes.model';

type EntityResponseType = HttpResponse<INotes>;
type EntityArrayResponseType = HttpResponse<INotes[]>;

@Injectable({ providedIn: 'root' })
export class NotesService {
  public resourceUrl = SERVER_API_URL + 'api/notes';

  constructor(protected http: HttpClient) {}

  create(notes: INotes): Observable<EntityResponseType> {
    return this.http.post<INotes>(this.resourceUrl, notes, { observe: 'response' });
  }

  update(notes: INotes): Observable<EntityResponseType> {
    return this.http.put<INotes>(this.resourceUrl, notes, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INotes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INotes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
