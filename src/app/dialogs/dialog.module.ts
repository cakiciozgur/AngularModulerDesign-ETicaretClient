import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { RemoveBasketItemDialogComponent } from './remove-basket-item-dialog/remove-basket-item-dialog.component';
import { ShoppingCompleteDialogComponent } from './shopping-complete-dialog/shopping-complete-dialog.component';
import { OrderDetailDialogComponent } from './order-detail-dialog/OrderDetailDialogComponent';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CompleteOrderDialogComponent } from './compete-order-dialog/complete-order-dialog.component';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
    RemoveBasketItemDialogComponent,
    ShoppingCompleteDialogComponent,
    OrderDetailDialogComponent,
    CompleteOrderDialogComponent,
    AuthorizeMenuDialogComponent

  ],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule, MatCardModule, MatIconModule, MatExpansionModule, MatCheckboxModule, MatRadioModule, MatTableModule, MatInputModule, MatToolbarModule, MatBadgeModule, MatListModule,
    FileUploadModule,
    FlexLayoutModule
  ],
  exports: [
    DeleteDialogComponent
  ]
})
export class DialogModule { }
