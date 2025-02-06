import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';


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
