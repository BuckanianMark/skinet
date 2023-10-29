import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBasketTotals } from 'src/app/shared/models/basket';
import { Observable } from 'rxjs';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-order-totals',
  standalone:true,
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.css'],
  imports: [CommonModule]
})
export class OrderTotalsComponent implements OnInit{
basketTotal$!:Observable<IBasketTotals>;

constructor(private basketService:BasketService){}
  ngOnInit(): void {
   this.basketTotal$ = this.basketService.basketTotals$;
   
  }
}
