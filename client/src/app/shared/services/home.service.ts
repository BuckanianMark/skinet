import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

   products = [
    {id:1,Name:"Slider 1",image:'/src/assets/images/pexels-lisa-fotios-3353621.jpg',button:"go shopping"},
    {id:1,Name:"Slider 2",image:'/src/assets/images/pexels-henry-&-co-1210484.jpg',button:"Excuisute merchendise"},
    {id:1,Name:"Slider 1",image:'/src/assets/images/kisspng-software-shopping-cart-bulk-messaging-e-commerce-gray-shopping-cart-5a82fb8590a589.4737950915185335095925.png',button:"Checkout your cart"},
  ]
}
