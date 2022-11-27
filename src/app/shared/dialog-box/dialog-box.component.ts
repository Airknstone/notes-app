import { DialogData } from './../interfaces/dialog.interface';
import { ChangeDetectionStrategy, Component, Inject, OnInit, NgZone, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: [ './dialog-box.component.scss' ]
})
export class DialogBoxComponent implements OnInit {

  addCategory = new FormGroup({
    title: new FormControl('', [ Validators.required ]),
    message: new FormControl('', [ Validators.required ])
  });
  constructor (@Inject(MAT_DIALOG_DATA) public data: DialogData, private _ngZone: NgZone, public dialogRef: MatDialogRef<DialogBoxComponent>) {
    if (data) {
      this.addCategory.controls[ 'title' ].setValue(data.title),
        this.addCategory.controls[ 'message' ].setValue(data.message);
    }
  }
  onclose() {
    const newData = {
      folderName: this.addCategory.controls[ 'title' ].value,
      description: this.addCategory.controls[ 'message' ].value,

    };
    this.dialogRef.close(newData);
  }
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
  ngOnInit(): void {
  }

}
