import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HOURS, MINUTES } from 'src/app/utils/app.constants';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  public title: string = '';
  public description: string = '';
  public isEditMode: boolean = false;
  public startHour: string = '';
  public startMinutes: string = '';
  public endHour: string = '';
  public endMinutes: string = '';
  public end: string = '';
  public allDay: boolean = false;
  public hours = HOURS;
  public minutes = MINUTES;

  constructor(
    private dialogRef: MatDialogRef<EventComponent>,
  ) { }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    // this.dialogRef.close({title: this.title, description: this.description, start: this.start, end: this.end, allDay: this.allDay});
  }

}
