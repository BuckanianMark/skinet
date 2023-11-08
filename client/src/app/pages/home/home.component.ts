import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../shared/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products:any;
  constructor(private hs:HomeService){}
  ngOnInit(): void {
    this.loadProducts()
  }

 

  loadProducts(){

    this.products = this.hs.products;
    console.log(this.hs.products);
  }



}
