import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySpendingsComponent } from './my-spendings.component';

describe('MySpendingsComponent', () => {
  let component: MySpendingsComponent;
  let fixture: ComponentFixture<MySpendingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySpendingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySpendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
