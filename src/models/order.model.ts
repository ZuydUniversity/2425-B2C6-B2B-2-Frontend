import { Status } from "../global/constants/statuseslist";
import Customer from "./customer.model";
import Product from "./product.model";
import EventLog from "./eventLog.model";

interface OrderConstructor {
  id: number;
  customerId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  status: string;
  orderDate: Date;
  approvedDate?: Date | null;
  rejectedDate?: Date | null;
  deliveredDate?: Date | null;
  comment: string;
  forwardedToSupplier: boolean;
  rejectionReason: string;
  customer: Customer;
  product: Product;
  eventLogs?: EventLog[];
}

export default class Order {
  public id: number;
  public customerId: number;
  public productId: number;
  public quantity: number;
  public totalPrice: number;
  public status: string;
  public orderDate: Date;
  public approvedDate?: Date | null;
  public rejectedDate?: Date | null;
  public deliveredDate?: Date | null;
  public comment: string;
  public forwardedToSupplier: boolean;
  public rejectionReason: string;
  public customer: Customer;
  public product: Product;
  public eventLogs?: EventLog[];

  constructor({
    id,
    customerId,
    productId,
    quantity,
    totalPrice,
    status,
    orderDate,
    approvedDate,
    rejectedDate,
    deliveredDate,
    comment,
    forwardedToSupplier,
    rejectionReason,
    customer,
    product,
    eventLogs = [],
  }: OrderConstructor) {
    this.id = id;
    this.customerId = customerId;
    this.productId = productId;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
    this.status = status;
    this.orderDate = orderDate;
    this.approvedDate = approvedDate;
    this.rejectedDate = rejectedDate;
    this.deliveredDate = deliveredDate;
    this.comment = comment;
    this.forwardedToSupplier = forwardedToSupplier;
    this.rejectionReason = rejectionReason;
    this.customer =
      customer instanceof Customer ? customer : new Customer(customer);
    this.product = product instanceof Product ? product : new Product(product);
    this.eventLogs = eventLogs.map((log) =>
      log instanceof EventLog ? log : new EventLog(log),
    );
  }
}
