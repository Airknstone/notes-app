
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { INote } from './../../../../server/models/notes-model';
import { NotesService } from 'src/app/shared/services/notes-service/notes.service'; import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: [ './add-category.component.scss' ]
})
export class AddCategoryComponent implements OnInit {
  addCategory = new FormGroup({
    folderName: new FormControl(null, [ Validators.required ]),
    description: new FormControl(null, [ Validators.required ])
  });


  constructor (private notesService: NotesService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newNote: INote = {
      folderName: this.addCategory.controls[ 'folderName' ].value || "Category TItle from OnSubmit",
      description: this.addCategory.controls[ 'description' ].value || "Description from on submit",
      notes: []
    };

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
        this.router.navigate([ '/' ]);
      }
    });
  }
}
