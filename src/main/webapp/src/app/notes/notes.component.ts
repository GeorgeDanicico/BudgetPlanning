import { Component, OnInit } from '@angular/core';
import { NoteDialogService } from '../services/note-dialog.service';
import { INoteData } from '../utils/app.types';
import { NotesService } from '../services/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: any[] = [];

  constructor(private noteDialogService: NoteDialogService,
              private notesService: NotesService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.notesService.getAllNotes().subscribe((data) => {
      this.notes = data;
    })
  }

  addNote() {
    const noteData: INoteData = { title: '', description: '', isEditMode: false };
    const dialogRef = this.noteDialogService.openNoteDialog(noteData);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notesService.addNote(result.title, result.description).subscribe((response) => {
          console.log(response);
        })
        console.log('Note added:', result);
      }
    });
  }

  editNote(noteId: number, noteTitle: string, noteDescription: string) {
    const noteData: INoteData = { title: noteTitle, description: noteDescription, isEditMode: true };
    const dialogRef = this.noteDialogService.openNoteDialog(noteData);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notesService.editNote(noteId, result.title, result.description).subscribe((response) => {
          console.log(response);
        });
        console.log('Note edited:', result);
      }
    });
  }

}
