import axios from "axios";
import PurchaseOrder from "../models/purchaseOrder.model";
import * as EitherModule from "fp-ts/Either";

export default class PurchaseOrderController {
  public static getAll(): EitherModule.Either<string, PurchaseOrder[]> {
    axios
      .get<any[]>("https://10.0.2.4:8080/api/PurchaseOrders")
      .then((response) => {
        const result: PurchaseOrder[] = response.data.map(
          (item) =>
            new PurchaseOrder({
              id: item["id"] as number,
              orderNumber: item["orderNumber"] as string,
              orderDate: new Date(item["orderDate"]),
              status: item["status"] as string,
              productId: item["productId"] as number,
              supplierId: item["supplierId"] as number,
              quantity: item["quantity"] as number,
            }),
        );
        return EitherModule.right(result);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to fetch purchase orders");
  }

  public static getById(
    id: number,
  ): EitherModule.Either<string, PurchaseOrder> {
    axios
      .get<any>("https://10.0.2.4:8080/api/PurchaseOrders/${id}")
      .then((response) => {
        const item = response.data;
        const purchaseOrder = new PurchaseOrder({
          id: item["id"],
          orderNumber: item["orderNumber"],
          orderDate: new Date(item["orderDate"]),
          status: item["status"],
          productId: item["productId"],
          supplierId: item["supplierId"],
          quantity: item["quantity"],
        });
        return EitherModule.right(purchaseOrder);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to fetch purchase order by ID");
  }

  public static createPurchaseOrder(
    purchaseOrder: PurchaseOrder,
  ): EitherModule.Either<string, PurchaseOrder> {
    axios
      .post<any>("https://10.0.2.4:8080/api/PurchaseOrders", {
        id: purchaseOrder.id,
        orderNumber: purchaseOrder.orderNumber,
        orderDate: purchaseOrder.orderDate,
        status: purchaseOrder.status,
        productId: purchaseOrder.productId,
        supplierId: purchaseOrder.supplierId,
        quantity: purchaseOrder.quantity,
      })
      .then((response) => {
        const created = new PurchaseOrder({
          id: response.data["id"],
          orderNumber: response.data["orderNumber"],
          orderDate: new Date(response.data["orderDate"]),
          status: response.data["status"],
          productId: response.data["productId"],
          supplierId: response.data["supplierId"],
          quantity: response.data["quantity"],
        });
        return EitherModule.right(created);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to create purchase order");
  }

  public static updatePurchaseOrder(
    purchaseOrder: PurchaseOrder,
  ): EitherModule.Either<string, PurchaseOrder> {
    axios
      .put<any>(
        "https://10.0.2.4:8080/api/PurchaseOrders/${purchaseOrder.id}",
        {
          id: purchaseOrder.id,
          orderNumber: purchaseOrder.orderNumber,
          orderDate: purchaseOrder.orderDate,
          status: purchaseOrder.status,
          productId: purchaseOrder.productId,
          supplierId: purchaseOrder.supplierId,
          quantity: purchaseOrder.quantity,
        },
      )
      .then((response) => {
        const updated = new PurchaseOrder({
          id: response.data["id"],
          orderNumber: response.data["orderNumber"],
          orderDate: new Date(response.data["orderDate"]),
          status: response.data["status"],
          productId: response.data["productId"],
          supplierId: response.data["supplierId"],
          quantity: response.data["quantity"],
        });
        return EitherModule.right(updated);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to update purchase order");
  }

  public static deletePurchaseOrder(
    id: number,
  ): EitherModule.Either<string, string> {
    axios
      .delete(`https://10.0.2.4:8080/api/PurchaseOrders/${id}`)
      .then(() => {
        return EitherModule.right(
          `Purchase order met ID ${id} succesvol verwijderd.`,
        );
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to delete purchase order");
  }
}
