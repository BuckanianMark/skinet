import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  returnUrl!:string;

  constructor(private activatedRote:ActivatedRoute,private router:Router,private fb:FormBuilder,private accountService:AccountService){
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      password:['',Validators.required]
    })
  }
  ngOnInit(): void {
   this.returnUrl = this.activatedRote.snapshot.queryParams['returnUrl'] || '/shop'
  }

  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    },error => {
      console.log(error);
    })
  }

}
