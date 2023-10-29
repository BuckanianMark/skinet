import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IBasket } from '../shared/models/basket';
import { BasketService } from './basket.service';
import { OrderTotalsComponent } from "../common-components/order-totals/order-totals.component";

@Component({
    selector: 'app-basket',
    standalone: true,
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.css'],
    imports: [CommonModule, OrderTotalsComponent]
})
export class BasketComponent implements OnInit{

  basket$!:Observable<IBasket>;
  constructor(private basketService:BasketService){}
  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

}
