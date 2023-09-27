import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { INoteData } from 'src/app/utils/app.types';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  title: string = '';
  description: string = '';
  isEditMode: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<NoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: INoteData
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.title = this.data.title;
      this.description = this.data.description;
      this.isEditMode = this.data.isEditMode
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    this.dialogRef.close({title: this.title, description: this.description});
  }
}
