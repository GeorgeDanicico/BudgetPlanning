import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookDialogComponent } from './addbookdialog.component';

describe('AddbookdialogComponent', () => {
  let component: AddBookDialogComponent;
  let fixture: ComponentFixture<AddBookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
