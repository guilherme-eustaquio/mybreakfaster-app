import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private api = API_URL;

  constructor(private http : HttpClient) { }

  private getAuthenticationHeader() : any {
    const headerDict = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')

    }

    let header = {
      headers: new HttpHeaders(headerDict)
    }

    return header;
  }

  public get(serviceName : string, authorization: boolean, params? : string) : any {

    if(!params) {
      params = "";
    }
    
    return this.http.get(`${this.api}/v1/${serviceName}${params}`, authorization ? this.getAuthenticationHeader() : '')
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public post(serviceName : string, body : any, authorization: boolean) : any {
    return this.http.post(`${this.api}/v1/${serviceName}`, body, authorization ? this.getAuthenticationHeader() : '');
  }

  public put(serviceName : string, body : any, params : string) : any {
    return this.http.put(`${this.api}/v1/${serviceName}${params}`, body, this.getAuthenticationHeader());
  }

  public delete(serviceName : string, params : string) : any {
    return this.http.delete(`${this.api}/v1/${serviceName}${params}`, this.getAuthenticationHeader());
  }

}
