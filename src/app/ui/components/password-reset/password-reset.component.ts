import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { CustomeToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custome-toastr.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService, private userAuthService: UserAuthService, private toastrService: CustomeToastrService) {
    super(spinner)
  }

  passwordReset(email: string) {
    this.showSpinner(SpinnerType.Timer);
    this.userAuthService.passwordReset(email, () => {
      this.showSpinner(SpinnerType.Timer);
      this.toastrService.message("Mail Başarıyla Gönderilmiştir!", "Başarılı", { timeOut: 2100, messageType: ToastrMessageType.Info, position: ToastrPosition.TopCenter });
    })
  }
}
