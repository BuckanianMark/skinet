// import { CanActivateFn } from '@angular/router';
// import {  map } from 'rxjs/operators';
// import { AccountService } from '../../account/account.service';

// export const authGuard: CanActivateFn = (route, state) => {
 

//   return AccountService.currentUser$.pipe(
//     map((auth) => {
//       if(auth) {
//         return true
//       }else{
//         return { url: '/api/account/login', queryParams: { returnUrl: state.url } };
          
//       }
//     })
//   )

  

// };


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map } from 'rxjs/operators'
import { AccountService } from '../../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.currentUser$.pipe(
      map(auth => {
        if (auth.token) {
          return true; // User is authenticated, allow access
        } else {
          // User is not authenticated, redirect to the login page with the return URL
          return this.router.createUrlTree(['/account/login'], {
            queryParams: { returnUrl: state.url }
          });
        }
      })
    );
  }
}


// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import {map, mapTo } from 'rxjs/operators'
// import { AccountService } from '../../account/account.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private accountService: AccountService, private router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | any> {
//       return this.accountService.currentUser$.pipe(
//         map(auth => {
//           if(auth.token){
//             return  true;
//           }
//           this.router.navigate(['/accoutnt/login'],{queryParams: { returnUrl: state.url }});
//         })
       
//       );
      
//   }
// }


// export class AuthGuard implements CanActivate{
//   constructor(private accoutS:AccountService,private router:Router){

//   }
//   canActivate(
//     next:ActivatedRouteSnapshot,
//     state:RouterStateSnapshot):Observable<boolean>{
//       this.accoutS.currentUser$.pipe(
//         map(auth => {
//           if(auth) {
//             return true
//           }
//         })
//       )
//     }
// }
