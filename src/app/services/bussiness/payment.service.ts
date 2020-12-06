import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { DataService } from '../generic/data.service';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    private serviceName : string = "signed/client/cards";

    constructor(private dataService : DataService) { }

    public addCard(body : any) :  Observable<Card> {
        return this.dataService.post(this.serviceName, body, true);
    }

    public getCards(page : number) : Observable<any> {
        let params = `?page=${page}&size=10&sort=main,desc`;
        return this.dataService.get(this.serviceName, true, params);
    }

    public deleteCard(id : number) : Observable<any> {
        let params = `/${id}`;
        return this.dataService.delete(this.serviceName, params);
    }

    public upgradeCard(id : number) : Observable<any> {
        let params = `/${id}/main`;
        return this.dataService.put(this.serviceName, [], params);
    }
}
