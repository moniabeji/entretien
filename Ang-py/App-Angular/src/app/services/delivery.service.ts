import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { $API_URL } from '../shared/env';
import { map } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';
import { mapLivreurToCalendarEvent } from '../mappers/mapper-address';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

 
  constructor(private http: HttpClient) {

  }
  getDeliveryMen(): Observable<CalendarEvent []> {
    return this.http.get<any>($API_URL + '/deliveries').pipe(map(deliveryMen => deliveryMen.map(delivryMan => mapLivreurToCalendarEvent(delivryMan))));
  }

}

