import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from './../../../pipes/pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { EditOrdersComponent } from './edit-orders/edit-orders.component';

@NgModule({
  declarations: [OrdersComponent, EditOrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    PipesModule,
    SharedModule,
  ],
})
export class OrdersModule {}
