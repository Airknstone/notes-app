import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

/* QUill */
import { QuillModule } from 'ngx-quill';

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
import { AddFolderComponent } from './pages/add-folder/add-folder.component';
import { ViewNotesComponent } from './pages/view-notes/view-notes.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { DialogBoxComponent } from './shared/dialog-box/dialog-box.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { AddLinkDialogComponent } from './pages/add-link-dialog/add-link-dialog.component';
import { RichtexteditorComponent } from './shared/richtexteditor/richtexteditor.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddFolderComponent,
    ViewNotesComponent,
    DialogBoxComponent,
    AddLinkDialogComponent,
    RichtexteditorComponent
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
    TextFieldModule,
    QuillModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
