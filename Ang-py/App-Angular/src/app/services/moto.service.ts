import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import { $API_URL } from '../shared/env';
import { map, catchError } from 'rxjs/operators';
import { mapMotoToCalendarEvent } from '../mappers/mapper-address';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class MotoService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getMotos(): Observable<CalendarEvent []> {
    return this.http.get<any>($API_URL + '/motos').pipe(map(motos => motos.map(address => mapMotoToCalendarEvent(address))));
  }


}
