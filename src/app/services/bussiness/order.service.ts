import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { DataService } from '../generic/data.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private serviceName : string = "signed/client/orders";

    constructor(private dataService : DataService) { }

    public requestOrder(body : any) :  Observable<Card> {
        return this.dataService.post(this.serviceName, body, true);
    }

    public getClientOrders(page : number) : Observable<any> {
        let params = `?page=${page}&size=10`;
        return this.dataService.get(this.serviceName, true, params);
    }
}