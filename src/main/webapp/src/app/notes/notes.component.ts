import { Component, OnInit } from '@angular/core';
import { NoteDialogService } from '../services/note-dialog.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: any[] = [];

  constructor(private noteDialogService: NoteDialogService) { }

  ngOnInit(): void {
    this.notes = [{
        title: 'Note Title',
        description: 'Note description',
      },
      {
        title: 'Note Title',
        description: 'Note description',
      },
      {
        title: 'Note Title',
        description: 'Note description',
      },
      {
        title: 'Note Title',
        description: 'Note description',
      },
      {
        title: 'Note Title',
        description: 'Note description',
      },
      {
        title: 'Note Title',
        description: 'Note description',
      }
    ];
  }

  addNote() {
    const dialogRef = this.noteDialogService.openNoteDialog();

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result (e.g., add the note)
        console.log('Note added:', result);
      }
    });
  }

}
