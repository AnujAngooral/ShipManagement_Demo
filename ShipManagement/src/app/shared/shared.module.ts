import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NGXLogger } from 'ngx-logger';


@NgModule({
  imports: [

  ],
  declarations: [],
  exports:[CommonModule,ReactiveFormsModule, MatButtonModule, MatTableModule,
          MatSortModule,MatButtonModule,  MatPaginatorModule, MatFormFieldModule, MatInputModule
        ,BrowserAnimationsModule ]
})
export class SharedModule { }
