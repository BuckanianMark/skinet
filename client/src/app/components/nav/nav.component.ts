import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from '../../basket/basket.service';
import { IBasket } from '../../shared/models/basket';
import { IUser } from '../../shared/models/user';
import { AccountService } from '../../account/account.service';
//import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  basket$!: Observable<IBasket>;
  currentUser$!:Observable<IUser>;
  token:any;
  constructor(
    private basketService:BasketService,
    private accountService:AccountService
    ){}
  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
  }
  loadCurrentUser(){
    this.token = localStorage.getItem('token');
  }

  logOut(){
    this.accountService.logOut()
  }

}
