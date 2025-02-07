import { Injectable, InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';


export const API_KEY_SERVICE = new InjectionToken<ApiService>('Api Key Service', {
  providedIn: 'root',
  factory: () => new ApiService(),
});

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey = environment.tmdbApiKey;

  constructor() { }

  getApiKey() {
    return this.apiKey;
  }
}
