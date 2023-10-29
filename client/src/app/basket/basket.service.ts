import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/models/products';
import {v4 as uuidv4} from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class BasketService {


   initialBasket= {
      id:uuidv4(),
      items:[]
    
   };
   initialTotals = {
    shipping:0,
    subTotal:0,
    total:0
   }
  private basketSource = new BehaviorSubject<Basket>(this.initialBasket);
  basket$ = this.basketSource.asObservable();
  baseUrl = enviroment.apiUrl;
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(this.initialTotals);
   basketTotals$ = this.basketTotalSource.asObservable();

  constructor(private http:HttpClient) { }

  getBasket(id:string){
    return this.http.get(this.baseUrl + '/api/basket?id=' + id)
    .pipe(
      map((basket) => {
        this.basketSource.next(basket as IBasket)
        this.calculateTotals();
      })
    );

  }

  setBasket(basket:IBasket){
    return this.http.post(this.baseUrl + '/api/Basket',basket).subscribe((response) => {
      this.basketSource.next(response as IBasket)
      this.calculateTotals();
      //will solve below error
      localStorage.setItem('basket_id',basket.id);
    },error => {
      console.log(error)
    })
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item:IProduct,quantity = 1){
    const itemToAdd:IBasketItem = this.mapProductToBasketItem(item,quantity)
    let basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items,itemToAdd,quantity);
    this.setBasket(basket)
  }

  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subTotal = basket.items.reduce((a,b) =>(b.price) + a, 0)
    const total = shipping + subTotal;
    this.basketTotalSource.next({shipping,total,subTotal})
  }
  
  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if(index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);

    }else{
      items[index].quantity += quantity;
    }
    return items;
  }
  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id',basket.id);
    return basket;

  }
  private mapProductToBasketItem(item: IProduct, quantity: number): IBasketItem {
   return {
    id:item.id,
    productName:item.name,
    price:item.price,
    pictureUrl:item.pictureUrl,
    quantity,
    brand:item.productBrand,
    type:item.productType
   }
  }

}
