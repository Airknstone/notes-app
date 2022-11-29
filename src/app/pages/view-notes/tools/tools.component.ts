import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { INoteItems, Notes } from 'src/app/shared/interfaces/notes.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddLinkDialogComponent } from '../../add-link-dialog/add-link-dialog.component';




@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: [ './tools.component.scss' ]
})
export class ToolsComponent implements OnChanges {
  @Input() notesList = {} as INoteItems[];
  @Output() noteTitleId = new EventEmitter<string>();

  @Output() showEditorChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() showEditor!: boolean;
  filteredNoteList = {} as INoteItems[];

  @Input() folder!: Notes;
  constructor (private dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.filteredNoteList = this.notesList.filter(item => {
      return item.noteTitle;
    });
  }
  onClickScroll(elementId: string): void {
    this.noteTitleId.emit(elementId);
  }
  openDialog() {

    const dialogRef = this.dialog.open(AddLinkDialogComponent, {
      width: '80vw',
      height: '95vh',
      disableClose: true,
      data: this.folder
    });
  }
  showEditorFunc() {
    this.showEditor = !this.showEditor;
    this.showEditorChange.emit(this.showEditor);

  }
}
