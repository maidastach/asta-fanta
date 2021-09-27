import { TestBed } from '@angular/core/testing';

import { AstaService } from './asta.service';

describe('AstaService', () => {
  let service: AstaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
