import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: [ './view-notes.component.scss' ]
})
export class ViewNotesComponent implements OnInit {
  noteId: string;
  constructor (private route: ActivatedRoute) {
    this.noteId = this.route.snapshot.paramMap.get('noteId') || 'noteId';
  }

  ngOnInit(): void {
  }

}
