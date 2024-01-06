import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-add-spendings-dialog',
  templateUrl: './add-spendings-dialog.component.html',
  styleUrls: ['./add-spendings-dialog.component.scss']
})
export class AddSpendingsDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddSpendingsDialogComponent>
  ) { }

  ngOnInit(): void {

  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddClick(response: any): void {
    console.log(response);
    this.dialogRef.close(response);
  }

}
