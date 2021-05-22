import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url: string = 'http://192.168.100.128/switch_api/';

  constructor(private http: HttpClient) {
    console.log('Data Service is working...');
  }

  public async processData(endpoint, data) {
    try {
      return this.http
        .post(this.url + endpoint, JSON.stringify(data))
        .toPromise();
    } catch (err) {
      console.log(err);
    }
  }
}
