import PurchaseOrder from "./purchaseOrder.model";

interface RejectionFormConstructor {
  id: number;
  purchaseOrderId: number;
  Reason: string;
  rejectionDate: Date;
  purchaseOrder: PurchaseOrder;
  orderId: number;
}

export default class RejectionForm {
  public id: number;
  public purchaseOrderId: number;
  public Reason: string;
  public rejectionDate: Date;
  public purchaseOrder: PurchaseOrder;
  public orderId: number;

  constructor({
    id,
    purchaseOrderId,
    Reason,
    rejectionDate,
    purchaseOrder,
    orderId,
  }: RejectionFormConstructor) {
    this.id = id;
    this.purchaseOrderId = purchaseOrderId;
    this.Reason = Reason;
    this.rejectionDate = rejectionDate;
    this.purchaseOrder = purchaseOrder;
    this.orderId = orderId;
  }
}
