import axios from "axios";
import Customer from "../models/customer.model";
import Order from "../models/order.model";
import * as EitherModule from "fp-ts/Either";
import { id } from "fp-ts/lib/Refinement";

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
              orders: item["orders"] || ([] as Order[]),
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

  public static async createCustomer(
    customer: Customer,
  ): Promise<EitherModule.Either<string, Customer>> {
    try {
      const response = await axios.post<any>(
        "https://10.0.2.4:8080/api/Customers",
        {
          id: customer.id,
          username: customer.username,
          name: customer.name,
          password: customer.password,
          orders: customer.orders,
        },
      );

      const created = new Customer({
        id: response.data.id,
        username: response.data.username,
        name: response.data.name,
        password: response.data.password,
        orders: response.data.orders || [],
      });

      return EitherModule.right(created);
    } catch (error: any) {
      return EitherModule.left(error.toString());
    }
  }

  public static getById(id: number): EitherModule.Either<string, Customer> {
    axios
      .get<any>("https://10.0.2.4:8080/api/Customers" + id)
      .then((response) => {
        const item = response.data;
        const customer = new Customer({
          id: item["id"] as number,
          username: item["username"] as string,
          name: item["name"] as string,
          password: item["password"] as string,
          orders: item["orders"] || ([] as Order[]),
        });
        return EitherModule.right(customer);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.right(
      new Customer({ id: 0, username: "", name: "", password: "", orders: [] }),
    );
  }
}
