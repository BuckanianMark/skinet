import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shopParams } from '../models/shopParams';
import { delay, map } from 'rxjs';
import { IPagination } from '../models/pagination';
import { IBrand } from '../models/brands';
import { IType } from '../models/productType';
import { IProduct } from '../models/products';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'http://localhost:5275';

  constructor(private http:HttpClient) { }

  getProducts(shopParams:shopParams) {

    let params = new HttpParams();

    if(shopParams.brandId){
      params = params.append('brandId',shopParams.brandId.toString());
    }
    if(shopParams.typeId){
      params = params.append('typeId',shopParams.typeId.toString());
    }
    if(shopParams.sort) {
      params = params.append('sort',shopParams.sort)
    }
    if(shopParams.search) {
      params = params.append('search',shopParams.search)

    }

    return this.http.get<IPagination>(this.baseUrl + '/api/products',{observe: 'response',params})
        .pipe(
          delay(1000),
          map(response => {
            return response.body;
          })
        );
  }
  getProduct(id:number) {
    return this.http.get<IProduct>(this.baseUrl + `/api/products/${id}` )
  }
  getProductBrands() {
    return this.http.get<IBrand[]>(this.baseUrl +'/productBrand')
  }
  getProductTypes() {
    return this.http.get<IType[]>(this.baseUrl +'/productTypes')
  }
}
