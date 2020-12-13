import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { DataService } from '../generic/data.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private serviceName : string = "users";

    constructor(private dataService : DataService) { }

    public updateProfile(body : any) :  Observable<User> {
        return this.dataService.put(this.serviceName, body, '');
    }

    public getUserDetails() :  Observable<any> {
        return this.dataService.get(this.serviceName, true);
    }
}
