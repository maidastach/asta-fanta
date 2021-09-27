import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartRandomComponent } from './start-random.component';

describe('StartRandomComponent', () => {
  let component: StartRandomComponent;
  let fixture: ComponentFixture<StartRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartRandomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
