import { Component, Input, OnInit } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { DeliveryMethod } from '../../shared/models/deliveryMethod';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.css']
})
export class CheckoutDeliveryComponent implements OnInit{
@Input() checkoutForm!:FormGroup;
deliveryMethod!:DeliveryMethod[];

constructor(private checkoutService:CheckoutService,private basketService:BasketService){}
  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe(
      (dm:DeliveryMethod[]) => 
    {
      this.deliveryMethod = dm;
    },error => console.error(error)
    );
  }
  setShippingPrice(deliveryMethod:DeliveryMethod){
    this.basketService.setShippingPrice(deliveryMethod)
  }
}
