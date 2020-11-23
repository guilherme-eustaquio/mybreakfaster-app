import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private api = API_URL;

  constructor(private http : HttpClient) { }


  public create(serviceName : string, body : any) : any {
    return this.http.post(`${this.api}/v1/${serviceName}`, body);
  }

  getEstablishments() {
    return this.http.get("assets/data/establishments.json");
  }

}
