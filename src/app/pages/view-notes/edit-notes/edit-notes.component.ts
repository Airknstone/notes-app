import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { INoteItems } from 'src/app/shared/interfaces/notes.interface';
import { NotesService } from 'src/app/shared/services/notes-service/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: [ './edit-notes.component.scss' ]
})
export class EditNotesComponent implements OnInit {
  editorStyle = {
    'min-height': '380px',
    'border': 'none'
  };

  config = {
    toolbar: [
      [ 'bold', 'italic', 'underline', 'strike' ],        // toggled buttons
      [ 'blockquote', 'code-block' ],
      [ { 'header': 1 }, { 'header': 2 } ],               // custom button values
      [ { 'list': 'ordered' }, { 'list': 'bullet' } ],
      [ { 'script': 'sub' }, { 'script': 'super' } ],      // superscript/subscript
      [ { 'indent': '-1' }, { 'indent': '+1' } ],          // outdent/indent
      [ 'direction', { 'align': [] } ],
      [ 'link', 'image', 'video', 'formula' ],                      // text direction
      [ { 'header': [ 1, 2, 3, 4, 5, 6, false ] } ],
      [ { 'color': [] }, { 'background': [] } ],          // dropdown with defaults from theme
      [ { 'font': [] } ],
      [ { 'align': [] } ],
      [ 'clean' ]                                         // remove formatting button
    ]
  };
  folderId!: string;
  noteSection: FormGroup;
  noteData = {} as INoteItems;

  constructor (private fb: FormBuilder,
    private route: ActivatedRoute,
    private noteService: NotesService,
    private router: Router) {

    this.route.paramMap.subscribe(res => {
      this.folderId = res.get('noteId') ?? '';
      console.log(this.folderId);
    });
    this.noteData = history.state;
    console.log(this.noteData);
    this.noteSection = this.fb.group({
      title: this.noteData.noteTitle,
      control: this.noteData.noteBody,
      tag: [ this.noteData.tags?.map(x => x) ]
    });

    console.log(this.noteSection);
  }
  ngOnInit(): void {
  }

  save() {
    const updatedNote = {
      noteTitle: this.noteSection.value.title,
      noteBody: this.noteSection.value.control,
      tags: this.noteSection.value.tag,
    };

    this.noteService.updateNote(this.folderId, this.noteData._id, updatedNote).subscribe({
      next: (res) => {
        this.router.navigate([ `view-notes/${this.folderId}` ]);
      }
    });

    console.log(updatedNote);
  }
}
