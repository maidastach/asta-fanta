import { TestBed } from '@angular/core/testing';

import { HasGameGuard } from './has-game.guard';

describe('HasGameGuard', () => {
  let guard: HasGameGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasGameGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
