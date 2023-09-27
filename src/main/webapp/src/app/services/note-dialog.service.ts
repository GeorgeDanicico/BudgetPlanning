import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteComponent } from '../notes/add-edit-note/note.component';
import { INoteData } from '../utils/app.types';

@Injectable({
  providedIn: 'root'
})
export class NoteDialogService {

  constructor(private dialog: MatDialog) {}

  openNoteDialog(data: INoteData) {
    return this.dialog.open(NoteComponent, {
      width: '400px',
      data: data,
    });
  }
}
