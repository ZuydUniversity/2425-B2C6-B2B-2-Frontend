import axios from "axios";
import Supplier from "../models/supplier.model";
import * as EitherModule from "fp-ts/Either";

export default class SupplierController {
  public static getAll(): EitherModule.Either<string, Supplier[]> {
    axios
      .get<any[]>("https://10.0.2.4:8080/api/Suppliers")
      .then((response) => {
        const result: Supplier[] = [];
        const data = response.data;

        data.forEach((item) => {
          result.push(
            new Supplier({
              id: item["id"] as number,
              name: item["name"] as string,
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
