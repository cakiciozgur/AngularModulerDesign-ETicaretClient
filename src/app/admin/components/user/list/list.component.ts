import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { HttpClientService, RequestParameters } from '../../../../services/common/http-client.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '../../../../services/common/models/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { List_Order } from '../../../../contracts/order/list_order';
import { OrderDetailDialogComponent } from '../../../../dialogs/order-detail-dialog/OrderDetailDialogComponent';
import { UserService } from '../../../../services/common/models/user.service';
import { List_User } from '../../../../contracts/users/list_user';
import { AuthorizeUserDialogComponent } from '../../../../dialogs/authorize-user-dialog/authorize-user-dialog.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(private productService: ProductService,
    private userService: UserService,
    spinner: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService,
    private httpClientService: HttpClientService) {
    super(spinner)
  }

  displayedColumns: string[] = ['username', 'nameSurname', 'email', 'twoFactorEnabled', 'role', 'delete'];

  dataSource: MatTableDataSource<List_User> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getUsers() {
    this.showSpinner(SpinnerType.Timer);
    const allUsers: { totalUserCount: number; users: List_User[] } = await this.userService.getAllUsers(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => this.hideSpinner(SpinnerType.Timer),
      errorMessage => this.alertifyService.message("Hatalı", { dismissOther: true, messageType: MessageType.Error, position: Position.TopCenter }))

    this.dataSource = new MatTableDataSource<List_User>(allUsers.users);
    this.paginator.length = allUsers.totalUserCount;
  }

  async pageChanged() {
    await this.getUsers();
  }

  async ngOnInit() {
    await this.getUsers();

  }

  assignRole(id: string, username:string) {
    this.dialogService.openDialog({
      componentType: AuthorizeUserDialogComponent,
      data: { id:id, username:username },
      options: {
        width: "750px"
      },
      afterClosed: () => {
      }
    })
  }

  requestParameters: RequestParameters = {
    controller: "users"
  }
}
