import Order from "./order.model";

interface PartsDeliveryConstructor {
  id: number;
  partsreference: string;
  deliveryDate: Date;
  isComplete: boolean;
  order: Order;
}

export default class PartsDelivery {
  public id: number;
  public partsreference: string;
  public deliveryDate: Date;
  public isComplete: boolean;
  public order: Order;

  constructor({
    id,
    partsreference,
    deliveryDate,
    isComplete,
    order,
  }: PartsDeliveryConstructor) {
    this.id = id;
    this.partsreference = partsreference;
    this.deliveryDate = deliveryDate;
    this.isComplete = isComplete;
    this.order = order instanceof Order ? order : new Order(order);
  }
}
