import { Status } from "../global/constants/statuseslist";

interface OrderConstructor {
  id: number;
  customerId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  status: string;
  orderDate: Date;
  approvedDate: Date;
  rejectedDate: Date;
  deliveredDate: Date;
  comment: string;
  orderType: string;
  isSignedByInkoop: boolean;
  isSignedByAccountmanager: boolean;
  forwardedToSupplier: boolean;
  picklistStatus: string;
  rejectionReason: string;
}

export default class Order {
  public id: number;
  public customerId: number;
  public productId: number;
  public quantity: number;
  public totalPrice: number;
  public status: string;
  public orderDate: Date;
  public approvedDate: Date;
  public rejectedDate: Date;
  public deliveredDate: Date;
  public comment: string;
  public orderType: string;
  public isSignedByInkoop: boolean;
  public isSignedByAccountmanager: boolean;
  public forwardedToSupplier: boolean;
  public picklistStatus: string;
  public rejectionReason: string;

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
    orderType,
    isSignedByInkoop,
    isSignedByAccountmanager,
    forwardedToSupplier,
    picklistStatus,
    rejectionReason,
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
    this.orderType = orderType;
    this.isSignedByInkoop = isSignedByInkoop;
    this.isSignedByAccountmanager = isSignedByAccountmanager;
    this.forwardedToSupplier = forwardedToSupplier;
    this.picklistStatus = picklistStatus;
    this.rejectionReason = rejectionReason;
  }
}
