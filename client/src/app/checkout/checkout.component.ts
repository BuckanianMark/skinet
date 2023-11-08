import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  checkoutForm!:FormGroup;


  constructor(private fb:FormBuilder,private acountservice:AccountService,
    private basketService:BasketService){}

    createCheckoutForm(){
      this.checkoutForm = this.fb.group({
        addressForm:this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          street: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          zipcode: ['', Validators.required],
        }),
        deliveryForm:this.fb.group({
          deliveryMethod: ['', Validators.required]
        }),
        paymentForm:this.fb.group({
          nameOnCard: ['', Validators.required]
        })
      })
    }

    
    getAddressFormValues(){
      this.acountservice.getUsersAddress().subscribe(address => {
        if(address){
          this.checkoutForm.get('addressForm')?.patchValue(address);
        }
      }, error => console.log(error))
    }
   ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddressFormValues();
  }

}
