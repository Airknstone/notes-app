
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Notes } from 'src/app/shared/interfaces/notes.interface';
import { NotesService } from 'src/app/shared/services/notes-service/notes.service';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: [ './view-notes.component.scss' ]
})
export class ViewNotesComponent implements OnInit {
  foldersId: string;
  notes!: Notes;

  constructor (private route: ActivatedRoute, private notesService: NotesService) {
    this.foldersId = this.route.snapshot.paramMap.get('noteId') as string;

    this.getFolderById();
  }
  /* TODO CREATE FUNCTION TO RE RENDER / RE call API and create DOUBLE BIND to TOOLS */
  getFolderById() {
    this.notesService.findFolderById(this.foldersId).subscribe({
      next: (res) => {
        this.notes = res.data;
        console.log(this.notes);
      }
    });
  }
  deleteNote(folderId: string, noteId: string) {
    console.log(folderId, noteId);
    this.notesService.deleteNoteInsideFolder(folderId, noteId).subscribe({
      next: (res) => {
        this.getFolderById();
      }
    });
  }
  onClickScroll(elementId: any) {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnInit(): void {
  }

}
