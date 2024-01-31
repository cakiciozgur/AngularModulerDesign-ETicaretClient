import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketModule } from './basket/basket.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { BasketComponent } from './basket/basket.component';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketModule,
    RegisterModule
    //LoginModule
  ],
  exports: [
    BasketModule
  ]
})
export class ComponentsModule { }
