import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';
import { RoleModule } from './role/role.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductModule,
    OrderModule,
    CustomerModule,
    DashboardModule,
    AuthorizeMenuModule,
    RoleModule
  ]
})
export class ComponentsModule { }
