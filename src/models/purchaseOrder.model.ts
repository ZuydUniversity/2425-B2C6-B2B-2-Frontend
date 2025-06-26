interface PurchaseOrderConstructor {
  id: number;
  orderNumber: string;
  orderDate: Date;
  status: string;
  productId: number;
  supplierId: number;
  quantity: number;
}

export default class PurchaseOrder {
  public id: number;
  public orderNumber: string;
  public orderDate: Date;
  public status: string;
  public productId: number;
  public supplierId: number;
  public quantity: number;

  constructor({
    id,
    orderNumber,
    orderDate,
    status,
    productId,
    supplierId,
    quantity,
  }: PurchaseOrderConstructor) {
    this.id = id;
    this.orderNumber = orderNumber;
    this.orderDate = orderDate;
    this.status = status;
    this.productId = productId;
    this.supplierId = supplierId;
    this.quantity = quantity;
  }
}
