import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/common/models/user.service';
import { Login_User_Request } from '../../../entities/login_user_request';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm: FormGroup;


  constructor(private fb: FormBuilder,
    private userService: UserService,
    spinner: NgxSpinnerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAutService: SocialAuthService)
  {
    super(spinner);
    socialAutService.authState.subscribe(async (user: SocialUser) => {
      this.showSpinner(SpinnerType.BallScaleRipple);
      switch (user.provider) {
        case "GOOGLE":
          await this.userService.googleLogin(user, () => {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerType.BallScaleRipple);
          });
          break;
        case "FACEBOOK":
          await this.userService.facebookLogin(user, () => {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerType.BallScaleRipple);
          });
          break;
      }
    });
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3)]]
    });
  }

  async submitLogin(data: Login_User_Request) {
    //console.log("-----------",this.loginForm);
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

  async facebookLogin() {
    this.socialAutService.signIn(FacebookLoginProvider.PROVIDER_ID)
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
