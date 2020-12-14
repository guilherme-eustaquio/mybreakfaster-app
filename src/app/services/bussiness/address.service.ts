import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/address.model';
import { DataService } from '../generic/data.service';

@Injectable({
    providedIn: 'root'
})
export class AddressService {

    private serviceName : string = "signed/user/addresses";

    constructor(private dataService : DataService) { }

    public addAddress(body : any) :  Observable<any> {
        return this.dataService.post(this.serviceName, body, true);
    }

    public getAddresses(page : number) : Observable<any> {

        let params = `?page=${page}&size=50`;

        return this.dataService.get(this.serviceName, true, params);
    }

    public getMainAddress() : Observable<any> {
        let params = `?page=0&size=1&main=true`;
        return this.dataService.get(this.serviceName, true, params);
    }

    public deleteAddress(id : number) : Observable<any> {
        let params = `/${id}`;
        return this.dataService.delete(this.serviceName, params);
    }

    public upgradeAddress(id : number) : Observable<any> {
        let params = `/${id}/main`;
        return this.dataService.put(this.serviceName, [], params);
    }
}
