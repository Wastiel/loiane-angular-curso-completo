import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataFormComponent } from './data-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormDebugComponent } from '../shared/form-debug/form-debug.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { InputFieldComponent } from '../shared/input-field/input-field.component';



@NgModule({
  declarations: [
    DataFormComponent,     
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,   
  ]
})
export class DataFormModule { }
