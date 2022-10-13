import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/shared/services/notes.service';
import { Notes } from 'src/app/shared/interfaces/notes.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
  notes: Notes[];
  constructor (private notesService: NotesService) {

    this.notes = [];
    this.notesService.findAllNotes().subscribe({
      next: (res) => {
        console.log(res);
        this.notes = res.data;
        console.log(this.notes);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
  }

}
