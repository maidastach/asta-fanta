import { TestBed } from '@angular/core/testing';

import { ShowPlayerService } from './show-player.service';

describe('ShowPlayerService', () => {
  let service: ShowPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
