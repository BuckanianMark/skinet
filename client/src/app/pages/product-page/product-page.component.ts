import { Component,OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/products';
import { ShopService } from '../../shared/services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
//import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit{
  product:IProduct | any;
  constructor(private bcService:BreadcrumbService,private shopService:ShopService,private activatedRoute:ActivatedRoute){

  }
  ngOnInit(): void {
    this.loadProduct()
  }
  loadProduct(){

    // this.shopService.getProduct(this.activatedRoute.snapshot.paramMap.get('id')).subscribe( product => {
    //   this.product = product
    //   this.bcService.set('@productDetails',product.name)
    // },error => {
    //   console.log(error)
    // })

    const idParam = this.activatedRoute.snapshot.paramMap.get('id');

    if (idParam !== null) {
      const productId = parseInt(idParam);
  
      if (!isNaN(productId)) {
        this.shopService.getProduct(productId).subscribe(product => {
          this.product = product;
          this.bcService.set('@productDetails', product.name);
        }, error => {
          console.log(error);
        });
      } else {
        console.log('Invalid product ID');
      }
    } else {
      console.log('Product ID is missing in the route');
    }
  }

}
