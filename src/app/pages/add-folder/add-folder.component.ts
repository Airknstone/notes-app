import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Notes } from '../../shared/interfaces/notes.interface';
import { NotesService } from 'src/app/shared/services/notes-service/notes.service'; import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-folder.component.html',
  styleUrls: [ './add-folder.component.scss' ]
})
export class AddFolderComponent implements OnInit {
  addFolder = new FormGroup({
    folderName: new FormControl(null, [ Validators.required ]),
    description: new FormControl(null, [ Validators.required ])
  });


  constructor (private notesService: NotesService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newNote: Notes = {
      _id: '',
      folderName: this.addFolder.controls[ 'folderName' ].value || "Folder Name from OnSubmit",
      description: this.addFolder.controls[ 'description' ].value || "Description from on submit",
      notes: []
    };

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
        this.router.navigate([ '/' ]);
      }
    });
  }
}
