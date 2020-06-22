import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISelf } from 'app/shared/model/self.model';

type EntityResponseType = HttpResponse<ISelf>;
type EntityArrayResponseType = HttpResponse<ISelf[]>;

@Injectable({ providedIn: 'root' })
export class SelfService {
    private resourceUrl = SERVER_API_URL + 'api/selves';

    constructor(private http: HttpClient) {}

    create(self: ISelf): Observable<EntityResponseType> {
        return this.http.post<ISelf>(this.resourceUrl, self, { observe: 'response' });
    }

    update(self: ISelf): Observable<EntityResponseType> {
        return this.http.put<ISelf>(this.resourceUrl, self, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISelf>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISelf[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
