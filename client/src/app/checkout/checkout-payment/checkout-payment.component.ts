import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../basket/basket.service';
import { Basket } from '../../shared/models/basket';
import { CheckoutService } from '../checkout.service';
import { IOrder, OrderToCreate } from '../../shared/models/order';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { IAddress } from '../../shared/models/address';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit{

  @Input() checkoutForm?:FormGroup
  constructor(private router:Router,private toastr:ToastrService,private basketService:BasketService,private checkoutService:CheckoutService){}
  ngOnInit(): void {
    this.submitOrder();
  }
  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe((order:IOrder) => {
      this.toastr.success('Order created successfully');
      this.basketService.deleteBasket(basket)
      const navigationExtras : NavigationExtras = {state:order}
      this.router.navigate(['checkout/success'])
    },error => console.error(error)
    )
  }
  getOrderToCreate(basket: Basket): OrderToCreate {
   const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
   const shipToAddress = this.checkoutForm?.get('addressForm')?.value as IAddress;
    if(!deliveryMethodId || !shipToAddress) throw new Error('Problem with basket');
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    }
}
}
