import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { API_KEY } from '@/app.config';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: API_KEY, useValue: 'test_api_key' },
        ApiService,
      ],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the test API key', () => {
    expect(service.getApiKey()).toBe('test_api_key');
  });
});
