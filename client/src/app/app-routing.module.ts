import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { TestErrorComponent } from './components/test-error/test-error.component';
import { ServerErrorComponent } from './components/ErrorRedirects/server-error/server-error.component';
import { NotFoundComponent } from './components/ErrorRedirects/not-found/not-found.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'test-error',component:TestErrorComponent},
  {path:'server-error',component:ServerErrorComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'shop',component:ShopComponent},
  {path:'shop/:id',component:ProductPageComponent},
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
