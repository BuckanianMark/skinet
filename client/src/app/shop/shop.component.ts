import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../shared/models/products';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

  products:IProduct[] | any;
  constructor(private shopService:ShopService){

  }
  ngOnInit(): void {
    this.shopService.getProducts().subscribe((response) => {
      
      this.products = response
      
    }, error => {
      console.log(error)
    })
  }

}
