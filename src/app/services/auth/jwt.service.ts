import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { SessionHandler } from 'src/app/miscellaneous/session-handler.class';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private httpClient: HttpClient) { }

  public login(email : string, password : string) {
    
    return this.httpClient.post<{token: string}>(`${API_URL}/v1/authorization/login`, {email, password}).pipe(
      tap(res => {
        
        localStorage.setItem('access_token', res.token);
        SessionHandler.deleteUserDetails();

      })
    );
  }

  public logout() : void {
    localStorage.removeItem('access_token');
    SessionHandler.deleteUserDetails();
  }

  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }
}
