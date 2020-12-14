import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { DataService } from '../generic/data.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private serviceName : string = "signed/client/orders";

    private serviceNameEstablishment : string = "signed/establishment/orders"

    private serviceCancelName : string = "users/order/";

    constructor(private dataService : DataService) { }

    public requestOrder(body : any) :  Observable<Card> {
        return this.dataService.post(this.serviceName, body, true);
    }

    public getClientOrders(page : number) : Observable<any> {
        let params = `?page=${page}&size=10&sort=date,desc`;
        return this.dataService.get(this.serviceName, true, params);
    }

    public getEstablishmentOrders(page : number) : Observable<any> {
        let params = `?page=${page}&size=10&sort=date,desc`;
        return this.dataService.get(this.serviceNameEstablishment, true, params);
    }

    public setOrderStatus(body : any, id : number) : Observable<any>{

        let params = `${id}/status`;

        return this.dataService.put(`${this.serviceCancelName}`, body, params);
    }
}