import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadgameComponent } from './loadgame.component';

describe('LoadgameComponent', () => {
  let component: LoadgameComponent;
  let fixture: ComponentFixture<LoadgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadgameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
