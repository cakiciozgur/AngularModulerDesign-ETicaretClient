import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../services/common/models/role.service';
import { List_Role } from '../../contracts/role/list_role';
import { MatSelectionList } from '@angular/material/list';
import { AuthorizationEndpointService } from '../../services/common/authorization-endpoint.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrl: './authorize-menu-dialog.component.scss'
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private authotizationEndpointService: AuthorizationEndpointService,
    private spinnerService: NgxSpinnerService) {
    super(dialogRef);
  }

  allRoles: { roles: any, totalRoleCount: number };
  datas: List_Role[] = [];
  assignedRoles: any;
  totalCount: number;

  listRoles: { name: string, id:string, assigned: boolean }[]

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
    this.assignedRoles = await this.authotizationEndpointService.getRolesToEndpoint(this.data.code, this.data.menuName);

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
    this.authotizationEndpointService.assignRoleEndpoint(roles, this.data.code, this.data.menuName,
    () =>
    {
      this.spinnerService.hide(SpinnerType.Timer);
    },
    () =>
    {

    })
  }
}

export enum AuthorizeMenuState {
  Yes, No
}

