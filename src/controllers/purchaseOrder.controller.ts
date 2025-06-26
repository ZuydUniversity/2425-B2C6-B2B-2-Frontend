import axios from "axios";
import PurchaseOrder from "../models/purchaseOrder.model";
import * as EitherModule from "fp-ts/Either";

export default class PurchaseOrderController {
  public static getAll(): EitherModule.Either<string, PurchaseOrder[]> {
    axios
      .get<any[]>("https://10.0.2.4:8080/api/PurchaseOrders")
      .then((response) => {
        const result: PurchaseOrder[] = [];
        const data = response.data;

        data.forEach((item) => {
          result.push(
            new PurchaseOrder({
              id: item["id"] as number,
              orderNumber: item["orderNumber"] as string,
              orderDate: item["orderDate"] as Date,
              status: item["status"] as string,
              productId: item["productId"] as number,
              supplierId: item["supplierId"] as number,
              quantity: item["quantity"] as number,
            }),
          );
        });

        return EitherModule.right(result);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.right([]);
  }
}
