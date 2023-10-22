import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { NavBarComponent } from "./core/nav-bar/nav-bar.component";
import { HttpClientModule } from '@angular/common/http';
//import { CoreModule } from './core/core.module';
//import { ShopModule } from './shop/shop.module';
//import { HomeModule } from './home/home.module';
import { NavComponent } from "./components/nav/nav.component";
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
//import { CommonModule } from '@angular/common';



@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        HomeComponent,
        ShopComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,  
        RouterModule
    ]
})
export class AppModule { }
