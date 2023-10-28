import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from '../../basket/basket.service';
import { IBasket } from '../../shared/models/basket';
//import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  basket$!: Observable<IBasket>;
  constructor(private basketService:BasketService){}
  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

}
