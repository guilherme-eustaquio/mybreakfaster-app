import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/address.model';
import { DataService } from '../generic/data.service';

@Injectable({
    providedIn: 'root'
})
export class RateService {

    private serviceName : string = "signed/client/evaluations";

    constructor(private dataService : DataService) { }

    public rate(body : any) :  Observable<Address> {
        return this.dataService.post(this.serviceName, body, true);
    }
}
