import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
/* Material components Imports */
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { ViewNotesComponent } from './pages/view-notes/view-notes.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { DialogBoxComponent } from './shared/dialog-box/dialog-box.component';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddCategoryComponent,
    ViewNotesComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    MatMenuModule,
    MatListModule,
    TextFieldModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
