import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewTeamsComponent } from './preview-teams.component';

describe('PreviewTeamsComponent', () => {
  let component: PreviewTeamsComponent;
  let fixture: ComponentFixture<PreviewTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
