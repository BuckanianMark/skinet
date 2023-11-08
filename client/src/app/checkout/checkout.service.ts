import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { IOrder, OrderToCreate } from '../shared/models/order';
import { map } from 'rxjs';
import { DeliveryMethod } from '../shared/models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = enviroment.apiUrl;


  constructor(private http:HttpClient) { }

  createOrder(order: OrderToCreate){
    return this.http.post<IOrder>(this.baseUrl + '/api/orders', order);
  }
  getDeliveryMethods() {
    return this.http.get<DeliveryMethod[]>(this.baseUrl + '/api/orders/deliveryMethod').pipe(
      map((dm:DeliveryMethod[]) => {
        return dm.sort((a, b) => b.price - a.price)
      })
    )
  }
}
