import { DialogData } from './../../interfaces/dialog.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';


@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {


  constructor (private dialog: MatDialog) { }
  confirmDialog(data: DialogData): Observable<any> {
    return this.dialog.open(
      DialogBoxComponent, {
      data,
      width: '900px',
      height: '80vh',
      disableClose: true,
    }
    ).afterClosed();
  }

}
