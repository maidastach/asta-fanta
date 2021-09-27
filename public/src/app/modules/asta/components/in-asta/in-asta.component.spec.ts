import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InAstaComponent } from './in-asta.component';

describe('InAstaComponent', () => {
  let component: InAstaComponent;
  let fixture: ComponentFixture<InAstaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InAstaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InAstaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
