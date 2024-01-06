import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpendingsDialogComponent } from './add-spendings-dialog.component';

describe('AddSpendingsDialogComponent', () => {
  let component: AddSpendingsDialogComponent;
  let fixture: ComponentFixture<AddSpendingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSpendingsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpendingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
