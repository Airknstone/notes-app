import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { NotesService } from 'src/app/shared/services/notes-service/notes.service';
import { Notes } from 'src/app/shared/interfaces/notes.interface';

@Component({
  selector: 'app-add-link-dialog',
  templateUrl: './add-link-dialog.component.html',
  styleUrls: [ './add-link-dialog.component.scss' ]
})
export class AddLinkDialogComponent implements OnInit {
  folder: Notes;
  constructor (private notesService: NotesService, @Inject(MAT_DIALOG_DATA) public data: Notes, public dialogRef: MatDialogRef<AddLinkDialogComponent>) {
    this.folder = data;
  }
  addNote(data: Notes) {
    console.log(data);
    this.notesService.addNote(this.folder._id, data).subscribe({
      next: (res) => {
        this.dialogRef.close();
        /*         this.notesService.findFolderById(this.folder._id).subscribe({
                  next: (res) => {
                    this.folder = res.data;
                    console.log(this.folder);

                  }
                }); */
      }
    });
  }
  ngOnInit(): void {
  }
  onclose() {

  }
}
