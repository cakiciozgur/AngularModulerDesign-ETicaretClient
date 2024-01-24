import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomeToastrService, ToastrMessageType, ToastrPosition } from '../ui/custome-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomeToastrService, private userAuthService: UserAuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(catchError(error => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.toastrService.message("Unauthorized Access", "Authorization", { position: ToastrPosition.BottomFullWidth, messageType: ToastrMessageType.Warning, timeOut: 3000 })

            const refreshToken = (typeof window !== "undefined" && window.localStorage) ? localStorage.getItem("refreshToken") : null;
            this.userAuthService.refreshTokenLogin(refreshToken).then(data => {

            });
            break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.message("Server Not Found", "Server Error", { position: ToastrPosition.BottomFullWidth, messageType: ToastrMessageType.Warning, timeOut: 3000 })
            break;
          case HttpStatusCode.BadRequest:
            this.toastrService.message("Bad Request", "Request Error", { position: ToastrPosition.BottomFullWidth, messageType: ToastrMessageType.Warning, timeOut: 3000 })
            break;
          case HttpStatusCode.NoContent:
            this.toastrService.message("Transaction Success", "Success", { position: ToastrPosition.BottomFullWidth, messageType: ToastrMessageType.Warning, timeOut: 3000 })
            break;
          case HttpStatusCode.NotFound:
            this.toastrService.message("Not Found", "Error", { position: ToastrPosition.BottomFullWidth, messageType: ToastrMessageType.Warning, timeOut: 3000 })
            break;
          default:
            this.toastrService.message("An error occurred", "Error", { position: ToastrPosition.BottomFullWidth, messageType: ToastrMessageType.Warning, timeOut: 3000 })
        }
        return of(error);
      }))
    }
}
