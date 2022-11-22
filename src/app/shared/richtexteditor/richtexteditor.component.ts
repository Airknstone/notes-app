import { Component, OnInit, Input } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

interface Tag {
  tag: string;
}

@Component({
  selector: 'app-richtexteditor',
  templateUrl: './richtexteditor.component.html',
  styleUrls: [ './richtexteditor.component.scss' ]
})
export class RichtexteditorComponent implements OnInit {
  noteSection = new FormGroup({
    title: new FormControl(''),
    control: new FormControl(''),
    tag: new FormControl('')
  });
  completeNote: Object = {};

  selectedTag: string = '';
  tag: Tag[] = [
    { tag: 'Typescript' },
    { tag: 'JAva' },
  ];

  @Output() note = new EventEmitter<any>();
  constructor () { }

  ngOnInit(): void {

  }
  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    // console.log('editor-change', event);
  }

  save(): void {
    this.completeNote = {
      "title": this.noteSection.get('title')!.value,
      "description": this.noteSection.get('control')!.value,
      "tag": this.noteSection.get('tag')!.value
    };
    console.log(this.completeNote);
    this.note.emit(this.completeNote);

    this.noteSection.controls[ 'title' ].setValue('');
    this.noteSection.controls[ 'control' ].setValue('');
    this.noteSection.controls[ 'tag' ].setValue('');

  }
}
