import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DialogService } from '../services/dialog.service';
import { INoteData, Note } from '../utils/app.types';
import { NotesService } from '../services/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  animations: [
    trigger('slideAndFade', [
      state('in', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('800ms ease-in-out'),
      ]),
    ]),
  ],
})
export class NotesComponent implements OnInit {
  isLoading: boolean = false;
  notes: Note[] = [];

  constructor(private noteDialogService: DialogService,
              private notesService: NotesService,
              private snackBar: MatSnackBar,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.isLoading = true;
    this.notesService.getAllNotes()
      .pipe(catchError((error) => {
        console.error('An error occured: ', error.error);
        this.isLoading = false;
        this.snackBar.open('An error has occured while loading the events.', 'Close', { duration: 3000 });
        return throwError(() => new Error(error.error));
      }))
      .subscribe((data) => {
        this.notes = data;
        this.isLoading = false;
      });
  }

  addNote() {
    const noteData: INoteData = { title: '', description: '', isEditMode: false };
    const dialogRef = this.noteDialogService.openNoteDialog(noteData);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.notesService.addNote(result.title, result.description)
        .pipe(catchError((error) => {
          this.isLoading = false;
          this.snackBar.open('An error has occured while trying save the note.', 'Close', { duration: 3000 });
          return throwError(() => new Error(error.error));
        })).subscribe((response: any) => {
          if (response.status === 201) {
            this.isLoading = false;
            const addedNote = response.note;
            this.notes.push(addedNote);
            this.changeDetector.detectChanges();
            console.log('Note added:', result);
            this.snackBar.open("Note added successfully.", 'Close');
          }
        })

      }
    });
  }

  editNote(noteId: number, noteTitle: string, noteDescription: string) {
    const noteData: INoteData = { title: noteTitle, description: noteDescription, isEditMode: true };
    const dialogRef = this.noteDialogService.openNoteDialog(noteData);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.notesService.editNote(noteId, result.title, result.description)
          .pipe(catchError((error) => {
            this.isLoading = false;
            this.snackBar.open('An error has occured while trying to edit the note.', 'Close', { duration: 3000 });
            return throwError(() => new Error(error.error));
          }))
          .subscribe((response: any) => {
          if (response.status === 200) {
            this.edit(noteId, result.title, result.description);
            this.changeDetector.detectChanges();
            this.snackBar.open("Note edited successfully.", 'Close');
            this.isLoading = false;
          }
        });
      }
    });
  }

  deleteNote(noteId: number) {
    if (confirm("Are you sure you want to delete the note?")) {
      this.isLoading = true;
      this.notesService.deleteNote(noteId)
        .pipe(catchError((error) => {
          console.error('An error occured: ', error.error);
          this.isLoading = false;
          this.snackBar.open('An error has occured while trying to log in. Please try again later.', 'Close', { duration: 3000 });
          return throwError(() => new Error(error.error));
        }))
        .subscribe((response: any) => {
          if (response.status === 200) {
            this.delete(noteId);
            this.isLoading = false;
            this.changeDetector.detectChanges();
            this.snackBar.open("Note deleted successfully.", 'Close');
          }
        });
    }
  }

  private edit(noteId: number, title: string, description: string) : void {
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].id === noteId) {
        this.notes[i] = {id: noteId, title: title, description: description};
        return;
      }
    }
  }

  private delete(noteId: number): void {
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].id === noteId) {
        this.notes.splice(i, 1);
      }
    }
  }

}
