import { Component,OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/products';
import { ShopService } from '../../shared/services/shop.service';
import { ActivatedRoute } from '@angular/router';
//import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit{
  product:IProduct | any;
  constructor(private shopService:ShopService,private activatedRoute:ActivatedRoute){

  }
  ngOnInit(): void {
    this.loadProduct()
  }
   loadProduct(){
    this.shopService.getProduct(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe( product => {
      this.product = product
    },error => {
      console.log(error)
    })

  }

}
