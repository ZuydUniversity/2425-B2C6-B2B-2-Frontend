import axios from "axios";
import Order from "../models/order.model";
import * as EitherModule from "fp-ts/Either";

export default class OrderController {
  public static getAll(): EitherModule.Either<string, Order[]> {
    axios
      .get<any[]>("https://10.0.2.4:8080/api/Orders")
      .then((response) => {
        const result: Order[] = [];
        const data = response.data;

        data.forEach((item) => {
          result.push(
            new Order({
              id: item["id"] as number,
              customerId: item["customerId"] as number,
              productId: item["productId"] as number,
              quantity: item["quantity"] as number,
              totalPrice: item["totalPrice"] as number,
              status: item["status"] as string,
              orderDate: item["orderDate"] as Date,
              approvedDate: item["approvedDate"] as Date,
              rejectedDate: item["rejectedDate"] as Date,
              deliveredDate: item["deliveredDate"] as Date,
              comment: item["comment"] as string,
              orderType: item["orderType"] as string,
              isSignedByInkoop: item["isSignedByInkoop"] as boolean,
              isSignedByAccountmanager: item[
                "isSignedByAccountmanager"
              ] as boolean,
              forwardedToSupplier: item["forwardedToSupplier"] as boolean,
              picklistStatus: item["picklistStatus"] as string,
              rejectionReason: item["rejectionReason"] as string,
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

  public static getOneById(
    idToGet: number,
  ): EitherModule.Either<string, Order[]> {
    axios
      .get<any>("https://10.0.2.4:8080/api/Orders/" + idToGet)
      .then((response) => {
        const item = response.data;

        const order = new Order({
          id: item["id"] as number,
          customerId: item["customerId"] as number,
          productId: item["productId"] as number,
          quantity: item["quantity"] as number,
          totalPrice: item["totalPrice"] as number,
          status: item["status"] as string,
          orderDate: item["orderDate"] as Date,
          approvedDate: item["approvedDate"] as Date,
          rejectedDate: item["rejectedDate"] as Date,
          deliveredDate: item["deliveredDate"] as Date,
          comment: item["comment"] as string,
          orderType: item["orderType"] as string,
          isSignedByInkoop: item["isSignedByInkoop"] as boolean,
          isSignedByAccountmanager: item["isSignedByAccountmanager"] as boolean,
          forwardedToSupplier: item["forwardedToSupplier"] as boolean,
          picklistStatus: item["picklistStatus"] as string,
          rejectionReason: item["rejectionReason"] as string,
        });

        return EitherModule.right(order);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });

    return EitherModule.left("No Order found with that id");
  }
}
