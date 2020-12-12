import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/address.model';
import { DataService } from '../generic/data.service';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {

    private serviceName : string = "signed/establishment/promotions";

    constructor(private dataService : DataService) { }

    public addPromotion(body : any) :  Observable<Address> {
        return this.dataService.post(this.serviceName, body, true);
    }

    public getPromotion(page : number) : Observable<any> {

        let params = `?page=${page}&size=50`;

        return this.dataService.get(this.serviceName, true, params);
    }

    public deletePromotion(id : number) : Observable<any> {
        let params = `/${id}`;
        return this.dataService.delete(this.serviceName, params);
    }

    public updatePromotion(body : any, id : number) : Observable<any> {
        let params = `/${id}`;
        return this.dataService.put(this.serviceName, body, params);
    }
}
