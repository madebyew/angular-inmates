import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './wrapper.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [WrapperComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  exports: [
    WrapperComponent
  ]
})
export class WrapperModule { }
