import { Component } from '@angular/core';
import { Notes } from './shared/interfaces/notes.interface';
import { NotesService } from './shared/services/notes-service/notes.service';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  title = 'notes-app';
  notes: Notes[];
  constructor (private notesService: NotesService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.notes = [];
    this.notesService.findAllNotes().subscribe({
      next: (res) => {
        console.log("Set Value From App Component");
        this.notesService.setValue(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.notesService.getValue().subscribe((val) => {
      console.log(val);
      this.notes = val;
    });

  }
  onClickScroll(elementId: string): void {
    /* Doesnt scroll to element in one click */
    this.router.navigate([ '/' ]).then(() => {
      document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
    });

  }
  navigate(noteId: string) {
    this.router.navigate([ `/view-notes/${noteId}` ]);


  }

}
