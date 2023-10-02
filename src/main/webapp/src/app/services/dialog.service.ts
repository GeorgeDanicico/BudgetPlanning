import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteComponent } from '../notes/add-edit-note/note.component';
import { INoteData } from '../utils/app.types';
import { EventComponent } from '../calendar/event/event.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  openNoteDialog(data: INoteData) {
    return this.dialog.open(NoteComponent, {
      width: '400px',
      data: data,
    });
  }

  openEventDialog(eventData: any) {
    return this.dialog.open(EventComponent, {
      width: '420px',
      height: '400px',
      data: eventData,
    })
  }

  openConfirmationDialog(data: any) {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      height: '170px',
      data: data,
    })
  }


}
