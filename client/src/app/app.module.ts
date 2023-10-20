import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from "./core/nav-bar/nav-bar.component";
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';


@NgModule({
    declarations: [
        AppComponent,
        
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NavBarComponent,
        HttpClientModule,
        CoreModule
    ]
})
export class AppModule { }
