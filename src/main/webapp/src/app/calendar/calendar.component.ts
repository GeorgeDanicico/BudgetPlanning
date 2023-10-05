import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DialogService } from '../services/dialog.service';
import { EventsService } from '../services/events.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [
    trigger('slideAndFade', [
      state('in', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('500ms ease-in-out'),
      ]),
    ]),
  ],
})
export class CalendarComponent implements OnInit {

  public events: EventInput[] = [];
  public isLoading: boolean = false;

  constructor(private changeDetector: ChangeDetectorRef,
    private eventDialogService: DialogService,
    private eventsService: EventsService,
    private snackBar: MatSnackBar) { }

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
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
    unselectAuto: false,
    unselectCancel: '.event-container',
    weekends: true,
    editable: false,
    fixedWeekCount: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventResizeStart: () => console.log("enter resizing"),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };

  currentEvents: EventApi[] = [];

  private fetchEvents() {
    this.isLoading = true;
    this.eventsService.getAllEvents().subscribe((result) => {
      result.forEach(event => {
        event.borderColor = event.eventColour;
        event.backgroundColor = event.eventColour;
      })
    this.eventsService.getAllEvents()
      .pipe(catchError((error) => {
        console.error('An error occured: ', error.error);
        this.isLoading = false;
        this.snackBar.open('An error has occured while loading the events.', 'Close', { duration: 3000 });
        return throwError(() => new Error(error.error));
      }))
      .subscribe((result) => {
        this.events = result;
        console.log(this.events);
        this.isLoading = false;
      });
    });
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    console.log( selectInfo.startStr, selectInfo.endStr);
    const eventData = {
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    }

    const dialogRef = this.eventDialogService.openEventDialog(eventData);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.eventsService.addEvent(result.title, result.description, result.start, result.end, result.allDay, result.eventColour)
        .pipe(catchError((error) => {
          console.error('An error occured: ', error.error);
          this.isLoading = false;
          this.snackBar.open('An error has occured.', 'Close', { duration: 3000 });
          return throwError(() => new Error(error.error));
        }))
        .subscribe((response: any) => {
          console.log(response);
          if (response.status === 201) {
            const addedEvent = response.event;
            this.events.push(addedEvent);
            calendarApi.addEvent({
              id: response.event.id,
              title: result.title,
              start: selectInfo.startStr,
              end: selectInfo.endStr,
              allDay: selectInfo.allDay,
              backgroundColor: result.eventColour,
              borderColor: result.eventColour,
            });
            calendarApi.unselect();
            console.log('Event added:', result);
            this.snackBar.open("Event added successfully.", 'Close', { duration: 3000 });
          } else {
            calendarApi.unselect();
          }
          this.isLoading = false;
        })
      } else {
        calendarApi.unselect();
      }
    });
    this.changeDetector.detectChanges();
  }

  handleEventClick(clickInfo: EventClickArg) {
    const dialogRef = this.eventDialogService.openConfirmationDialog({title: 'Confirm', description: 'Are you sure you want to delete this event?', label: 'Delete'});
    dialogRef.afterClosed().subscribe(response => {
      if (response === true) {
        this.eventsService.deleteEvent(clickInfo.event.id)
        .pipe(catchError((error) => {
          console.error('An error occured: ', error.error);
          this.isLoading = false;
          this.snackBar.open('An error has occured.', 'Close', { duration: 3000 });
          return throwError(() => new Error(error.error));
        }))
        .subscribe(result => {
          this.events.filter(event => event.id?.toString() !== clickInfo.event.id)
          clickInfo.event.remove();
          this.snackBar.open("The event has been deleted", 'Close', { duration: 3000 });
        });
      }
    })
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events ;
    this.changeDetector.detectChanges();
  }
}
