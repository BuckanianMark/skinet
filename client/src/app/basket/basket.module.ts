import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketRoutingModule } from './basket-routing.module';
import { RouterModule } from '@angular/router';
import { OrderTotalsComponent } from '../common-components/order-totals/order-totals.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonComponentsModule } from '../common-components/common-components.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommonComponentsModule,
    BasketRoutingModule,
   
    
  ]
})
export class BasketModule { }
