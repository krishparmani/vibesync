import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Music {

  private apiUrl = 'http://127.0.0.1:5000/api/music';

  constructor(private http: HttpClient) {}

  getMusic() {
    return this.http.get(this.apiUrl);
  }
}