import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DialogService } from '../services/dialog.service';
import { EventsService } from '../services/events.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public events: any[] = [];

  constructor(private changeDetector: ChangeDetectorRef,
    private eventDialogService: DialogService,
    private eventsService: EventsService,
    private snackBar: MatSnackBar) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    events: this.events,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };

  currentEvents: EventApi[] = [];


  ngOnInit(): void {
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const dialogRef = this.eventDialogService.openEventDialog();
    const calendarApi = selectInfo.view.calendar;
    console.log(selectInfo);
    calendarApi.unselect(); // clear date selection

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventsService.addEvent(result.title, result.description, result.start, result.end, result.allDay).subscribe((response: any) => {
          if (response.status === 201) {
            const addedEvent = response.note;
            this.events.push(addedEvent);
            this.changeDetector.detectChanges();
            console.log('Note added:', result);
            this.snackBar.open("Note added successfully.", 'Close');
          }
        })

      }
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events ;
    this.changeDetector.detectChanges();
  }

}
