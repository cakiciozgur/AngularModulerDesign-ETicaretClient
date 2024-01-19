import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CustomeToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custome-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { _isAuthenticated } from '../../services/common/auth.service';



export const authGuard: CanActivateFn = (route /*// route hangi urlden geldiğimiz bilgisini tutar*/, state /*// state ise gitmek için tıkladığımız urli tutar*/) => { 

  const router: Router = inject(Router);
  const toastrSevice: CustomeToastrService = inject(CustomeToastrService);
  const spinner: NgxSpinnerService = inject(NgxSpinnerService);

  spinner.show(SpinnerType.BallClipRotatePulse);

  if (!_isAuthenticated) {
    router.navigate(["login"], { queryParams: { returnUrl: state.url } }); /* hangi sayfaya gitmek istediysek ve orada guard devreye girdiyse returnUrl isminde bir değişken oluşturup buna ilgili url'i atıyoruz*/
    toastrSevice.message("Oturum açmanız gerekiyor", "Yetkisiz Erişim", { position: ToastrPosition.TopRight, messageType: ToastrMessageType.Warning, timeOut:2000 });
  }

  spinner.hide(SpinnerType.BallClipRotatePulse);
  return true;
};
