import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BuckNet';


  constructor(private basketService:BasketService,private accountService:AccountService){}
  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem('token')
    if(token) {
      this.accountService.loadCurrentUser(token).subscribe(() => {
        console.log(`User logged in`)
    
    },error => {
      console.log(error)
    })
    }
  }
  

  loadBasket(){
    const basketId = localStorage.getItem('basket_id');
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('Initialised basket')
      },error => {
        console.log(error)
      })
    }
  }
  
}
