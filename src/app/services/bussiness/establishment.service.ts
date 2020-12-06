import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Establishment } from 'src/app/models/establishment.model';
import { DataService } from '../generic/data.service';

@Injectable({
    providedIn: 'root'
})
export class EstablishmentService {

    private serviceName : string = "establishment";

    constructor(private dataService : DataService) { }

    public get(page : number) :  Observable<any> {

        let params : string = "";
        params = `?page=${page}&size=10&sort=desc`;
        return this.dataService.get(this.serviceName, true, params);
    }
}
