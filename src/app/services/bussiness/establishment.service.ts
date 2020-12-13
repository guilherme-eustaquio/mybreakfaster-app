import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../generic/data.service';

@Injectable({
    providedIn: 'root'
})
export class EstablishmentService {

    private serviceName : string = "establishment";

    constructor(private dataService : DataService) { }

    public get(page : number, city : string) :  Observable<any> {

        let params : string = "";
        params = `?page=${page}&size=10&sort=desc&city=${city}`;
        return this.dataService.get(this.serviceName, true, params);
    }
}
