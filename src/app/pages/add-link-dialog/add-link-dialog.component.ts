import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-link-dialog',
  templateUrl: './add-link-dialog.component.html',
  styleUrls: [ './add-link-dialog.component.scss' ]
})
export class AddLinkDialogComponent implements OnInit {

  constructor (@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
