import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../models/mission';
import { $API_URL } from '../shared/env';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getMissions(): Observable<Mission[]> {
    return this.http.get<any>($API_URL + '/missions');
  }
  getMissionToday(): Observable<any> {
    return this.http.get<any>($API_URL + '/missions-today');
  }
  getMissionAfter(): Observable<any> {
    return this.http.get<any>($API_URL + '/missions-after');
  }
  generateMission(mission: Mission): Observable<any> {
    return this.http.post<any>($API_URL + '/generate-mission', mission, httpOptions);
  }
}
