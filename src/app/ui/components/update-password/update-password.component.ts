import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { CustomeToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custome-toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'console';
import { UserService } from '../../../services/common/models/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private userAuthService: UserAuthService, private toastrService: CustomeToastrService, private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {
    super(spinner)
  }

  isVerifyResetToken: boolean = false;

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Timer);
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId:string = params["userId"];
        const resetToken: string = params["resetToken"];
        this.isVerifyResetToken = await this.userAuthService.verifyResetToken(resetToken, userId, () => {
          this.hideSpinner(SpinnerType.Timer);
        });
      }
    })
  }

  updatePassword(password, passwordConfirm) {
    this.showSpinner(SpinnerType.Timer);
    if (password != passwordConfirm) {
      this.toastrService.message("Şifreler eşleşmiyor!", "Hatalı", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight, timeOut: 2000 })
      this.hideSpinner(SpinnerType.Timer);
      return;
    }

    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        await this.userService.updatePassword(userId, resetToken, password, passwordConfirm,
          () => {
            this.toastrService.message("Şifre başarıyla güncellendi!", "Başarılı", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight, timeOut: 2000 });
            this.router.navigate(["/login"]);
          },
          error => {
            console.log(error);
            //this.toastrService.message("Şifre güncellenemedi!", "Hatalı", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight, timeOut: 2000 })
          });
        this.hideSpinner(SpinnerType.Timer);
      }
    });

  }
  
}
