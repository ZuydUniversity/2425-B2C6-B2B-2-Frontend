import PurchaseOrder from "./purchaseOrder.model";

interface PickListConstructor {
  id: number;
  purchaseOrderId: number;
  Type: string;
  components: string;
  purchaseOrder: PurchaseOrder;
  orderId: number;
  productId: number;
  quantity: number;
}

export default class PickList {
  public id: number;
  public purchaseOrderId: number;
  public Type: string;
  public components: string;
  public purchaseOrder: PurchaseOrder;
  public orderId: number;
  public productId: number;
  public quantity: number;

  constructor({
    id,
    purchaseOrderId,
    Type,
    components,
    purchaseOrder,
    orderId,
    productId,
    quantity,
  }: PickListConstructor) {
    this.id = id;
    this.purchaseOrderId = purchaseOrderId;
    this.Type = Type;
    this.components = components;
    this.purchaseOrder =
      purchaseOrder instanceof PurchaseOrder
        ? purchaseOrder
        : new PurchaseOrder(purchaseOrder);
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
  }
}
