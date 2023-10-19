import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './models/products';
import { IPagination } from './models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BuckNet';
  products:IProduct[] | undefined;

  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.http.get("http://localhost:5275/api/products").subscribe(
      (response:any) => {
      this.products = response;
  }, error => {
    console.log(error)
  })
  }
  
}
