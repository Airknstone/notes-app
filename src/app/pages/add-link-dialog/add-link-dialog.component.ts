import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-link-dialog',
  templateUrl: './add-link-dialog.component.html',
  styleUrls: [ './add-link-dialog.component.scss' ]
})
export class AddLinkDialogComponent implements OnInit {
  addNote = new FormGroup({
    noteTitle: new FormControl(null, [ Validators.required ]),
    noteBody: new FormControl(null, [ Validators.required ]),
  });
  data = {
    header: 'Add a new Note',
    label1: 'Title',
    label2: 'Description',
    title: '',
    message: '',
    confirmText: 'Save',
    cancelText: 'Cancel',
  };

  constructor () {
  }

  ngOnInit(): void {
  }
  onclose() {

  }
}
