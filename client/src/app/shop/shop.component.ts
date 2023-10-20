import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../shared/models/products';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brands';
import { IType } from '../shared/models/productType';
import { shopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

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
    this.getProducts();
  }
  onTypeSelected(typeId:number){
    //const filterValue = (event?.target as HTMLSelectElement).value
    this.shopParams.typeId = typeId
    this.getProducts()
  }
  onSortSelected(sort:string){
      this.shopParams.sort = sort;
      this.getProducts()
  }
}
