import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickPlayerComponent } from './pick-player.component';

describe('PickPlayerComponent', () => {
  let component: PickPlayerComponent;
  let fixture: ComponentFixture<PickPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
