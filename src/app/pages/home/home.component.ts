import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog/confirm-dialog.service';
import { NotesService } from 'src/app/shared/services/notes-service/notes.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
  notes: any;
  checked: string[];

  dialogRef = {
    header: 'Add a new Category',
    label1: 'Title',
    label2: 'Description',
    title: '',
    message: '',
    confirmText: 'Save',
    cancelText: 'Cancel',
  };
  constructor (private notesService: NotesService, private dialogService: ConfirmDialogService) {
    this.checked = [];

    this.notesService.getValue().subscribe((val) => {
      this.notes = val;
    });
  }
  ngOnInit(): void {
  }

  openDialog() {
    this.dialogService.confirmDialog(this.dialogRef).subscribe(newNote => {
      console.log(newNote);
      if (newNote !== false) {
        this.notesService.addCategory(newNote).subscribe({
          next: (res) => {

            this.notesService.findAllNotes().subscribe({
              next: (res) => {
                this.notesService.setValue(res.data);
              },
              error: (err) => {
                console.log(err);
              }
            });

          }
        });
        console.log(newNote);
      }
    });
  }
  addSelected(noteId: string): void {
    console.log('added to array' + noteId);
    this.checked.push(noteId);
  }
  removeSelected(noteId: string): void {
    this.checked = this.checked.filter(id => {
      return id !== noteId;
    });
  }
  changeEvent($event: any, noteId: string) {
    if ($event.checked === true) {
      this.addSelected(noteId);
    }
    else {
      this.removeSelected(noteId);
    }
    $event.source.focus();
  }
  deleteGroup() {
    let objIdArr: string = this.checked.toString();

    this.notesService.deleteArrayOfObjId(objIdArr).subscribe({
      next: (res) => {
        console.log(`deleted ${objIdArr}`);
        this.notes = this.notes.filter((note: any) => {
          return !objIdArr.includes(note._id);
        });
        console.log(this.notes);

        this.notesService.setValue(this.notes);
        this.checked = [];
      },
      error: err => console.log(err)
    });
  }

  updateCategory(noteId: string): void {
    const updateCategory = {

    };

    this.notesService.updateCategory(noteId);
  }

  deleteNote(noteId: string): void {
    console.log(noteId);
    /* Need to add Confirmation Dialogue  */
    this.notesService.deleteNoteCategory(noteId).subscribe({
      next: (res) => {

        console.log(`deleted ${noteId}`);
        this.notes = this.notes.filter((note: any) => note._id !== noteId);
        /* set value to update service variable */
        this.notesService.setValue(this.notes);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.removeSelected(noteId);
  }


}
