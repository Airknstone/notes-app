import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { INoteItems, Notes } from 'src/app/shared/interfaces/notes.interface';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: [ './tools.component.scss' ]
})
export class ToolsComponent implements OnChanges {
  @Input() notesList = {} as INoteItems[];
  @Output() noteTitleId = new EventEmitter<string>();
  filteredNoteList = {} as INoteItems[];
  constructor () {
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
}
