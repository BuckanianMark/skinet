import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brands';
import { IType } from '../shared/models/productType';
import { delay, map } from 'rxjs';
import { shopParams } from '../shared/models/shopParams';

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

    return this.http.get<IPagination>(this.baseUrl + '/api/products',{observe: 'response',params})
        .pipe(
          delay(1000),
          map(response => {
            return response.body;
          })
        );
  }
  getProductBrands() {
    return this.http.get<IBrand[]>(this.baseUrl +'/productBrand')
  }
  getProductTypes() {
    return this.http.get<IType[]>(this.baseUrl +'/productTypes')
  }
}
