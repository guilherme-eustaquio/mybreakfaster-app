import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/address.model';
import { DataService } from '../generic/data.service';

@Injectable({
    providedIn: 'root'
})
export class AddressService {

    private serviceName : string = "address";

    constructor(private dataService : DataService) { }

    public addAddress(body : any) :  Observable<Address> {
        return this.dataService.post(this.serviceName, body, true);
    }

    public getAddresses() : Observable<Address[]> {

        let params = '?page=0&size=50&sort=main,desc';

        return this.dataService.get(this.serviceName, true, params);
    }
}
