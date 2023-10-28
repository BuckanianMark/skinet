import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { IProduct } from 'src/app/shared/models/products';
import { IBrand } from 'src/app/shared/models/brands';
import { IType } from 'src/app/shared/models/productType';
import { shopParams } from '../../shared/models/shopParams';
import { ShopService } from '../../shared/services/shop.service';
//import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  @ViewChild('search',{static:false}) searchTerm:ElementRef | any

  products:IProduct[] | any;
  brands:IBrand[] | undefined;
  types:IType[] | undefined;
  totalCount!:number;
  shopParams = new shopParams()
  sortOptions = [
    {name:'Alphabetical',value:'name'},
    {name:'Price:Low to High',value:'priceAsc'},
    {name:'Price:High to Low',value:'priceDesc'},
    
  ];

  constructor(private shopService:ShopService){

  }
  ngOnInit(): void {
   this.getProducts()
   this.getBrands()
   this.getTypes()
  }
  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe((response) => {  
      this.products = response
      
      // this.shopParams.pageNumber = response?.pageIndex;
      // this.shopParams.pageSize = response?.pageSize
      // this.totalCount = response?.count
        
      }, error => {
        console.log(error)
      }) 
  }
  getBrands() {
    this.shopService.getProductBrands().subscribe(response => {
        this.brands = [{id:0, name:'All'},...response];
    }, error => {
      console.log(error)
    }) 
  }
  getTypes() {
    this.shopService.getProductTypes().subscribe(response => {
        this.types = [{id:0, name:'All'},...response];
    }, error => {
      console.log(error)
    }) 
  }
  onBrandSelected(brandId:number){
    this.shopParams.brandId = brandId
    this.shopParams.pageNumber = 1
    this.getProducts();
  }
  onTypeSelected(typeId:number){
    //const filterValue = (event?.target as HTMLSelectElement).value
    this.shopParams.typeId = typeId
    this.shopParams.pageNumber = 1
    this.getProducts()
  }
  onSortSelected(sort:string){
      this.shopParams.sort = sort;
      this.getProducts()
  }
  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value
    this.shopParams.pageNumber = 1
    this.getProducts();

  }
  onReset(){
    this.searchTerm.nativeElement.value = "";
    this.shopParams = new shopParams();
    this.getProducts()
  }
}
