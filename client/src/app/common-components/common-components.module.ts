import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    OrderTotalsComponent
  ],
  exports:[
    OrderTotalsComponent
  ]
})
export class CommonComponentsModule { }
