import { Address } from '../models/address';
import { EventType } from '../models/CustomCalandarEvent';
import { CalendarEvent } from 'angular-calendar';
import { Moto } from '../models/moto';
import { DeliveryMan } from '../models/delivery-man';
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
  
export function mapAddressToCalendarEvent(address: Address): CalendarEvent {

    address.eventType = EventType.ADDRESS;
    let calendar: CalendarEvent<Address> = {title:'', color: colors.blue, start: new Date() };
    calendar.title = address.name;
    calendar.draggable= true;
    calendar.meta = address;
    return calendar
}
export function mapMotoToCalendarEvent(moto: Moto): CalendarEvent {

    moto.eventType = EventType.MOTO;
    let calendar: CalendarEvent<Moto> = {title:'', color: colors.yellow, start: new Date() };
    calendar.title = moto.name;
    calendar.draggable= true;
    calendar.meta = moto;
    return calendar
}
export function mapLivreurToCalendarEvent(deliveryMan: DeliveryMan): CalendarEvent {

    deliveryMan.eventType = EventType.DELIVERY_MAN;
    let calendar: CalendarEvent<DeliveryMan> = {title:'', color: colors.red, start: new Date() };
    calendar.title = deliveryMan.name;
    calendar.draggable= true;
    calendar.meta = deliveryMan;
    return calendar
}