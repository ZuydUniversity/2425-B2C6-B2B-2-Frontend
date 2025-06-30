import Order from "./order.model";

interface PartsDeliveryConstructor {
  id: number;
  shipmentReference: string;
  shipmentDate: Date;
  destination: string;
  isDelivered: boolean;
  order: Order;
}

export default class Expedition {
  public id: number;
  public shipmentReference: string;
  public shipmentDate: Date;
  public destination: string;
  public isDelivered: boolean;
  public order: Order;

  constructor({
    id,
    shipmentReference,
    shipmentDate,
    destination,
    isDelivered,
    order,
  }: PartsDeliveryConstructor) {
    this.id = id;
    this.shipmentReference = shipmentReference;
    this.shipmentDate = shipmentDate;
    this.destination = destination;
    this.isDelivered = isDelivered;
    this.order = order instanceof Order ? order : new Order(order);
  }
}
