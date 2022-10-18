import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notes } from 'src/app/shared/interfaces/notes.interface';
import { NotesService } from 'src/app/shared/services/notes.service';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: [ './view-notes.component.scss' ]
})
export class ViewNotesComponent implements OnInit {
  noteId: string;
  notes!: Notes;
  constructor (private route: ActivatedRoute, private notesService: NotesService) {
    this.noteId = this.route.snapshot.paramMap.get('noteId') as string;

    this.notesService.findCategoryById(this.noteId).subscribe({
      next: (res) => {
        this.notes = res.data;
        /*         console.log(this.notes); */
      }
    });

  }

  ngOnInit(): void {
  }

}
