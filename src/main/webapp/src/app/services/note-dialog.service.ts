import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteComponent } from '../notes/note/note.component';

@Injectable({
  providedIn: 'root'
})
export class NoteDialogService {

  constructor(private dialog: MatDialog) {}

  openNoteDialog() {
    return this.dialog.open(NoteComponent, {
      width: '400px',
      data: {},
    });
  }
}
