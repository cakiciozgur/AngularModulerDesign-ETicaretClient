import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms'; // ReactiveFormsModule ekleyin
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: "", component: LoginComponent }
    ])
  ]
})
export class LoginModule { }
