import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';


describe('ApiService', () => {
  let service: ApiService;
  const spy = jasmine.createSpyObj<ApiService>('ApiService', ['getApiKey']);
  spy.getApiKey.and.returnValue('test_api_key');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: spy },
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
