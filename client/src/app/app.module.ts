import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { NavBarComponent } from "./core/nav-bar/nav-bar.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
//import { CoreModule } from './core/core.module';
//import { ShopModule } from './shop/shop.module';
//import { HomeModule } from './home/home.module';
import { NavComponent } from "./components/nav/nav.component";
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ErrorInterceptor } from './components/Interceptors/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
//import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './components/Interceptors/loading.interceptors';
//import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { BasketModule } from './basket/basket.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './account/login/login.component';
//import { TextInputComponent } from './components/text-input/text-input.component';
import { RegisterComponent } from './account/register/register.component';
//import { CdkStepperModule } from '@angular/cdk/stepper';
//import { StepperComponent } from './components/stepper/stepper.component';
//import { CheckoutModule } from './checkout/checkout.module';
import { JwtInterceptor } from './components/Interceptors/jwt.interceptor';
//import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        HomeComponent,
        ShopComponent,
        ProductPageComponent,
        SectionHeaderComponent,
        LoginComponent,
        RegisterComponent,
     
        
        
    ],
    
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,  
        BasketModule,
        RouterModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        BreadcrumbModule,
        NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
        ToastrModule.forRoot({
            positionClass:'toast-bottom-right',
            preventDuplicates:true
        })
    ],
    providers: [
        {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
        {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
        {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true}
    ]
   
})
export class AppModule { }
