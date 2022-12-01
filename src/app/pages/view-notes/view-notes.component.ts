import { definition } from './../../../../server/models/dictionary.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Notes } from 'src/app/shared/interfaces/notes.interface';
import { NotesService } from 'src/app/shared/services/notes-service/notes.service';
import { DefinitionsService } from './../../shared/services/definitions-service/definitions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Definitions } from './../../shared/interfaces/definitions.interface';
import { skip } from 'rxjs';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: [ './view-notes.component.scss' ]
})
export class ViewNotesComponent implements OnInit {
  foldersId: string;
  notes!: Notes;

  constructor
    (private route: ActivatedRoute,
      private notesService: NotesService,
      private definitionService: DefinitionsService,
      private _snackBar: MatSnackBar
    ) {
    this.foldersId = this.route.snapshot.paramMap.get('noteId') as string;
    this.getFolderById();
  }

  getFolderById() {
    this.notesService.findFolderById(this.foldersId).subscribe({
      next: (res) => {
        this.notes = res.data;
        console.log(this.notes);
      }
    });
  }

  selectText(event: Event) {
    event.preventDefault();
    const text = window.getSelection()?.toString();
    this.definitionService.getMatchingTerms(text!).subscribe({
      next: (res) => {
        let snack = this._snackBar.open(/* this.formatSnackBarResponse(res.data) */ 'Loading...', 'close', {
          panelClass: [ 'white-snackbar' ],
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        snack.afterOpened().subscribe(() => {
          let responseTemplate = this.formatSnackBarResponse(res.data);
          document.getElementsByClassName("mat-simple-snack-bar-content")[ 0 ].innerHTML = responseTemplate;
        });
      }
    });
  }

  formatSnackBarResponse(dataArr: Array<Definitions>) {
    if (dataArr.length > 0) {
      let data: string = '';
      dataArr.forEach((definition, index) => {
        console.log(definition);
        data += `<p><b>${definition.word}</b> - <i>${definition.wordtype}</i></p>
        <p>${definition.definition}</p>`;
      });
      return data;
    }
    else {
      return 'No Results Found.';
    }
  }

  /* component binding */
  noteAdded(data: any) {
    if (data === true) {
      this.getFolderById();
    }
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
