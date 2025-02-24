import { inject, Injectable } from '@angular/core';
import { API_KEY } from '@/app.config';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey = inject(API_KEY);

  constructor() {}

  getApiKey() {
    return this.apiKey;
  }
}
