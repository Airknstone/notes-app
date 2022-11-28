import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog/confirm-dialog.service';
import { NotesService } from 'src/app/shared/services/notes-service/notes.service';
import { Notes } from 'src/app/shared/interfaces/notes.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
  notes: Notes[];
  checked: string[];
  adding: boolean = false;

  dialogRef = {
    header: 'Add a new Category',
    label1: 'Title',
    label2: 'Description',
    title: '',
    message: '',
    confirmText: 'Save',
    cancelText: 'Cancel',
  };
  constructor (private notesService: NotesService, private dialogService: ConfirmDialogService, private router: Router) {
    this.checked = [];
    this.notes = [];
    this.notesService.getValue().subscribe((val) => {
      this.notes = val;
    });
  }
  ngOnInit(): void {
  }
  addTest() {
    this.adding = !this.adding;
    console.log(this.adding);
  }
  editDialog(folderId: string) {
    let dialogEdit = {
      header: 'Add a new Category',
      label1: 'Title',
      label2: 'Description',
      title: '',
      message: '',
      confirmText: 'Save',
      cancelText: 'Cancel',
    };
    this.notesService.findCategoryById(folderId).subscribe({
      next: (res) => {
        dialogEdit.header = "Editing Category";
        dialogEdit.title = res.data.folderName;
        dialogEdit.message = res.data.description;

        this.dialogService.confirmDialog(dialogEdit).subscribe(newNote => {
          console.log(newNote);
          if (newNote !== false) {
            this.notesService.updateFolder(folderId, newNote).subscribe({
              next: (res) => {
                this.router.navigate([ '/' ]);
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

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  openDialog() {
    this.dialogService.confirmDialog(this.dialogRef).subscribe(newNote => {
      console.log(newNote);
      if (newNote !== false) {
        this.notesService.addFolder(newNote).subscribe({
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
  addSelected(folderId: string): void {
    console.log('added to array' + folderId);
    this.checked.push(folderId);
  }
  removeSelected(folderId: string): void {
    this.checked = this.checked.filter(id => {
      return id !== folderId;
    });
  }
  changeEvent($event: any, folderId: string) {
    if ($event.checked === true) {
      this.addSelected(folderId);
    }
    else {
      this.removeSelected(folderId);
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


  deleteNote(folderId: string): void {
    console.log(folderId);
    /* Need to add Confirmation Dialogue  */
    this.notesService.deleteNoteCategory(folderId).subscribe({
      next: (res) => {

        console.log(`deleted ${folderId}`);
        this.notes = this.notes.filter((note: any) => note._id !== folderId);
        /* set value to update service variable */
        this.notesService.setValue(this.notes);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.removeSelected(folderId);
  }


}
