import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/address.model';
import { DataService } from '../generic/data.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private serviceName : string = "signed/establishment/products";

    constructor(private dataService : DataService) { }

    public addProduct(body : any) :  Observable<Address> {
        return this.dataService.post(this.serviceName, body, true);
    }

    public getProduct(page : number, size? : number) : Observable<any> {

        if(!size) {
            size = 50;
        }

        let params = `?page=${page}&size=${size}`;

        return this.dataService.get(this.serviceName, true, params);
    }

    public getClientProduct(page : number, type : string, id : number) : Observable<any> {
        let params = `?page=${page}&size=50&type=${type}`;
        let serviceName = `establishment/${id}/products`;
        return this.dataService.get(serviceName, true, params);
    }

    public deleteProduct(id : number) : Observable<any> {
        let params = `/${id}`;
        return this.dataService.delete(this.serviceName, params);
    }

    public updateProduct(body : any, id : number) : Observable<any> {
        let params = `/${id}`;
        return this.dataService.put(this.serviceName, body, params);
    }
}
