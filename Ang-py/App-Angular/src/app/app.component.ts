import { Component, OnInit } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';

import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { DeliveryMan } from './models/delivery-man';
import { Moto } from './models/moto';
import { Address } from './models/address';
import { EventType } from './models/CustomCalandarEvent';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from './services/address.service';
import { DeliveryService } from './services/delivery.service';
import { MissionService } from './services/mission.service';
import { Mission } from './models/mission';
import { MotoService } from './services/moto.service';
import { DatePipe } from '@angular/common';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'delivery';
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;
  refresh: Subject<any> = new Subject();
  vamps;
  numToday: number = 0; numAfter: number = 0;
  events: CalendarEvent[] = [];
  deliveryManEvents: CalendarEvent<DeliveryMan>[] = [];
  motoEvents: CalendarEvent<Moto>[] = [];
  addressEvents: CalendarEvent<Address>[] = [];
  missions: Mission[] = [];
  motoErrMess: string;

  public constructor(private toastr: ToastrService,
    private addressService: AddressService,
    private deliveryService: DeliveryService,
    private motoService: MotoService,
    private missionService: MissionService, public datepipe: DatePipe) {
  }

  ngOnInit() {
    this.getAdresses();
    this.getMotos();
    this.getDeliveryMen();
    this.getMission();
    this.getNumberToday();
    this.getNumberAfter();
    console.log(this.motoErrMess)
  }
  getAdresses() {

    this.addressService.getAddresss().subscribe((add) => this.addressEvents = add)
  }
  getMotos() {
    this.motoService.getMotos().subscribe((motos) => this.motoEvents = motos,  errmess => this.motoErrMess = <any>errmess)
  }

  getDeliveryMen() {
    this.deliveryService.getDeliveryMen().subscribe(deliveries => this.deliveryManEvents = deliveries)
  }
  getMission() {
    this.missionService.getMissions().subscribe(mission => this.missions = mission)
  }
  getNumberToday() {
    this.missionService.getMissionToday().subscribe(num => this.numToday = num["nums"])
  }
  getNumberAfter() {
    this.missionService.getMissionAfter().subscribe(num => this.numAfter = num["nums"])
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }


  handleEvent(action: string, event: CalendarEvent): void {
    console.log(typeof(this.datepipe.transform(event.start, 'yyyy/MM/dd')))
    const currentevents = this.events.filter(evnt => this.datepipe.transform(evnt.start, 'yyyy/MM/dd')
      === this.datepipe.transform(event.start, 'yyyy/MM/dd'))
    if (currentevents.length === 3 &&
       (currentevents[0].meta.eventType !=currentevents[1].meta.eventType && currentevents[1].meta.eventType !=currentevents[2].meta.eventType)) {

        let mission: Mission= new Mission( );
        for (let even of currentevents){
          mission.creationDate = event.start;
          switch (even.meta.eventType) {
            case 'DELIVERY_MAN':
                mission.deliveryMan= even.meta
              break;
            case 'MOTO':
                mission.moto= even.meta
            case 'ADDRESS':
                mission.address= even.meta
        }
        
    }
    this.missionService.generateMission(mission).subscribe(data =>
      {this.toastr.success('Mission has been created successfully!', 'Success', data);
      this.getMission();
      this.getNumberToday();
      this.getNumberAfter();
  } )    
      console.log('Mission has been created successfully!', event);
  }
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  public eventDropped({ event, newStart, newEnd, allDay, }: CalendarEventTimesChangedEvent): void {
    switch (event.meta.eventType) {
      case 'DELIVERY_MAN':
        this.eventDroppedByExternalEvents(event, newStart, newEnd, allDay, this.deliveryManEvents);
        break;
      case 'MOTO':
        this.eventDroppedByExternalEvents(event, newStart, newEnd, allDay, this.motoEvents);
        break;
      case 'ADDRESS':
        this.eventDroppedByExternalEvents(event, newStart, newEnd, allDay, this.addressEvents);
        break;
      default:
        console.log('UNDEFINED META', event.meta);
        break;
    }
  }

  private eventDroppedByExternalEvents(event, newStart, newEnd, allDay, externalEvents) {
    const externalIndex = externalEvents.indexOf(event);
    if (typeof allDay !== 'undefined') {
      event.allDay = allDay;
    }
    if (externalIndex > -1) {
      // externalEvents.splice(externalIndex, 1);
      this.events.push(event);
    }
    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    if (this.view === 'month') {
      this.viewDate = newStart;
      this.activeDayIsOpen = true;
    }
    this.events = [...this.events];
    this.handleEvent('ADD', event);
  }

  externalDrop(event: CalendarEvent) {
    switch (event.meta.eventType) {
      case 'DELIVERY_MAN':
        this.externalDropByEventType(event, this.deliveryManEvents);
        break;
      case 'MOTO':
        this.externalDropByEventType(event, this.motoEvents);
        break;
      case 'ADDRESS':
        this.externalDropByEventType(event, this.addressEvents);
        break;
      default:
        console.log('UNDEFINED META', event.meta);
        break;
    }
  }

  externalDropByEventType(event,externalEvents) {

    if (externalEvents.indexOf(event) === -1) {
      this.events = this.events.filter((iEvent) => iEvent !== event);
      externalEvents.push(event);
    }
  }
}
