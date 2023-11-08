import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from '../../basket/basket.service';
import { IBasket, IBasketItem } from '../../shared/models/basket';


@Component({
  selector: 'app-basket-summary',
  standalone:true,
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.css'],
  imports: [CommonModule]
})
export class BasketSummaryComponent implements OnInit{

  basket$!: Observable<IBasket>
  @Output() decrement: EventEmitter<IBasketItem> = new EventEmitter<any>();
  @Output() increment: EventEmitter<IBasketItem> = new EventEmitter<any>();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<any>();
  @Input() isBasket = true;
  
  constructor(public basketService:BasketService){}

  ngOnInit(): void {
  this.basket$ = this.basketService.basket$;
  }
  decrementItemQuantity(item:IBasketItem){
    this.decrement.emit(item)
  }
  incrementItemQuantity(item:IBasketItem){
    this.increment.emit(item)
  }
  removeBasketItem(item:IBasketItem){
    this.remove.emit(item)
  }

}
