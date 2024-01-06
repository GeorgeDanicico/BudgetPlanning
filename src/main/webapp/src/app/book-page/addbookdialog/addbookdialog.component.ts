import { Component, OnInit } from '@angular/core';

// src/app/add-book-dialog/add-book-dialog.component.ts
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './addbookdialog.component.html',
  styleUrls: ['./addbookdialog.component.scss'],
})
export class AddBookDialogComponent {

  public bookTitle: string = '';
  public bookAuthor: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddBookDialogComponent>,
  ) {}

  onSubmit(): void {
    // Close the dialog and pass the new book data back to the parent component
    this.dialogRef.close({title: this.bookTitle, author: this.bookAuthor});
  }

  onCancel(): void {
    // Close the dialog without adding a book
    this.dialogRef.close();
  }
}

