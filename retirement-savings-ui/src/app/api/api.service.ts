import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {Summary} from './model/summary.model';
import {Wallet} from './model/wallet.model';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  getAllAssets(): Observable<any> {
    return this.http.get(`${environment.apiPath}/allAssets`)
    .map(this.extractData)
    .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getSummary(): Observable<Summary> {
    return this.http.get(`${environment.apiPath}/summary`)
      .map((res: Response) => {
        const body = res.json();
        return <Summary>{
          saved: +body.saved,
          have: +body.have,
          diff: +body.diff,
          percentage: +body.percentage,
          meanPercentage: +body.meanPercentage,
          period: +body.period
        };
      })
      .catch(this.handleError);
  }

  getWallets(): Observable<Wallet[]> {
    return this.http.get(`${environment.apiPath}/wallet`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAssetsInWallet(walletId: number): Observable<any> {
    return this.http.get(`${environment.apiPath}/wallet/${walletId}/assets`)
      .map(this.extractData)
      .catch(this.handleError);
  }
}
