import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@environments/environment';

@Injectable()
export class BaseService {

    protected urlbase: string;

    constructor(protected http: HttpClient) {
        this.urlbase = `https://${environment.api.domain}:${environment.api.port}/${environment.api.version}/`;
    }

    protected post(url: string, model: any, options: any): Observable<any> {
        const json = JSON.stringify(model);
        options['withCredentials'] = true;
        return this.http.post(`${this.urlbase}${url}`, json, options);
    }

    protected patch(url: string, model: any, options: any): Observable<any> {
        const json = JSON.stringify(model);
        options['withCredentials'] = true;
        return this.http.patch(`${this.urlbase}${url}`, json, options);
    }

    protected get(url: string, options: any): Observable<any> {
        options['withCredentials'] = true;
        return this.http.get(`${this.urlbase}${url}`, options);
    }

    protected delete(url: string, options: any): Observable<any> {
        options['withCredentials'] = true;
        return this.http.delete(`${this.urlbase}${url}`, options);
    }

}
