import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import {  of, switchMap, timer } from 'rxjs';
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!:FormGroup;
  errors!:string[];

  constructor(private fb:FormBuilder,private accountService:AccountService,private router:Router){}
  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      displayName:['',Validators.required],
      email:['',
      [Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
      [this.validateEmailNotTaken()]],
      password:['',Validators.required]
    })
  }
  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/shop')
    },error => {
      console.log(error)
      this.errors = error.errors;
    })
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if(!control.value){
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
              return res ? {emailExists:true} : null;
            })
          )
        })
      )
    }
  }
}
