import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { RoleService } from '../../../../services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private roleService: RoleService) {
    super(spinner);
  }

  @Output() createdRole: EventEmitter<string> = new EventEmitter();

  create(name: HTMLInputElement) {
    this.showSpinner(SpinnerType.Timer);

    this.roleService.create(name.value, () => {
      this.hideSpinner(SpinnerType.Timer);
      this.alertifyService.message("Role Başarıyla Eklendi", { messageType: MessageType.Success, position: Position.TopRight, dismissOther: true });
      this.createdRole.emit(name.value);
    }, errorMessage => {
      this.alertifyService.message(errorMessage, { messageType: MessageType.Error, position: Position.TopRight, dismissOther: true });
    });
  }
}
