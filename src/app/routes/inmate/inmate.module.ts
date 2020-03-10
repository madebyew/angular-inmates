import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InmateListComponent } from './list/inmate-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

import { MatButtonModule } from '@angular/material/button';
import { InmateAddEditComponent } from './add-edit/inmate-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    InmateListComponent,
    InmateAddEditComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDividerModule
  ]
})
export class InmateModule { }
