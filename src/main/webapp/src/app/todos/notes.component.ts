import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.notes = [{
        title: 'Note Title',
        description: 'Note description',
      },
      {
        title: 'Note Title',
        description: 'Note description',
      },
      {
        title: 'Note Title',
        description: 'Note description',
      },
      {
        title: 'Note Title',
        description: 'Note description',
      },
      {
        title: 'Note Title',
        description: 'Note description',
      },
      {
        title: 'Note Title',
        description: 'Note description',
      }
    ];
  }

}
