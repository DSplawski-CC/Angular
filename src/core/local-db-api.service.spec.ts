import { TestBed } from '@angular/core/testing';

import { LocalDbApiService } from './local-db-api.service';

describe('LocalDbApiService', () => {
  let service: LocalDbApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalDbApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
