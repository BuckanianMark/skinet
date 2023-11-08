import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Address, IUser } from '../shared/models/user';
import { BehaviorSubject, ReplaySubject, of} from 'rxjs';
import {  map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = enviroment.apiUrl;
  initialUser = {
   email: '',
   displayName: '',
   token: ''
 }

  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient,private router:Router) { 
   
  }



  loadCurrentUser(token:string){
    // if(token === null){
    //   this.currentUserSource.next(this.initialUser);
    //   return of(this.initialUser);
    // }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${token}`);

    return this.http.get(this.baseUrl + '/api/account',{headers}).pipe(
      map((user:IUser | any) => {
        if(user) {
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }



  login(values: any){
    return this.http.post(this.baseUrl + '/api/Account/login',values).pipe(
      map((user: IUser | any) => {
        if(user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(values:any) {
    return this.http.post(this.baseUrl + '/api/Account/register',values).pipe(
      map((user: IUser | any) => {
        if(user) {
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
        }
      })
    )
    
  }
  logOut(){
    localStorage.removeItem('token');
    this.currentUserSource.next(this.initialUser);
    this.router.navigateByUrl('/');
  }
  checkEmailExists(email:string){
    return this.http.get(this.baseUrl + '/api/Account/emailexists?email=' + email);
  }

  getUsersAddress(){
    return this.http.get<Address>(this.baseUrl + '/api/Account/address');
  }
  
  updateUserAddress(address: Address) {
    return this.http.put(this.baseUrl + '/api/Account/address', address);
  }
}
