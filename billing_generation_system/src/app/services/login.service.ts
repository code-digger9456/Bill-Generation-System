import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
   private userSource = new BehaviorSubject<any>(null);
     currentUser = this.userSource.asObservable();

   constructor(private http: HttpClient) {}
    
   checkauthenticate(data: any)
   {
    return this.http.post("http://localhost:8080/billing/user/authenticate", data);
   }

   setUserData(userData:any)
   {
    this.userSource.next(userData);
   }

}
