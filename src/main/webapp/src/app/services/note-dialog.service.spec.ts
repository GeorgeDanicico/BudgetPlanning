import { TestBed } from '@angular/core/testing';

import { NoteDialogService } from './note-dialog.service';

describe('NoteDialogService', () => {
  let service: NoteDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
