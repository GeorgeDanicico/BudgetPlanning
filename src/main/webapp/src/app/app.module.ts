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
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
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
