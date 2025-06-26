import PurchaseOrder from "./purchaseOrder.model";

interface ApprovalFormConstructor {
  id: number;
  purchaseOrderId: number;
  isApproved: boolean;
  comment: string;
  purchaseOrder: PurchaseOrder;
  orderId: number;
  dateApproved: Date;
}

export default class ApprovalForm {
  public id: number;
  public purchaseOrderId: number;
  public isApproved: boolean;
  public comment: string;
  public purchaseOrder: PurchaseOrder;
  public orderId: number;
  public dateApproved: Date;

  constructor({
    id,
    purchaseOrderId,
    isApproved,
    comment,
    purchaseOrder,
    orderId,
    dateApproved,
  }: ApprovalFormConstructor) {
    this.id = id;
    this.purchaseOrderId = purchaseOrderId;
    this.isApproved = isApproved;
    this.comment = comment;
    this.purchaseOrder =
      purchaseOrder instanceof PurchaseOrder
        ? purchaseOrder
        : new PurchaseOrder(purchaseOrder);
    this.orderId = orderId;
    this.dateApproved = dateApproved;
  }
}
