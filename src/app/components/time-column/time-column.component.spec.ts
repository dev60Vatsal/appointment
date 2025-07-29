import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeColumnComponent } from './time-column.component';

describe('TimeColumnComponent', () => {
  let component: TimeColumnComponent;
  let fixture: ComponentFixture<TimeColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeColumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
