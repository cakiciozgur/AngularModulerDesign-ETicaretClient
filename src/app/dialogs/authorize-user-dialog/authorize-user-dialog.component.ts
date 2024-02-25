import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorizationEndpointService } from '../../services/common/authorization-endpoint.service';
import { RoleService } from '../../services/common/models/role.service';
import { UserService } from '../../services/common/models/user.service';
import { MatSelectionList } from '@angular/material/list';
import { SpinnerType } from '../../base/base.component';
import { List_Role } from '../../contracts/role/list_role';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrl: './authorize-user-dialog.component.scss'
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private userService: UserService,
    private spinnerService: NgxSpinnerService, private alertifyService: AlertifyService) {
    super(dialogRef);
  }

  allRoles: { roles: any, totalRoleCount: number };
  datas: List_Role[] = [];
  assignedRoles: any;
  totalCount: number;

  listRoles: { name: string, id: string, assigned: boolean }[]

  async ngOnInit() {
    this.allRoles = await this.roleService.getRoles(-1, -1);
    for (const key in this.allRoles.roles) {
      if (this.allRoles.roles.hasOwnProperty(key)) {
        const id = key;
        const name = this.allRoles.roles[key];
        const role = new List_Role(id, name);
        this.datas.push(role);
      }
    }
    this.totalCount = this.allRoles.totalRoleCount;
    this.assignedRoles = await this.userService.getRolesToUser(this.data, () => {
      this.spinnerService.hide(SpinnerType.Timer);
    });

    this.listRoles = this.datas.map(d => {
      const assigned: boolean = false;

      return {
        name: d.name,
        id: d.id,
        assigned: this.assignedRoles?.indexOf(d.name) > -1
      };
    })

  }

  assignRole(rolesComponent: MatSelectionList) {
    const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o.value);
    this.spinnerService.show(SpinnerType.Timer);
    this.userService.assignRoleUser(roles, this.data,
      () => {
        this.spinnerService.hide(SpinnerType.Timer);
        this.alertifyService.message("Roller Başarıyla Atanmıştır", { dismissOther: true, messageType: MessageType.Success, position: Position.TopCenter })
      },
      () => {

      })
  }
}
