import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent {
  baseUrl = enviroment.apiUrl
  validationError:any;
  constructor(private http:HttpClient){}

  get404Error(){
    this.http.get(this.baseUrl + '/api/products/42').subscribe(response => {
      console.log(response)
    },error => console.log(error)
    )
  }

  get500Error(){
    this.http.get(this.baseUrl + '/api/Buggy/servererror').subscribe(response => {
      console.log(response)
    },error => console.log(error)
    )
  }

  get400Error(){
    this.http.get(this.baseUrl + '/api/Buggy/badrequest').subscribe(response => {
      console.log(response)
    },error => console.log(error)
    )
  }

  get400ValidationError(){
    this.http.get(this.baseUrl + '/api/products/fortytwo').subscribe(response => {
      console.log(response)
    },error => {
      console.log(error)
      this.validationError = error.errors
    }
    )
  }
}
