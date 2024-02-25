import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';
import { authGuard } from './guards/common/auth.guard';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';

const routes: Routes = [

  {
    path : "admin", component: LayoutComponent, children:
    [

        { path: "", component: DashboardComponent, canActivate: [authGuard] },

        { path: "customers", loadChildren: () => import("./admin/components/customer/customer.module").then(module => module.CustomerModule), canActivate: [authGuard] },

        { path: "products", loadChildren: () => import("./admin/components/product/product.module").then(module => module.ProductModule), canActivate: [authGuard] },

        { path: "orders", loadChildren: () => import("./admin/components/order/order.module").then(module => module.OrderModule), canActivate: [authGuard] },

        { path: "authorize-menu", loadChildren: () => import("./admin/components/authorize-menu/authorize-menu.module").then(module => module.AuthorizeMenuModule), canActivate: [authGuard] },

        { path: "roles", loadChildren: () => import("./admin/components/role/role.module").then(module => module.RoleModule), canActivate: [authGuard] },

        { path: "users", loadChildren: () => import("./admin/components/user/user.module").then(module => module.UserModule), canActivate: [authGuard] },

      ], canActivate: [authGuard]
  },

  {path : "", component: HomeComponent},
  {path : "basket",  loadChildren:() => import("./ui/components/basket/basket.module").then(module=> module.BasketModule)},
  {path : "products", loadChildren:() => import("./ui/components/products/products.module").then(module=> module.ProductsModule)},
  {path : "products/:pageNo", loadChildren:() => import("./ui/components/products/products.module").then(module=> module.ProductsModule)},
  {path : "register", loadChildren: () => import("./ui/components/register/register.module").then(module => module.RegisterModule) },
  {path : "login", loadChildren: () => import("./ui/components/login/login.module").then(module => module.LoginModule) },
  {path : "password-reset", loadChildren: () => import("./ui/components/password-reset/password-reset.module").then(module => module.PasswordResetModule) },
  {path : "update-password/:userId/:resetToken", loadChildren: () => import("./ui/components/update-password/update-password.module").then(module => module.UpdatePasswordModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
