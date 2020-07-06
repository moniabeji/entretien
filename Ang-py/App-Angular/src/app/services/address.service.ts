import { Injectable } from '@angular/core';
import { Address } from '../models/address';
import { $API_URL } from '../shared/env';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { mapAddressToCalendarEvent } from '../mappers/mapper-address';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) {

  }
  getAddresss(): Observable<CalendarEvent []> {
    return this.http.get<any>($API_URL + '/addresses').pipe(map(addresses => addresses.map(address => mapAddressToCalendarEvent(address))));
  }
}
