import axios from "axios";
import RejectionForm from "../models/rejectionForm.model";
import * as EitherModule from "fp-ts/Either";

export default class RejectionFormController {
  public static getAll(): EitherModule.Either<string, RejectionForm[]> {
    axios
      .get<any[]>("https://10.0.2.4:8080/api/Orders")
      .then((response) => {
        const result: RejectionForm[] = [];
        const data = response.data;

        data.forEach((item) => {
          result.push(
            new RejectionForm({
              id: item["id"] as number,
              purchaseOrderId: item["purchaseOrderId"] as number,
              Reason: item["Reason"] as string,
              rejectionDate: item["rejectionDate"] as Date,
              purchaseOrder: item["purchaseOrder"],
              orderId: item["orderId"] as number,
            }),
          );
        });

        return EitherModule.right(result);
      })
      .catch((error) => {
        return EitherModule.left(error);
      });
    return EitherModule.right([]);
  }
}
