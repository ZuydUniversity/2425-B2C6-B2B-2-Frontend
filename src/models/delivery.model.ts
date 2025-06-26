import Order from "./order.model";

interface PartsDeliveryConstructor {
  id: number;
  deliveryReference: string;
  deliveryDate: Date;
  status: string;
  orderId: number;
  order: Order;
}

export default class PartsDelivery {
  public id: number;
  public deliveryReference: string;
  public deliveryDate: Date;
  public status: string;
  public orderId: number;
  public order: Order;

  constructor({
    id,
    deliveryReference,
    deliveryDate,
    status,
    orderId,
    order,
  }: PartsDeliveryConstructor) {
    this.id = id;
    this.deliveryReference = deliveryReference;
    this.deliveryDate = deliveryDate;
    this.status = status;
    this.orderId = orderId;
    this.order = order instanceof Order ? order : new Order(order);
  }
}
