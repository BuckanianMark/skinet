import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { RouterModule } from '@angular/router';
import { BasketSummaryComponent } from './basket-summary/basket-summary.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    OrderTotalsComponent,
    BasketSummaryComponent
  ],
  exports:[
    OrderTotalsComponent
  ]
})
export class CommonComponentsModule { }
