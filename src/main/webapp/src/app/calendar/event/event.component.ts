import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventsService } from 'src/app/services/events.service';
import { EVENT_COLORS, HOURS, MINUTES } from 'src/app/utils/app.constants';
import { INoteData } from 'src/app/utils/app.types';

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
  public eventColour: string = '#0197F6';
  public hours = HOURS;
  public minutes = MINUTES;
  public colours = EVENT_COLORS;

  constructor(
    private dialogRef: MatDialogRef<EventComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
    this.allDay = this.data.allDay;
    this.parseDates();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    const dates = this.computeDate();

    this.dialogRef.close({title: this.title, description: this.description, 
      start: dates[0], end: dates[1], allDay: this.allDay, eventColour: this.eventColour});
  }

  setAllDay() {
    this.allDay = !this.allDay;
  }

  private computeDate() {
    const startDate = `${this.data.start.split('T')[0]}T${this.startHour}:${this.startMinutes}:00`;
    const endDate = `${this.data.end.split('T')[0]}T${this.endHour}:${this.endMinutes}:00`;

    return [startDate, endDate];
  }

  private parseDates() {
    const startDate = this.data.start.split('T');
    const endDate = this.data.end.split('T');

    if (startDate.length > 1) {
      const startTime = startDate[1].split(':');
      this.startHour = startTime[0];
      this.startMinutes = startTime[1];
    }

    if (endDate.length > 1) {
      const endTime = endDate[1].split(':');
      this.endHour = endTime[0];
      this.endMinutes = endTime[1];
    }
  }

}
