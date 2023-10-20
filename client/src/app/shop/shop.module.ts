import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';




@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    ShopComponent,
   
   
  ],
  exports:[ShopComponent]
})
export class ShopModule { }
