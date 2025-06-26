import Order from "./order.model";

interface ApprovalFormConstructor {
  id: number;
  orderId: number;
  timestamp: Date;
  activity: string;
  details: string;
  order: Order;
}

export default class EventLog {
  public id: number;
  public orderId: number;
  public timestamp: Date;
  public activity: string;
  public details: string;
  public order: Order;

  constructor({
    id,
    orderId,
    timestamp,
    activity,
    details,
    order,
  }: ApprovalFormConstructor) {
    this.id = id;
    this.orderId = orderId;
    this.timestamp = timestamp;
    this.activity = activity;
    this.details = details;
    this.order = order instanceof Order ? order : new Order(order);
  }
}
