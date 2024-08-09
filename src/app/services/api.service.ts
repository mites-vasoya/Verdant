import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  fetchAuthToken(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("Auth Code : ", data);
    return this.http.get(`${this.apiUrl}/v1/stocks/access_token/generate/` + data, { headers });
  }
}
