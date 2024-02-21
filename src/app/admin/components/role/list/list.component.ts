import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { RoleService } from '../../../../services/common/models/role.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { List_Role } from '../../../../contracts/role/list_role';
import { RequestParameters } from '../../../../services/common/http-client.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private roleService: RoleService) {
    super(spinner)
  }

  displayedColumns: string[] = ['name', 'edit', 'delete'];

  dataSource: MatTableDataSource<List_Role> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getRoles() {
    this.showSpinner(SpinnerType.Timer);
    const allRoles: { totalRoleCount: number; roles: any } = await this.roleService.getRoles(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => this.hideSpinner(SpinnerType.Timer),
      errorMessage => this.alertifyService.message("Hatalı", { dismissOther: true, messageType: MessageType.Error, position: Position.TopCenter }))

    const roles: List_Role[] = [];

    for (const key in allRoles.roles) {
      if (allRoles.roles.hasOwnProperty(key)) {
        const id = key;
        const name = allRoles.roles[key];
        const role = new List_Role(id, name);
        roles.push(role);
      }
    }
    this.dataSource = new MatTableDataSource<List_Role>(roles);
    this.paginator.length = allRoles.totalRoleCount;
  }

  async pageChanged() {
    await this.getRoles();
  }

  async ngOnInit() {
    await this.getRoles();

  }

  requestParameters: RequestParameters = {
    controller: "roles"
  }
}
