import axios from "axios";
import Customer from "../models/customer.model";
import * as EitherModule from "fp-ts/Either";

export default class CustomerController {
  public static getAll(): EitherModule.Either<string, Customer[]> {
    axios
      .get<any[]>("https://10.0.2.4:8080/api/Customers")
      .then((responce) => {
        const result: Customer[] = [];
        const data = responce.data;

        data.forEach((item) => {
          result.push(
            new Customer({
              id: item["id"] as number,
              username: item["username"] as string,
              name: item["name"] as string,
              password: item["password"] as string,
              orders: item["orders"] || [],
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
