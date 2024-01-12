import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/common/models/user.service';
import { CustomeToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custome-toastr.service';
import { Login_User_Request } from '../../../entities/login_user_request';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Login_User_Response } from '../../../contracts/users/login_user_response';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private userService: UserService, private toastrService: CustomeToastrService, spinner: NgxSpinnerService, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router)
  {
    super(spinner);
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(6)]]
    });
  }

  async submitLogin(data: Login_User_Request) {
    console.log("-----------",this.loginForm);
    if (this.loginForm.valid) {
      this.showSpinner(SpinnerType.Timer);
      //debugger;
      await this.userService.login(data, () => {
        this.authService.identityCheck();

        this.activatedRoute.queryParams.subscribe(params => {
          const returnUrl: string = params["returnUrl"];
          if (returnUrl) {
            this.router.navigate([returnUrl]);
          }
        })
        this.hideSpinner(SpinnerType.Timer);
      });
    }
  }

  get component() {
    console.log(this.loginForm.controls);
    return this.loginForm.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return control.invalid && (control.dirty || control.touched);
  }
}
