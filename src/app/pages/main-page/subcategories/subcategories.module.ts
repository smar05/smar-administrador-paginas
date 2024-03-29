import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcategoriesComponent } from './subcategories.component';
import { SubcategoriesRoutingModule } from './subcategories-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { ReactiveFormsModule } from '@angular/forms';
import { NewSubcategoriesComponent } from './new-subcategories/new-subcategories.component';
import { EditSubcategoriesComponent } from './edit-subcategories/edit-subcategories.component';

@NgModule({
  declarations: [
    SubcategoriesComponent,
    NewSubcategoriesComponent,
    EditSubcategoriesComponent,
  ],
  imports: [
    CommonModule,
    SubcategoriesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class SubcategoriesModule {}
