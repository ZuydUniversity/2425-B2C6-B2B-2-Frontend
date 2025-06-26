import Order from "./order.model";
import ProductionLine from "./productionLine.model";

interface ApprovalFormConstructor {
  id: number;
  plannedDate: Date;
  orderId: number;
  order: Order;
  productionLineId: number;
  productionLine: ProductionLine;
}

export default class Planning {
  public id: number;
  public plannedDate: Date;
  public orderId: number;
  public order: Order;
  public productionLineId: number;
  public productionLine: ProductionLine;

  constructor({
    id,
    plannedDate,
    orderId,
    order,
    productionLineId,
    productionLine,
  }: ApprovalFormConstructor) {
    this.id = id;
    this.plannedDate = plannedDate;
    this.orderId = orderId;
    this.order = order instanceof Order ? order : new Order(order);
    this.productionLineId = productionLineId;
    this.productionLine =
      productionLine instanceof ProductionLine
        ? productionLine
        : new ProductionLine(productionLine);
  }
}
