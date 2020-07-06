import { DeliveryMan } from './delivery-man';
import { Moto } from './moto';
import { Address } from './address';
import { EventType } from './CustomCalandarEvent';

export class Mission {
  id: number;
  creationDate: Date;
  deliveryMan: DeliveryMan;
  moto: Moto;
  address: Address;
  eventType?: EventType;
}
