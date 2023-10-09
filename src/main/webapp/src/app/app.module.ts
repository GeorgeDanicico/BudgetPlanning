import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthorizationService } from './services/authorization-service.service';
import { NotesComponent } from './notes/notes.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NoteComponent } from './notes/add-edit-note/note.component';
import { AuthorizationInterceptor } from './services/authorization-interceptor';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // For drag-and-drop events
import { CalendarComponent } from './calendar/calendar.component';
import { EventComponent } from './calendar/event/event.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { BookPageComponent } from './book-page/book-page.component';
import { AddBookDialogComponent } from './book-page/addbookdialog/addbookdialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NotesComponent,
    SidenavComponent,
    NoteComponent,
    CalendarComponent,
    EventComponent,
    ConfirmationDialogComponent,
    BookPageComponent,
    AddBookDialogComponent,
  ],
  imports: [
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule,
  ],
  providers: [
    AuthorizationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
